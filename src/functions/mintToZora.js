const {
  zoraNftCreatorV1Config,
  erc721DropABI,
} = require("@zoralabs/zora-721-contracts");
const { ethers } = require("ethers");
const dotenv = require("dotenv");
const { encodeAbiParameters, parseAbiParameters, parseEther } = require("viem");
dotenv.config();
let abi = erc721DropABI;
let address = "0xc4aaac30f8091e645336e9e02a5675d51ee956de";
let provider = new ethers.JsonRpcProvider("https://rpc.zora.energy");
let wallet = new ethers.Wallet(process.env.RAVEHSARE_WALLET, provider);
let contract = new ethers.Contract(address, abi, wallet);
const mintFee = parseEther("0.000777");
const quantity = 1;
const value = mintFee * BigInt(quantity);
const recipientAddress = "0x0CF97e9C28C5b45C9Dc20Dd8c9d683E0265190CB";
const comment = "mint from raveshare";
const mintReferralAddress = process.env.MINT_REFERRAL_ADDRESS; 

let contractWithSigner = contract.connect(wallet);
async function callMintWithRewards() {
  try {
    const transaction = await contractWithSigner.mintWithRewards(
      recipientAddress,
      BigInt(quantity),
      comment,
      mintReferralAddress,
      {
        value,
      }
    );
    await transaction.wait();

    console.log("Transaction hash:", transaction.hash);
    console.log("Transaction completed.");
  } catch (error) {
    console.error("Error:", error);
  }
}

// callMintWithRewards();
