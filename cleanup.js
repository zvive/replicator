export async function main(ns){
// cleanup.js
let servers = ns.getPurchasedServers(trun)

for (var i = 0; i < servers.length; i++) {
    var serv = servers[i];
    switch (serv) {
        case "TradingHouse":
            break;
        default:
            ns.deleteServer(serv);
    }
}
}
