module credit_carbon_manager::certificate_nft;

use iota::display;
use iota::event;
use iota::package;
use iota::tx_context::sender;
use iota::url::{Self, Url};
use std::string::{utf8, String};

public struct CERTIFICATE_NFT has drop {}

// This is the NFT object that will be minted
public struct CertificateNFT has key, store {
    id: UID,
    name: String,
    image_url: Url,
    description: String,
    credits: u64,
    consumer: address,
}

// This is the event that will be emitted when the NFT is minted
public struct CertificateNFTMinted has copy, drop {
    object_id: ID,
    receiver: address,
    credits: u64,
}

fun init(otw: CERTIFICATE_NFT, ctx: &mut TxContext) {
    // Config display
    let keys = vector[
        utf8(b"name"),
        utf8(b"link"),
        utf8(b"image_url"),
        utf8(b"description"),
        utf8(b"project_url"),
        utf8(b"credits"),
        utf8(b"consumer"),
    ];

    let values = vector[
        utf8(b"{name}"),
        utf8(b"https://brolab-carbon.io/cert/{id}"),
        utf8(b"{image_url}"),
        utf8(b"{description}"),
        utf8(b"https://brolab-carbon.io"),
        utf8(b"{credits}"),
        utf8(b"{consumer}"),
    ];

    // Claim the `Publisher` for the package!
    let publisher = package::claim(otw, ctx);

    // Get a new `Display` object for the `MinterPassNFT` type.
    let mut display = display::new_with_fields<CertificateNFT>(
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

public(package) fun mint(recevier: address, credits: u64, ctx: &mut TxContext): ID {
    let certificate_nft = CertificateNFT {
        id: object::new(ctx),
        name: utf8(b"Carbon Credit Consume Certificate"),
        image_url: url::new_unsafe_from_bytes(
            b"https://carbonoffsetcertification.com/wp-content/uploads/2023/01/CO_certification.jpg",
        ),
        description: utf8(
            b"This NFT is a certificate for carbon credit consumption. It is issued to the consumer of carbon credits. The NFT contains the details of the carbon credit consumed, including the amount and the date of consumption.",
        ),
        consumer: recevier,
        credits,
    };

    let id = object::id(&certificate_nft);

    event::emit(CertificateNFTMinted {
        object_id: id,
        receiver: recevier,
        credits,
    });

    transfer::public_transfer(certificate_nft, recevier);
    id
}
