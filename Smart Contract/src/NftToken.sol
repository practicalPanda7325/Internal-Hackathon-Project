//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18; 
import "lib/openzeppelin-contracts/contracts/utils/Strings.sol";

contract NftToken{ 

    struct MerchToken{
        string nftName;
        uint8 points;
        uint256 tokenId;
        string merchName;
        string manufacturingMonth;
        address[] previousOwners;
        address currentOwner;
    }

    uint256 constant SECONDS_IN_MONTH = 2629800;
    uint256 constant SECONDS_IN_YEAR = 31557600;


    uint256 tokenCounter;
    address company;
    string nftName;
    MerchToken[] merchToken;
    

    constructor(string memory _nftName, address owner){
        company = owner;
        tokenCounter = 5;
        nftName =_nftName;
    }

    modifier onlyCompany() {
        require(msg.sender == company);
        _;
    }

    modifier onlyOwner(uint256 tokenId, address owner) {
        require(keccak256(abi.encodePacked(merchToken[tokenId].currentOwner)) == keccak256(abi.encodePacked(owner)));
        _;
    }

    function mintNft(uint8 points,string memory _merchName) external {
        string memory _manufacturing = "";
        _manufacturing = string.concat(Strings.toString((block.timestamp%SECONDS_IN_YEAR)/SECONDS_IN_MONTH + 1),Strings.toString(block.timestamp/SECONDS_IN_YEAR + 1970));
        merchToken.push(MerchToken(nftName,points,tokenCounter,_merchName,_manufacturing,new address[](0),company));
        tokenCounter = tokenCounter + 1;
    }

    function transfer(uint256 tokenId,address reciever) external onlyOwner(tokenId,msg.sender) {
        merchToken[tokenId].previousOwners.push(msg.sender);
        merchToken[tokenId].currentOwner = reciever;
    }

    function getTokenCounter() external view returns(uint256){
        return tokenCounter;
    }

    function random(uint256 nonce) private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.prevrandao, block.timestamp,nonce )));
    }

    function pickWinners(uint numberOfWinners) public view returns(address[] memory){
        address[] memory winners = new address[](numberOfWinners);

    for (uint i = 0; i < numberOfWinners; i++) {
        uint index = random(i) % tokenCounter;
        winners[i] = merchToken[index].currentOwner;
        }
        return winners;
    }

}
      