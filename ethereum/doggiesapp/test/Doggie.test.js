const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require('../ethereum/build/DoggieFactory.json');
const compiledDoggie = require('../ethereum/build/Doggie.json');

let accounts;
let factory;
let doggieAddress;
let doggie;

beforeEach(async () => {
    // retrieve accounts
    accounts = await web3.eth.getAccounts();

    // deploy contract
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    factory.setProvider(provider);
    
    // create a Doggie from the deployed contract
    await factory.methods.createDoggie('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    // view all doggies and select the first one
    [doggieAddress] = await factory.methods.getCreatedDoggiesList().call();
    doggie = await new web3.eth.Contract(
        JSON.parse(compiledDoggie.interface),
        doggieAddress
    );
});

describe('Doggies', () => {
    it('deploys a factory and a doggie', () => {
        assert.ok(factory.options.address);
        assert.ok(doggie.options.address);
    });

    it('marks caller as the doggie manager', async () => {
        const manager = await doggie.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allows people to contribute money and marks them as approvers', async () => {
        await doggie.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        const isContributor = await doggie.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it('requires a minimum contribution', async () => {
        try {
            await doggie.methods.contribute().send({
                value: '5',
                from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });
})