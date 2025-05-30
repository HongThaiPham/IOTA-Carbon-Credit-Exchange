module credit_carbon_manager::credit_token;

use credit_carbon_manager::minter_pass_nft::MinterPassNFT;
use iota::coin::{Self, TreasuryCap};
use iota::event;
use iota::tx_context::sender;
use iota::url;

#[error]
const EAMOUNTGT0: vector<u8> = b"Amount must be greater than 0";

public struct CREDIT_TOKEN has drop {}

public struct CreditManager<phantom T> has key {
    id: UID,
    treasury_cap: TreasuryCap<T>,
}

public struct CarbonCreditMinted has copy, drop {
    minter: address,
    amount: u64,
    recipient: address,
}

public struct CarbonCreditConsumed has copy, drop {
    consumer: address,
    amount: u64,
}

fun init(otw: CREDIT_TOKEN, ctx: &mut TxContext) {
    let (treasury_cap, coin_metadata) = coin::create_currency(
        otw,
        0,
        b"CARBON",
        b"Carbon Credit",
        b"This token presents a carbon credit.",
        option::some(
            url::new_unsafe_from_bytes(
                b"https://static.vecteezy.com/system/resources/previews/024/221/135/non_2x/carbon-credit-icon-for-graphic-design-logo-website-social-media-mobile-app-ui-illustration-vector.jpg",
            ),
        ),
        ctx,
    );

    transfer::public_freeze_object(coin_metadata);
    transfer::share_object(CreditManager { id: object::new(ctx), treasury_cap: treasury_cap });
}

public(package) fun mint<T>(
    credit_manager: &mut CreditManager<T>,
    _proof: &MinterPassNFT,
    amount: u64,
    recipient: address,
    ctx: &mut TxContext,
) {
    assert!(amount > 0, EAMOUNTGT0);

    let credit = coin::mint(&mut credit_manager.treasury_cap, amount, ctx);

    event::emit(CarbonCreditMinted {
        minter: sender(ctx),
        amount: amount,
        recipient: recipient,
    });

    transfer::public_transfer(credit, recipient)
}

public(package) fun burn<T>(
    credit_manager: &mut CreditManager<T>,
    coin: coin::Coin<T>,
    ctx: &TxContext,
): u64 {
    assert!(coin::value(&coin) > 0, EAMOUNTGT0);

    let amount = coin::burn<T>(&mut credit_manager.treasury_cap, coin);

    event::emit(CarbonCreditConsumed {
        consumer: sender(ctx),
        amount: amount,
    });

    amount
}
