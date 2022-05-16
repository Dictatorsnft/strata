import * as anchor from "@project-serum/anchor";
import { BN } from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { expect, use } from "chai";
import ChaiAsPromised from "chai-as-promised";
import { createMint } from "@strata-foundation/spl-utils";
import {
  FungibleEntangler,
  IFungibleParentEntangler,
  IFungibleChildEntangler,
} from "../packages/fungible-entangler/src";
import { waitForUnixTime } from "./utils/clock";
import { TokenUtils } from "./utils/token";

use(ChaiAsPromised);
const tB58 = (p: PublicKey | null) => p?.toBase58();

describe("fungible-entangler", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.local());
  const provider = anchor.getProvider();

  const program = anchor.workspace.FungibleEntangler;
  const tokenUtils = new TokenUtils(provider);
  const fungibleEntanglerProgram = new FungibleEntangler(provider, program);
  const me = fungibleEntanglerProgram.wallet.publicKey;

  it("allows creation of a parent entangler", async () => {
    const dynamicSeed = Keypair.generate().publicKey;
    const parentMint = await createMint(provider, me, 0);
    await tokenUtils.createAtaAndMint(provider, parentMint, 100);

    const { entangler: parentEntanglerOut } =
      await fungibleEntanglerProgram.createFungibleParentEntangler({
        authority: me,
        mint: parentMint,
        amount: 100,
        dynamicSeed: dynamicSeed.toBuffer(),
      });

    const parentEntanglerAcct =
      (await fungibleEntanglerProgram.getParentEntangler(parentEntanglerOut))!;

    expect(tB58(parentEntanglerAcct.parentMint)).to.eq(tB58(parentMint));
    expect(tB58(parentEntanglerAcct.authority)).to.eq(tB58(me));

    await tokenUtils.expectAtaBalance(me, parentEntanglerAcct.parentMint, 0);
    await tokenUtils.expectBalance(parentEntanglerAcct.parentStorage, 100);
  });

  it("allows creation of a child entangler", async () => {
    const dynamicSeed = Keypair.generate().publicKey;
    const parentMint = await createMint(provider, me, 0);
    const childMint = await createMint(provider, me);
    await tokenUtils.createAtaAndMint(provider, parentMint, 100);

    const { entangler: parentEntanglerOut } =
      await fungibleEntanglerProgram.createFungibleParentEntangler({
        authority: me,
        mint: parentMint,
        amount: 100,
        dynamicSeed: dynamicSeed.toBuffer(),
      });

    const { entangler: childEntanglerOut } =
      await fungibleEntanglerProgram.createFungibleChildEntangler({
        authority: me,
        mint: childMint,
        parentEntangler: parentEntanglerOut,
      });

    const childEntanglerAcct =
      (await fungibleEntanglerProgram.getChildEntangler(childEntanglerOut))!;

    expect(tB58(childEntanglerAcct.childMint)).to.eq(tB58(childMint));
    expect(tB58(childEntanglerAcct.authority)).to.eq(tB58(me));

    await tokenUtils.expectBalance(childEntanglerAcct.childStorage, 0);
  });

  it("creates both parentEntangler and childEntangler with a singleMethod", async () => {
    const dynamicSeed = Keypair.generate().publicKey;
    const parentMint = await createMint(provider, me, 0);
    const childMint = await createMint(provider, me, 0);
    await tokenUtils.createAtaAndMint(provider, parentMint, 100);

    const {
      parentEntangler: parentEntanglerOut,
      childEntangler: childEntanglerOut,
    } = await fungibleEntanglerProgram.createFungibleEntangler({
      authority: me,
      parentMint,
      childMint,
      amount: 100,
      dynamicSeed: dynamicSeed.toBuffer(),
    });

    const parentEntanglerAcct =
      (await fungibleEntanglerProgram.getParentEntangler(parentEntanglerOut))!;

    const childEntanglerAcct =
      (await fungibleEntanglerProgram.getChildEntangler(childEntanglerOut))!;

    expect(tB58(parentEntanglerAcct.parentMint)).to.eq(tB58(parentMint));
    expect(tB58(parentEntanglerAcct.authority)).to.eq(tB58(me));
    await tokenUtils.expectAtaBalance(me, parentEntanglerAcct.parentMint, 0);
    await tokenUtils.expectBalance(parentEntanglerAcct.parentStorage, 100);
    expect(tB58(childEntanglerAcct.childMint)).to.eq(tB58(childMint));
    expect(tB58(childEntanglerAcct.authority)).to.eq(tB58(me));
    await tokenUtils.expectBalance(childEntanglerAcct.childStorage, 0);
  });

  describe("swapping", () => {
    let parentMint,
      childMint,
      parentEntangler: PublicKey,
      childEntangler: PublicKey,
      parentEntanglerAcct: IFungibleParentEntangler | null,
      childEntanglerAcct: IFungibleChildEntangler | null;

    beforeEach(async () => {
      const dynamicSeed = Keypair.generate().publicKey;
      parentMint = await createMint(provider, me, 0);
      childMint = await createMint(provider, me, 0);
      await tokenUtils.createAtaAndMint(provider, parentMint, 100);
      await tokenUtils.createAtaAndMint(provider, childMint, 50);

      const {
        parentEntangler: parentEntanglerOut,
        childEntangler: childEntanglerOut,
        childStorage: childStorageOut,
      } = await fungibleEntanglerProgram.createFungibleEntangler({
        authority: me,
        parentMint,
        childMint,
        amount: 50,
        dynamicSeed: dynamicSeed.toBuffer(),
      });

      parentEntangler = parentEntanglerOut;
      childEntangler = childEntanglerOut;
      await tokenUtils.mintTo(childMint, 50, childStorageOut);

      parentEntanglerAcct = (await fungibleEntanglerProgram.getParentEntangler(
        parentEntanglerOut
      ))!;

      childEntanglerAcct = (await fungibleEntanglerProgram.getChildEntangler(
        childEntanglerOut
      ))!;
    });
    it("swaps from the parent to a child", async () => {
      await fungibleEntanglerProgram.swapChild({
        parentEntangler,
        childEntangler,
        amount: 30,
      });

      await tokenUtils.expectAtaBalance(me, childEntanglerAcct!.childMint, 20);
      await tokenUtils.expectBalance(parentEntanglerAcct!.parentStorage, 20);

      await tokenUtils.expectAtaBalance(
        me,
        parentEntanglerAcct!.parentMint,
        30
      );

      await tokenUtils.expectBalance(childEntanglerAcct!.childStorage, 80);
    });

    it("swaps from the child to the parent", async () => {
      await fungibleEntanglerProgram.swapChild({
        parentEntangler,
        childEntangler,
        amount: 30,
      });

      await tokenUtils.expectBalance(parentEntanglerAcct!.parentStorage, 20);

      await tokenUtils.expectAtaBalance(
        me,
        parentEntanglerAcct!.parentMint,
        80
      );

      await tokenUtils.expectBalance(childEntanglerAcct!.childStorage, 80);
    });
  });

  describe("top off", () => {
    it("allows topping off of parent", () => {
      // TODO: implement
      expect(false).to.eq(true);
    });
  });
});
