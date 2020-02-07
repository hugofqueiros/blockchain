// you can do this in a node console just type node

const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');

// Ganache is listening on it
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

web3.eth.accounts;

const CONTRACT_FILE = 'Greetings.sol';
const sourceCode = fs.readFileSync('Greetings.sol').toString();

// console.log('sourceCode', sourceCode);

const input = {
    language: 'Solidiity',
    sources: {
        [CONTRACT_FILE]: {
            content: sourceCode
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }            
        }
    }
}

const compiledCode = solc.compile(JSON.stringify(input));
console.log('compiledCode', compiledCode);

const output = JSON.parse(compiledCode)

console.log('compiledCode', output);

const contractABI = JSON.parse(output.contracts[':Greetings'].interface);



