// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract EpicNFT is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event NewEpicNFTMinted(address sender, uint256 tokenId);

    constructor() ERC721 ("CodePunk", "CDPN") {
        console.log("This is my NFT contract. Whoa!");
    }

    function makeAnEpicNFT(string memory jsonUrl) public {
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, jsonUrl);
        console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
        emit NewEpicNFTMinted(msg.sender, newItemId);
        _tokenIds.increment();
    }
}
//0xe0656831ca9e0aa600478a74aeaa2cf2f167146f

// 0xE0656831CA9e0AA600478a74AeaA2Cf2F167146f