# node-clightning-rpc
[![NPM](https://img.shields.io/npm/v/clightning-rpc.svg)](https://www.npmjs.org/package/clightning-rpc)

Connect to lightningd of the c-lightning implementation of a lightning network node with RPC

## Installation
Installation

```
npm install clightning-rpc --save
```

## Usage

### Initialization
```javascript
const CLightning = require('clightning-rpc')

const client = new CLightning([RPC_PROCESS_FILE_PATH])
```

### Example
```javascript
const CLightning = require('clightning-rpc')

const client = new CLightning()

//Returns Promises. No Callbacks (It is 2018)

client.listNodes()
.then(nodes => {
    console.log(nodes)
})
.catch(e => {
    console.log(e)
})
```

### Methods
lightning-rpc methods and coresponding function

* listnodes : `client.listNodes()` or `client.getNode(id)`
* connect : `client.connectToPeer('id@host:port')` or `client.connectToPeer(id, host[, port])`
* listpeers : `client.listPeers()` or `client.getPeer(id)`
* getroute : `client.getRoute(id, msatoshi[, riskfactor][, cltv])`
* listchannels : `client.listChannels()` or `client.getChannel(short_channel_id)`
* invoice : `client.createInvoice(msatoshi, label, description[, expiry][, fallback][, preimage])`
* listinvoices : `client.listInvoices()` or `client.getInvoice(label)`
* delinvoice : `deleteInvoice(label[, status])`
* waitanyinvoice : `waitAnyInvoice([lastpay_index])`
* decodepay : `client.decodePay(bolt11[, description])`
* help : `client.help()`
* stop : `client.stop()`
* getlog : `client.getLog([level])`
* getinfo : `client.getInfo()`
* sendPay : `client.sendPay(route, payment_hash)`
* waitSendPay : `client.waitSendPay(payment_hash, timeout)`
* pay : `client.pay(bolt11[, msatoshi][, description][, riskfactor][, maxfeepercent][, retry_for][, maxdelay])`
* fundchannel : `client.fundChannel(nodeID, satoshi)`
* close : `client.closeChannel(id[, force][, timeout])`
* withdraw : `client.withdraw(destination, satoshi)`
* newaddr : `client.newAddress([addresstype])`
* listfunds : `client.listFunds()`
* disconnect : `client.disconnectPeer(id)`
* listpayments : `client.listPayments()`
* dev-listaddrs : `client.devListAddresses([index])`

### Utility Methods
Useful utility methods

`client.utilConnectPeers(peerArray[, ignoreFailed])`
```javascript
const CLightning = require('node-clightning-rpc')

const client = new CLightning()

const peers = [
    "024a2e265cd66066b78a788ae615acdc84b5b0dec9efac36d7ac87513015eaf6ed@52.16.240.222:9735",
    "03e50492eab4107a773141bb419e107bda3de3d55652e6e1a41225f06a0bbf2d56@35.172.33.197:9735",
    "02a45def9ae014fdd2603dd7033d157faa3a55a72b06a63ae22ef46d9fafdc6e8d@85.216.75.225:9735"
]

client.utilConnectPeers(peers)
.then(data => {
    console.log(data)
})
.catch(e => {console.log(e)})

// OUTPUT
// [ { id:
//     '024a2e265cd66066b78a788ae615acdc84b5b0dec9efac36d7ac87513015eaf6ed' },
//  { id:
//     '03e50492eab4107a773141bb419e107bda3de3d55652e6e1a41225f06a0bbf2d56' },
//  { id:
//     '02a45def9ae014fdd2603dd7033d157faa3a55a72b06a63ae22ef46d9fafdc6e8d' } ]
```

## LICENSE [MIT](LICENSE)
