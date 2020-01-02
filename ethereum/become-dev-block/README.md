1. puppeth to create a new genesis
`geth --datadir . init chainskills.json`

create accounts - pass: password
`ls keystore/`

`geth --datadir . account list`

to start:
`./startnode.sh`

to connect to the running node
`geth attach`

web3 api
`eth.accounts`
`eth.getBalance(eth.accounts[0])`

add metamask: https://metamask.io/
ganache then add the localhost netwoor