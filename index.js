const net = require('net')
const homedir = require('os').homedir()

class CLightningRPC {
    constructor(rpcID = homedir + '/.lightning/lightning-rpc') {
        this.rpcID = rpcID
    }

    rpcRequest(command, params) {
        return new Promise((resolve, reject) => {
            var result = Buffer.alloc(0)
            const client = net.createConnection(this.rpcID)
            client.on("connect", () => {
                const request = {
                    method: command,
                    params: params,
                    id: 0
                }
                client.write(JSON.stringify(request))
            })

            client.on("data", data => {
                result = Buffer.concat([result, data])
                if(result.slice(-3).toString() === ' }\n') {
                    try {
                        const resObj = JSON.parse(result.toString())
                        client.end()
                        if (resObj.error) {
                            reject(resObj.error)
                        }
                        else {
                            resolve(resObj.result)
                        }                   
                    }
                    catch (err) {
                        reject(err)
                    }
                }
            })

            client.on("error", err => {
                client.end()
                reject(err)
            })
        })
    }

    listNodes(id = null) {
        return new Promise((resolve, reject) => {
            this.rpcRequest('listnodes', {id: id})
                .then(data => {
                    resolve(data.nodes)
                })
                .catch(reject)
        })
    }

    connectToPeer(id, host, port = 9735) {
        if (id.includes('@')) {
            const addr = id.split('@')
            id = addr[0]
            host = addr[1]
        }
        if (host.includes(':')) {
            port = parseInt(host.split(':')[1])
        }
        return new Promise((resolve,reject) => {
            this.rpcRequest('connect', {
                id: id,
                host: host,
                port: port
            })
                .then(data => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    listPeers() {
        return new Promise((resolve, reject) => {
            this.rpcRequest('listpeers', {
                id: null,
                level: null
            })
                .then(data => {
                    resolve(data.peers)
                })
                .catch(reject)
        })
    }

    getPeer(id) {
        return new Promise((resolve, reject) => {
            this.rpcRequest('listpeers', {
                id: id,
                level: null
            })
                .then(data => {
                    resolve(data.peers)
                })
                .catch(reject)
        })
    }

    getRoute(id, msatoshi, riskfactor = 0, cltv = 9) {
        return new Promise((resolve, reject) => {
            this.rpcRequest('getroute', {
                id: id,
                msatoshi: msatoshi,
                riskfactor: riskfactor,
                cltv: cltv
            })
                .then(data => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    listChannels() {
        return new Promise((resolve, reject) => {
            this.rpcRequest('listchannels', {
                short_channel_id: null
            })
                .then(data => {
                    resolve(data.channels)
                })
                .catch(reject)
        })
    }

    createInvoice(msatoshi, label, description, expiry = null, fallbacks = null, preimage = null) {
        return new Promise((resolve, reject) => {
            this.rpcRequest('invoice', {
                msatoshi: msatoshi,
                label: label,
                description: description,
                expiry: expiry,
                fallbacks: fallbacks,
                preimage: preimage
            })
                .then(data => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    listInvoices() {
        return new Promise((resolve, reject) => {
            this.rpcRequest('listinvoices', {
                label: null
            })
                .then(data => {
                    resolve(data.invoices)
                })
                .catch(reject)
        })
    }

    deleteInvoice(label, status = 'unpaid') {
        return new Promise((resolve, reject) => {
            this.rpcRequest('delinvoice', {
                label: label,
                status: status
            })
                .then(data => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    waitAnyInvoice(lastpay_index = null) {
        return new Promise((resolve, reject) => {
            this.rpcRequest('waitanyinvoice', {
                lastpay_index: lastpay_index
            })
                .then(data => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    decodePay(bolt11, description = null) {
        return new Promise((resolve, reject) => {
            this.rpcRequest('decodepay', {
                bolt11: bolt11,
                description: description
            })
                .then(data => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    decodePay(bolt11, description = null) {
        return new Promise((resolve, reject) => {
            this.rpcRequest('decodepay', {
                bolt11: bolt11,
                description: description
            })
                .then(data => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    help() {
        return new Promise((resolve, reject) => {
            this.rpcRequest('help', {})
                .then(data => {
                    resolve(data.help)
                })
                .catch(reject)
        })
    }

    stop() {
        return new Promise((resolve, reject) => {
            this.rpcRequest('stop', {})
                .then(data => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    getLog(level = null) {
        return new Promise((resolve, reject) => {
            this.rpcRequest('getlog', {
                level: level
            })
                .then(data => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    getInfo() {
        return new Promise((resolve, reject) => {
            this.rpcRequest('getinfo', {})
                .then(data => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    sendPay(route) {
        return new Promise((resolve, reject) => {
            this.rpcRequest('sendpay', {
                route: route
            })
                .then(data => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    waitSendPay(payment_hash, timeout) {
        return new Promise((resolve, reject) => {
            this.rpcRequest('waitsendpay', {
                payment_hash: payment_hash,
                timeout: timeout
            })
                .then(data => {
                    resolve(data)
                })
                .catch(reject)
        })
    }

    pay(bolt11, msatoshi = null, dfor = 60, description = null, riskfactor = null, maxfeepercent = null, retry_for = null, maxdelay = null) {
        return new Promise((resolve, reject) => {
            this.rpcRequest('pay', {
                bolt11: bolt11,
                msatoshi: msatoshi,
                description: description,
                riskfactor: riskfactor,
                maxfeepercent: maxfeepercent,
                retry_for: retry_for,
                maxdelay: maxdelay
            })
                .then(data => {
                    resolve(data)
                })
                .catch(reject)
        })
    }
}

module.exports = CLightningRPC