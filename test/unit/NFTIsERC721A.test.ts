import { assert, expect } from "chai"
import { network, deployments, ethers } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import {NFTIsERC721A} from '../../typechain-types/contracts/NFTIsERC721A.sol/NFTIsERC721A';

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Dynamic SVG NFT Unit Tests", function () {
        let NFTIsERC721A: NFTIsERC721A
        let deployer, accounts

        before(async () => {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
            await deployments.fixture(["nftiserc721a"])
            NFTIsERC721A = await ethers.getContract("NFTIsERC721A")
        })

        describe("Constructor", function() {
            it('sets the values correctly', async function() {
                let numberOfNFTs = await (await NFTIsERC721A.getCollectionSize()).toString()
                let awaitedNumberOfNFTs = '100'
                let name = await NFTIsERC721A.name()
                let symbol = await NFTIsERC721A.symbol()
                
                assert.equal(numberOfNFTs, awaitedNumberOfNFTs)
                assert.equal(name, "Collection Name")
                assert.equal(symbol, "Symbol")
            })
        })

        describe("Mint", function() {
            it('do not mint if not owner of the smart contract', async function() {
                await expect(NFTIsERC721A.connect(accounts[1]).mint(3)).to.be.revertedWith(
                    "Ownable: caller is not the owner"
                )
            })
            it('do mint if owner of the smart contract', async function() {
                let tx = await NFTIsERC721A.mint(1)
                await tx.wait(1)
                let balanceOfOwner = await (await NFTIsERC721A.balanceOf(accounts[0].address)).toString()
                assert.equal(balanceOfOwner, '1');
            })
            it('do mint 50 NFTs if owner of the smart contract', async function() {
                let tx = await NFTIsERC721A.mint(50)
                await tx.wait(1)
                let balanceOfOwner = await (await NFTIsERC721A.balanceOf(accounts[0].address)).toString()
                assert.equal(balanceOfOwner, '51');
            })
            it('do mint 49 NFTs if owner of the smart contract', async function() {
                let tx = await NFTIsERC721A.mint(49)
                await tx.wait(1)
                let balanceOfOwner = await (await NFTIsERC721A.balanceOf(accounts[0].address)).toString()
                assert.equal(balanceOfOwner, '100');
            })
            it('do not mint 4 NFTs if owner of the smart contract because max supply would be exceeded', async function() {
                await expect(NFTIsERC721A.mint(4)).to.be.revertedWithCustomError(
                    NFTIsERC721A,
                    "NFT__ExceededSupply"
                )
            })
        })
    })