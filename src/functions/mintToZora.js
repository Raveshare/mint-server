const {
  zoraNftCreatorV1Config,
  erc721DropABI,
} = require("@zoralabs/zora-721-contracts");
const { ethers } = require("ethers");
const dotenv = require("dotenv");
const { parseEther } = require("viem");
dotenv.config();

let abi = erc721DropABI;
let provider = new ethers.JsonRpcProvider("https://rpc.zora.energy");
let wallet = new ethers.Wallet(process.env.RAVEHSARE_WALLET, provider);

const mintFee = parseEther("0.000777");
const quantity = 1;
const value = mintFee * BigInt(quantity);
const comment = "gm gm!, mint from raveshare";
const mintReferralAddress = process.env.MINT_REFERRAL_ADDRESS;

async function callMintWithRewards(zoraContract,recipientAddress) {
  let contract = new ethers.Contract(zoraContract, abi, wallet);
  let contractWithSigner = contract.connect(wallet);
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

module.exports = callMintWithRewards;
