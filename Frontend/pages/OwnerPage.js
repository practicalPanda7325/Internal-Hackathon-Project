import styles from "@/styles/Home.module.css";
import {abi} from "../constants/ContractAbi"
import { useRef, useState } from "react";
import { ethers } from "ethers";

export default function Home() {

  const [isConnected, setIsConnected] = useState(true);
  const [signer, setSigner] = useState();

  const mintpoints= useRef();
  const merchname = useRef();
  const tokenId= useRef();
  const reciever = useRef();

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  let points,merchName;
  let TokenId,Reciever;

  const [mintForm, setMintForm] = useState(false);
  const [transferForm, setTransferForm] = useState(false);

  async function connect() {
    if(typeof window.ethereum !== "undefined"){
      try{
        await ethereum.request({method: "eth_requestAccounts"});
        setIsConnected(true);
        let connectedProvider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(connectedProvider.getSigner())
      }catch(e){
        console.log(e)
      }
  }else{
    setIsConnected(false)
  }}

  async function handleMintSubmit(){
    try{
    await connect();
    console.log("handleMintSubmit")
    TokenId = tokenId.current.value;
    Reciever = reciever.current.value;
    console.log(TokenId,Reciever);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    console.log(contract)
    await contract.transfer(tokenId,reciever);
    }catch(e){
      console.log(e)
    }
  }

  async function handleTransferSubmit(){
    try{
    await connect();
    console.log("handleTransferSubmit")
    points = mintpoints.current.value;
    merchName = merchname.current.value;
    console.log(points,merchName);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    console.log(contract)
    await contract.mintNft(points,merchName);
    }catch(e){
      console.log(e)
    }
  }
  

  return (
    <div> 
      {isConnected?(
      <>
        <p>Connected!</p>
        <button onClick={()=>setMintForm(!mintForm)}>Mint</button>
        {mintForm && <div>
          <label htmlFor="mintPoints">Points: </label>
          <input type="number" id="mintPoints" name="mintPoints" ref={mintpoints} placeholder="Enter Points"></input><br></br>
          <label htmlFor="mintPoints">Product Name/Description: </label>
          <input type ="text" id="mintDesc" name="mintDesc" ref={merchname} placeholder="Enter Name"></input><br></br>
          <button id="mintSubmit" onClick={() => {handleMintSubmit()}}> Submit</button>
        </div>}
        <button onClick={()=>setTransferForm(!transferForm)}>Transfer</button>
        {transferForm && <div>
          <label htmlFor="tokenId">tokenId </label>
          <input type="number" id="tokenId" name="tokenId" ref={tokenId} placeholder="Enter TokenId"></input><br></br>
          <label htmlFor="reciever">Reciever Account Name: </label>
          <input type ="text" id="reciever" name="reciever" ref={reciever} placeholder="Reciever Account Name"></input><br></br>
          <button id="mintSubmit" onClick={() => {handleTransferSubmit()}}> Submit</button>
        </div>}
      </>
      ):(
        <button onClick={() => connect()}>Connect</button>
      )
    }
    </div>
  );
}