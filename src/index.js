const { Web3 } = require("web3");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  const web3 = new Web3(
    `wss://polygon-mumbai.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
  );

  let options = {
    topics: [
      web3.utils.sha3(
        "ERC20TransactionSuccess(address,address,address,uint256,uint256,uint256)"
      ),
    ],
  };

  let subscription = await web3.eth.subscribe("logs", options);

  subscription.on("data", (event) => {
    if (event.topics.length == 3) {
      let transaction = web3.eth.abi.decodeLog(
        [
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "currency",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "pubId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "profileId",
            type: "uint256",
          },
        ],
        event.data,
        [event.topics[0], event.topics[1], event.topics[2]]
      );

      console.log(transaction);
    }
  });
  subscription.on("error", (err) => {
    throw err;
  });
  subscription.on("connected", (nr) =>
    console.log("Subscription on Raveshare started with ID %s", nr)
  );
}
main();
