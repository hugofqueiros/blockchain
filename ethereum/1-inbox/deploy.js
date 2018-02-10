const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'confirm indicate artwork remain monkey joke digital galaxy pulp voyage swamp monster',  // Metamask mnemonic
  'https://rinkeby.infura.io/wJl2od71qBptJbMH0tPp' // link from infura rinkeby network 
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  
  console.log('List of accounts', accounts);
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();

// Contract deployed to 0x3308f9990B7a84B0F57d9ca36e4c2DB4942d335d


