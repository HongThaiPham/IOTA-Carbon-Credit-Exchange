module credit_carbon_manager::credit_carbon_manager;

use credit_carbon_manager::credit_token;
use credit_carbon_manager::minter_pass_nft;

public fun issue_minter_pass_nft(
    minter_config: &minter_pass_nft::AppConfig,
    image_url: vector<u8>,
    recevier: address,
    ctx: &mut TxContext,
) {
    minter_pass_nft::mint(minter_config, image_url, recevier, ctx)
}

public fun mint_credit_token<T>(
    credit_manager: &mut credit_token::CreditManager<T>,
    minter_pass_nft: &minter_pass_nft::MinterPassNFT,
    amount: u64,
    recipient: address,
    ctx: &mut TxContext,
) {
    credit_token::mint(credit_manager, minter_pass_nft, amount, recipient, ctx)
}

public fun update_credit_points(
    minter_pass_nft: &mut minter_pass_nft::MinterPassNFT,
    credit_points: u64,
    ctx: &mut TxContext,
) {
    minter_pass_nft::update_credit_points(minter_pass_nft, credit_points, ctx);
}
