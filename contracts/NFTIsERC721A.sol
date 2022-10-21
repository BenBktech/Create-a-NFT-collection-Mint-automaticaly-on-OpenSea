pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721A.sol";

error NFT__ExceededSupply();

contract NFTIsERC721A is ERC721A, Ownable {

    uint256 private immutable i_collection_size; 

    constructor(uint256 collection_size) ERC721A("Collection Name", "Symbol") {
        i_collection_size = collection_size;
    }

    function mint(uint256 quantity) external payable onlyOwner {
        if(totalSupply() + quantity > i_collection_size) {
            revert NFT__ExceededSupply();
        }
        _mint(msg.sender, quantity);
    }

    function getCollectionSize() external view returns(uint256) {
        return i_collection_size;
    }
}