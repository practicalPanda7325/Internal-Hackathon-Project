import { useRef, useState } from "react";
import { ethers } from "ethers";
import { abi } from "@/constants/DeployContractAbi";

export default function Home(){
    const [isChoosing,setIsChoosing] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isNewOwner, setIsNewOwner] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    
    const [signer, setSigner] = useState();

    const Name = useRef();

    const ownerContracts= new Map();
    const userToAddress= new Map();
    const addressToUser= new Map();

    const DeployerContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    async function newUser(){
        let username = Name.current.value;
        await connect();
        const accounts = await window.ethereum.request({method:'eth_accounts'});
        const address=accounts[0];
        userToAddress.set(username , address)
        addressToUser.set(address, username)
        if(isNewOwner){
            await newOwner(username);
        }
        window.location.href = "http://localhost:3000/OwnerPage";
    }

    async function newOwner(user){
        const contract = new ethers.Contract(DeployerContractAddress, abi, signer);
        contractAddress = await contract.run(user,[overrides.gasLimit],{gasLimit:10000000});
        ownerContracts.set(user,contractAddress);
    }

    async function connect() {
        if(typeof window.ethereum !== "undefined"){
          try{
            await ethereum.request({method: "eth_requestAccounts"});
            let connectedProvider = new ethers.providers.Web3Provider(window.ethereum);
            setSigner(connectedProvider.getSigner())
            if(!isNewOwner || !isNewUser){
                window.location.href = "http://localhost:3000/OwnerPage";
            }
          }catch(e){
            console.log(e);
          }
      }}

    return(
        <div>
            {isChoosing && (
                <div>
              <p>Are you a Company or a User?</p>
                    <button onClick={() => {setIsOwner(true);setIsChoosing(false)}}>Company</button><br></br>
                    <button onClick={() => {setIsUser(true);setIsChoosing(false)}}>User</button>
                </div>
            )}
            {isOwner &&(
                <div>
                    <p>Are you New Company or Existing Company?</p>
                    <button onClick={() => {setIsNewOwner(true);setIsOwner(false)}}> New Company</button><br></br>
                <button onClick={() => connect()}>Existing Company</button>
                </div>
            )}
            {isUser &&(
                <div>
                    <p>Are you New User or Existing User?</p>
                    <button onClick={() => {setIsNewUser(true);setIsUser(false)}}> New User</button><br></br>
                    <a href="http://localhost:3000/UserPage"><button onClick={() => connect()}>Existing User</button></a>
                </div>
            )}
            {!isOwner&& isNewOwner &&(
                <div>
                    <label htmlFor="companyName"> Company Name: </label>
                    <input type="text" id="" name="companyName" ref={Name} placeholder="Enter Company Name"></input><br></br>
                    <button id="newUserSubmit" onClick={() => {newUser()}}> Submit</button>
                </div>
            )}
            {!isUser&& isNewUser &&(
                <div>
                    <label htmlFor="userName"> Company Name: </label>
                    <input type="text" id="" name="userName" ref={Name} placeholder="Enter User Name"></input><br></br>
                    <button id="newUserSubmit" onClick={() => {newUser()}}> Submit</button>
                </div>
            )}
        </div>
    )
}