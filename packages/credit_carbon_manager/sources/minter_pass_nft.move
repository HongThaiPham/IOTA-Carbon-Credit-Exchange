module credit_carbon_manager::minter_pass_nft;

use iota::display;
use iota::event;
use iota::package;
use iota::tx_context::sender;
use iota::url::{Self, Url};
use std::string::{utf8, String};

#[error]
const ENOTADMIN: vector<u8> = b"Only Admin can do this action";

public struct MINTER_PASS_NFT has drop {}

// This is the NFT object that will be minted
public struct MinterPassNFT has key, store {
    id: UID,
    name: String,
    image_url: Url,
    description: String,
    creator: address,
    credit_points: u64,
}

// Struct presenting a module configuration
public struct AppConfig has key, store {
    id: UID,
    address: address,
}

// This is the event that will be emitted when the NFT is minted
public struct MinterPassNFTMinted has copy, drop {
    object_id: ID,
    creator: address,
    receiver: address,
}

public struct CreditPointUpdated has copy, drop {
    object_id: ID,
    updated_by: address,
    credit_points: u64,
}

fun init(otw: MINTER_PASS_NFT, ctx: &mut TxContext) {
    // Create a new `AppConfig` object and share it
    transfer::share_object(AppConfig { id: object::new(ctx), address: sender(ctx) });

    // Config display
    let keys = vector[
        utf8(b"name"),
        utf8(b"link"),
        utf8(b"image_url"),
        utf8(b"description"),
        utf8(b"project_url"),
        utf8(b"creator"),
    ];

    let values = vector[
        utf8(b"{name}"),
        utf8(b"https://brolab-carbon.io/nft/{id}"),
        utf8(b"{image_url}"),
        utf8(b"{description}"),
        utf8(b"https://brolab-carbon.io"),
        utf8(b"{creator}"),
    ];

    // Claim the `Publisher` for the package!
    let publisher = package::claim(otw, ctx);

    // Get a new `Display` object for the `MinterPassNFT` type.
    let mut display = display::new_with_fields<MinterPassNFT>(
        &publisher,
        keys,
        values,
        ctx,
    );

    // Commit first version of `Display` to apply changes.
    display::update_version(&mut display);

    transfer::public_transfer(publisher, sender(ctx));
    transfer::public_transfer(display, sender(ctx));
}

public(package) fun mint(
    config: &AppConfig,
    image_url: vector<u8>,
    recevier: address,
    ctx: &mut TxContext,
) {
    let sender = sender(ctx);
    assert!(sender == config.address, ENOTADMIN);
    let minter_pass_nft = MinterPassNFT {
        id: object::new(ctx),
        name: utf8(b"Carbon Credit Minter Pass"),
        image_url: url::new_unsafe_from_bytes(image_url),
        description: utf8(
            b"This NFT is a Minter Pass for the Carbon Credit project. It allows the holder to mint carbon credits.",
        ),
        creator: sender,
        credit_points: 0,
    };

    // Emit the `MinterPassNFTMinted` event.
    event::emit(MinterPassNFTMinted {
        object_id: object::id(&minter_pass_nft),
        creator: sender,
        receiver: recevier,
    });

    // Transfer the `MinterPassNFT` object to the receiver.
    transfer::public_transfer(minter_pass_nft, recevier);
}

public fun update_credit_points(
    minter_pass_nft: &mut MinterPassNFT,
    credit_points: u64,
    ctx: &mut TxContext,
) {
    let sender = sender(ctx);
    assert!(sender == minter_pass_nft.creator, ENOTADMIN);
    // Update the credit points of the `MinterPassNFT` object.
    minter_pass_nft.credit_points = credit_points;
    // Emit the `MinterPassNFTMinted` event.
    event::emit(CreditPointUpdated {
        object_id: object::id(minter_pass_nft),
        updated_by: sender,
        credit_points: credit_points,
    });
}
