require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

PRIVATE_KEY = process.env.NOT_THE_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    Bsc_testnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      accounts: [`${PRIVATE_KEY}`]
    }
  },
  paths: {
    sources: "./ethereum/contracts",
    tests: "./test",
    cache: "./ethereum/cache",
    artifacts: "./ethereum/build/artifacts"
  }
};
