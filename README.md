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

## LICENSE [MIT](LICENSE)
