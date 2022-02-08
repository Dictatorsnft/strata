import { IdlAccounts, Idl } from '@project-serum/anchor';
export const SplTokenStakingIDLJson: Idl & { metadata?: { address: string } } = {
  "version": "0.4.1",
  "name": "spl_token_staking",
  "instructions": [
    {
      "name": "initializeTokenStakingV0",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenStaking",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "targetMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "InitializeTokenStakingV0Args"
          }
        }
      ]
    },
    {
      "name": "initializeStakingInfoV0",
      "accounts": [
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenStaking",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumpSeed",
          "type": "u8"
        }
      ]
    },
    {
      "name": "stakeV0",
      "accounts": [
        {
          "name": "payer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenStaking",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingInfo",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "stakingVoucher",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "purchaseAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "baseHolding",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseHoldingAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "StakeV0Args"
          }
        }
      ]
    },
    {
      "name": "collectRewardsV0",
      "accounts": [
        {
          "name": "tokenStaking",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingVoucher",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "targetMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "unstakeV0",
      "accounts": [
        {
          "name": "tokenStaking",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingInfo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stakingVoucher",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "destination",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseHolding",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseHoldingAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "setUnlockedV0",
      "accounts": [
        {
          "name": "tokenStaking",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "unlocked",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "TokenStakingV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseMint",
            "type": "publicKey"
          },
          {
            "name": "targetMint",
            "type": "publicKey"
          },
          {
            "name": "periodUnit",
            "type": {
              "defined": "PeriodUnit"
            }
          },
          {
            "name": "authority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "unlocked",
            "type": "bool"
          },
          {
            "name": "period",
            "type": "u32"
          },
          {
            "name": "rewardPercentPerPeriodPerLockupPeriod",
            "type": "u32"
          },
          {
            "name": "totalBaseAmountStaked",
            "type": "u64"
          },
          {
            "name": "targetAmountPerPeriod",
            "type": "u64"
          },
          {
            "name": "targetAmountUnredeemed",
            "type": "u64"
          },
          {
            "name": "lastCalculatedTimestamp",
            "type": "i64"
          },
          {
            "name": "createdTimestamp",
            "type": "i64"
          },
          {
            "name": "voucherNumber",
            "type": "u16"
          },
          {
            "name": "bumpSeed",
            "type": "u8"
          },
          {
            "name": "targetMintAuthorityBumpSeed",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "StakingInfoV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenStaking",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "totalBaseAmountStaked",
            "type": "u64"
          },
          {
            "name": "targetAmountPerPeriod",
            "type": "u64"
          },
          {
            "name": "targetAmountUnredeemed",
            "type": "u64"
          },
          {
            "name": "lastCollectedTimestamp",
            "type": "i64"
          },
          {
            "name": "createdTimestamp",
            "type": "i64"
          },
          {
            "name": "maxVoucherNumber",
            "type": "u16"
          },
          {
            "name": "bumpSeed",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "StakingVoucherV0",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenStaking",
            "type": "publicKey"
          },
          {
            "name": "stakingInfo",
            "type": "publicKey"
          },
          {
            "name": "baseHolding",
            "type": "publicKey"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "baseAmount",
            "type": "u64"
          },
          {
            "name": "createdTimestamp",
            "type": "i64"
          },
          {
            "name": "lastCollectedTimestamp",
            "type": "i64"
          },
          {
            "name": "lockupPeriods",
            "type": "u64"
          },
          {
            "name": "voucherNumber",
            "type": "u16"
          },
          {
            "name": "holdingBumpSeed",
            "type": "u8"
          },
          {
            "name": "holdingAuthorityBumpSeed",
            "type": "u8"
          },
          {
            "name": "bumpSeed",
            "type": "u8"
          },
          {
            "name": "ataBumpSeed",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitializeTokenStakingV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "periodUnit",
            "type": {
              "defined": "PeriodUnit"
            }
          },
          {
            "name": "period",
            "type": "u32"
          },
          {
            "name": "rewardPercentPerPeriodPerLockupPeriod",
            "type": "u32"
          },
          {
            "name": "authority",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "bumpSeed",
            "type": "u8"
          },
          {
            "name": "targetMintAuthorityBumpSeed",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "StakeV0Args",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "voucherNumber",
            "type": "u16"
          },
          {
            "name": "baseAmount",
            "type": "u64"
          },
          {
            "name": "lockupPeriods",
            "type": "u64"
          },
          {
            "name": "bumpSeed",
            "type": "u8"
          },
          {
            "name": "holdingBumpSeed",
            "type": "u8"
          },
          {
            "name": "holdingAuthorityBumpSeed",
            "type": "u8"
          },
          {
            "name": "ataBumpSeed",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "PeriodUnit",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "SECOND"
          },
          {
            "name": "MINUTE"
          },
          {
            "name": "HOUR"
          },
          {
            "name": "DAY"
          },
          {
            "name": "YEAR"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NoMintAuthority",
      "msg": "Target mint must have an authority"
    },
    {
      "code": 6001,
      "name": "InvalidMintAuthority",
      "msg": "Target mint must have an authority that is a pda of this program"
    },
    {
      "code": 6002,
      "name": "StakingAlreadyInitialized",
      "msg": "Staking is already initialized"
    },
    {
      "code": 6003,
      "name": "InvalidStakingVoucherPDA",
      "msg": "Invalid pda for staking voucher, should be [stake-voucher, owner, token staking, voucher number]"
    },
    {
      "code": 6004,
      "name": "ArithmeticError",
      "msg": "Error in precise number arithmetic"
    },
    {
      "code": 6005,
      "name": "LockupNotPassed",
      "msg": "This voucher is still in the lockup period"
    },
    {
      "code": 6006,
      "name": "CollectBeforeUnstake",
      "msg": "You must collect on this voucher before unstaking it. You should do both in the same transaction"
    },
    {
      "code": 6007,
      "name": "AccountDidNotSerialize",
      "msg": "Account did not serialize while closing"
    },
    {
      "code": 6008,
      "name": "NoAuthority",
      "msg": "No authority on this staking instance"
    }
  ]
};
export type SplTokenStakingIDL = {"version":"0.4.1","name":"spl_token_staking","instructions":[{"name":"initializeTokenStakingV0","accounts":[{"name":"payer","isMut":true,"isSigner":true},{"name":"tokenStaking","isMut":true,"isSigner":false},{"name":"baseMint","isMut":false,"isSigner":false},{"name":"targetMint","isMut":false,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false},{"name":"clock","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"InitializeTokenStakingV0Args"}}]},{"name":"initializeStakingInfoV0","accounts":[{"name":"payer","isMut":false,"isSigner":true},{"name":"tokenStaking","isMut":true,"isSigner":false},{"name":"stakingInfo","isMut":true,"isSigner":false},{"name":"owner","isMut":false,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false},{"name":"clock","isMut":false,"isSigner":false}],"args":[{"name":"bumpSeed","type":"u8"}]},{"name":"stakeV0","accounts":[{"name":"payer","isMut":false,"isSigner":true},{"name":"tokenStaking","isMut":true,"isSigner":false},{"name":"stakingInfo","isMut":false,"isSigner":false},{"name":"stakingVoucher","isMut":true,"isSigner":false},{"name":"baseMint","isMut":false,"isSigner":false},{"name":"purchaseAccount","isMut":true,"isSigner":false},{"name":"owner","isMut":false,"isSigner":true},{"name":"baseHolding","isMut":true,"isSigner":false},{"name":"baseHoldingAuthority","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false},{"name":"rent","isMut":false,"isSigner":false},{"name":"clock","isMut":false,"isSigner":false}],"args":[{"name":"args","type":{"defined":"StakeV0Args"}}]},{"name":"collectRewardsV0","accounts":[{"name":"tokenStaking","isMut":true,"isSigner":false},{"name":"stakingInfo","isMut":true,"isSigner":false},{"name":"stakingVoucher","isMut":true,"isSigner":false},{"name":"destination","isMut":true,"isSigner":false},{"name":"targetMint","isMut":true,"isSigner":false},{"name":"mintAuthority","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false},{"name":"clock","isMut":false,"isSigner":false}],"args":[]},{"name":"unstakeV0","accounts":[{"name":"tokenStaking","isMut":true,"isSigner":false},{"name":"stakingInfo","isMut":true,"isSigner":false},{"name":"stakingVoucher","isMut":true,"isSigner":false},{"name":"owner","isMut":true,"isSigner":true},{"name":"destination","isMut":true,"isSigner":false},{"name":"baseHolding","isMut":true,"isSigner":false},{"name":"baseHoldingAuthority","isMut":false,"isSigner":false},{"name":"clock","isMut":false,"isSigner":false},{"name":"tokenProgram","isMut":false,"isSigner":false},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[]},{"name":"setUnlockedV0","accounts":[{"name":"tokenStaking","isMut":true,"isSigner":false},{"name":"authority","isMut":false,"isSigner":true}],"args":[{"name":"unlocked","type":"bool"}]}],"accounts":[{"name":"tokenStakingV0","type":{"kind":"struct","fields":[{"name":"baseMint","type":"publicKey"},{"name":"targetMint","type":"publicKey"},{"name":"periodUnit","type":{"defined":"PeriodUnit"}},{"name":"authority","type":{"option":"publicKey"}},{"name":"unlocked","type":"bool"},{"name":"period","type":"u32"},{"name":"rewardPercentPerPeriodPerLockupPeriod","type":"u32"},{"name":"totalBaseAmountStaked","type":"u64"},{"name":"targetAmountPerPeriod","type":"u64"},{"name":"targetAmountUnredeemed","type":"u64"},{"name":"lastCalculatedTimestamp","type":"i64"},{"name":"createdTimestamp","type":"i64"},{"name":"voucherNumber","type":"u16"},{"name":"bumpSeed","type":"u8"},{"name":"targetMintAuthorityBumpSeed","type":"u8"}]}},{"name":"stakingInfoV0","type":{"kind":"struct","fields":[{"name":"tokenStaking","type":"publicKey"},{"name":"owner","type":"publicKey"},{"name":"totalBaseAmountStaked","type":"u64"},{"name":"targetAmountPerPeriod","type":"u64"},{"name":"targetAmountUnredeemed","type":"u64"},{"name":"lastCollectedTimestamp","type":"i64"},{"name":"createdTimestamp","type":"i64"},{"name":"maxVoucherNumber","type":"u16"},{"name":"bumpSeed","type":"u8"}]}},{"name":"stakingVoucherV0","type":{"kind":"struct","fields":[{"name":"tokenStaking","type":"publicKey"},{"name":"stakingInfo","type":"publicKey"},{"name":"baseHolding","type":"publicKey"},{"name":"owner","type":"publicKey"},{"name":"baseAmount","type":"u64"},{"name":"createdTimestamp","type":"i64"},{"name":"lastCollectedTimestamp","type":"i64"},{"name":"lockupPeriods","type":"u64"},{"name":"voucherNumber","type":"u16"},{"name":"holdingBumpSeed","type":"u8"},{"name":"holdingAuthorityBumpSeed","type":"u8"},{"name":"bumpSeed","type":"u8"},{"name":"ataBumpSeed","type":"u8"}]}}],"types":[{"name":"InitializeTokenStakingV0Args","type":{"kind":"struct","fields":[{"name":"periodUnit","type":{"defined":"PeriodUnit"}},{"name":"period","type":"u32"},{"name":"rewardPercentPerPeriodPerLockupPeriod","type":"u32"},{"name":"authority","type":{"option":"publicKey"}},{"name":"bumpSeed","type":"u8"},{"name":"targetMintAuthorityBumpSeed","type":"u8"}]}},{"name":"StakeV0Args","type":{"kind":"struct","fields":[{"name":"voucherNumber","type":"u16"},{"name":"baseAmount","type":"u64"},{"name":"lockupPeriods","type":"u64"},{"name":"bumpSeed","type":"u8"},{"name":"holdingBumpSeed","type":"u8"},{"name":"holdingAuthorityBumpSeed","type":"u8"},{"name":"ataBumpSeed","type":"u8"}]}},{"name":"PeriodUnit","type":{"kind":"enum","variants":[{"name":"SECOND"},{"name":"MINUTE"},{"name":"HOUR"},{"name":"DAY"},{"name":"YEAR"}]}}],"errors":[{"code":6000,"name":"NoMintAuthority","msg":"Target mint must have an authority"},{"code":6001,"name":"InvalidMintAuthority","msg":"Target mint must have an authority that is a pda of this program"},{"code":6002,"name":"StakingAlreadyInitialized","msg":"Staking is already initialized"},{"code":6003,"name":"InvalidStakingVoucherPDA","msg":"Invalid pda for staking voucher, should be [stake-voucher, owner, token staking, voucher number]"},{"code":6004,"name":"ArithmeticError","msg":"Error in precise number arithmetic"},{"code":6005,"name":"LockupNotPassed","msg":"This voucher is still in the lockup period"},{"code":6006,"name":"CollectBeforeUnstake","msg":"You must collect on this voucher before unstaking it. You should do both in the same transaction"},{"code":6007,"name":"AccountDidNotSerialize","msg":"Account did not serialize while closing"},{"code":6008,"name":"NoAuthority","msg":"No authority on this staking instance"}]};

export type PeriodUnit = Record<string, Record<string, any>>
export const PeriodUnit = {
  SECOND: { second: {} },
  MINUTE: { minute: {} },
  HOUR: { hour: {} },
  DAY: { day: {} },
  YEAR: { year: {} }
}
    

  

export type TokenStakingV0 = IdlAccounts<SplTokenStakingIDL>["tokenStakingV0"]

export type StakingInfoV0 = IdlAccounts<SplTokenStakingIDL>["stakingInfoV0"]

export type StakingVoucherV0 = IdlAccounts<SplTokenStakingIDL>["stakingVoucherV0"]
  
          