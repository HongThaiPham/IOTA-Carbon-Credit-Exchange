module credit_carbon_manager::credit_carbon_manager;

use credit_carbon_manager::certificate_nft;
use credit_carbon_manager::credit_token;
use credit_carbon_manager::minter_pass_nft;
use iota::coin;
use iota::event;
use iota::object_table;
use iota::tx_context::sender;

#[error]
const EINVALIDNFT: vector<u8> = b"Invalid Minter Pass NFT";
#[error]
const ENOCREDITRECORD: vector<u8> = b"Carbon Credit Record Not Found";

public struct CarbonCreditRecord has key, store {
    id: UID,
    avaiable_credit: u64,
    minted_credit: u64,
}

public struct CarbonCreditTable has key, store {
    id: UID,
    data: object_table::ObjectTable<ID, CarbonCreditRecord>,
}

public struct CreditPointUpdated has copy, drop {
    object_id: ID,
    updated_by: address,
    old_credit_points: u64,
    new_credit_points: u64,
}

fun init(ctx: &mut TxContext) {
    transfer::share_object(CarbonCreditTable {
        id: object::new(ctx),
        data: object_table::new(ctx),
    });
}

public fun issue_minter_pass_nft(
    table: &mut CarbonCreditTable,
    minter_config: &minter_pass_nft::AppConfig,
    image_url: vector<u8>,
    recevier: address,
    ctx: &mut TxContext,
) {
    let id = minter_pass_nft::mint(minter_config, image_url, recevier, ctx);
    table
        .data
        .add(
            id,
            CarbonCreditRecord {
                id: object::new(ctx),
                avaiable_credit: 0,
                minted_credit: 0,
            },
        );
}

public fun mint_credit_token<T>(
    table: &mut CarbonCreditTable,
    credit_manager: &mut credit_token::CreditManager<T>,
    minter_pass_nft: &minter_pass_nft::MinterPassNFT,
    amount: u64,
    recipient: address,
    ctx: &mut TxContext,
) {
    assert!(amount > 0, EINVALIDNFT);
    let id = object::id(minter_pass_nft);

    assert!(table.data.contains(id), ENOCREDITRECORD);

    let data: &mut CarbonCreditRecord = table.data.borrow_mut(id);

    assert!(data.avaiable_credit >= amount, EINVALIDNFT);

    credit_token::mint(credit_manager, minter_pass_nft, amount, recipient, ctx);

    data.minted_credit = data.minted_credit + amount;
    data.avaiable_credit = data.avaiable_credit - amount;
}

public fun consume_credit_token<T>(
    credit_manager: &mut credit_token::CreditManager<T>,
    coin: coin::Coin<T>,
    ctx: &mut TxContext,
) {
    let amount = credit_token::burn(credit_manager, coin, ctx);

    certificate_nft::mint(sender(ctx), amount, ctx);
}

public fun update_credit_points(
    table: &mut CarbonCreditTable,
    minter_pass_nft_id: ID,
    credit_points: u64,
    _: &minter_pass_nft::CreditPointUpdateCap,
    ctx: &mut TxContext,
) {
    let sender = sender(ctx);
    let id = minter_pass_nft_id; //object::id(minter_pass_nft);
    assert!(table.data.contains(id), EINVALIDNFT);
    let data: &mut CarbonCreditRecord = table.data.borrow_mut(id);

    event::emit(CreditPointUpdated {
        object_id: id,
        updated_by: sender,
        old_credit_points: data.avaiable_credit,
        new_credit_points: credit_points,
    });

    data.avaiable_credit = credit_points;
}

public fun issue_credit_point_update_cap(
    config: &minter_pass_nft::AppConfig,
    receiver: address,
    ctx: &mut TxContext,
) {
    minter_pass_nft::issue_credit_point_update_cap(config, receiver, ctx);
}

public fun get_credit_point(
    table: &mut CarbonCreditTable,
    minter_pass_nft_id: ID,
): &CarbonCreditRecord {
    assert!(table.data.contains(minter_pass_nft_id), EINVALIDNFT);
    let data: &CarbonCreditRecord = table.data.borrow(minter_pass_nft_id);
    data
}
