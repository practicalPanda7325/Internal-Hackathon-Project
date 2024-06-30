// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/NftToken.sol";

contract DeployNftToken is Script {

    function run() external returns(address){
        uint256 deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        vm.startBroadcast(deployerPrivateKey);

        NftToken nftToken = new NftToken("Taylor Swift",msg.sender);

        vm.stopBroadcast();
    }

}