const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  let args = [1000]

  const NFTIsERC721A = await deploy('NFTIsERC721A', {
		from: deployer,
		args: args,
		log: true,
		waitConfirmations: network.config.blockConfirmations || 1,
	});

  console.log(`Contract NFTIsERC721A deployed at address ${NFTIsERC721A.address}`)

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying...")
    await verify(NFTIsERC721A.address, args)
  }
}

module.exports.tags = ["all", "nftiserc721a", "main"]