# node-clightning-rpc
Connect to C-lightning with RPC

## Status
[![npm version][npm-image]][npm-url]

## Installation
Installation

```
npm install clightning-rpc --save
```

##Usage
###Example
```js
const CLightning = require('clightning-rpc')

const clrpc = new CLightning()

//Returns Promises. No Callbacks (It is 2018)

clrpc.listNodes()
.then(nodes => {
    console.log(nodes)
})
.catch(e => {
    console.log(e)
})
```

## Release

```sh
npm version [<newversion> | major | minor | patch] -m "Release %s"
```