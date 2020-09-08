export async function main(ns){
// cleanup.js
let servers = await ns.getPurchasedServers(trun)

for (var i = 0; i < servers.length; i++) {
    var serv = servers[i];
    switch (serv) {
        case "TradingHouse":
            break;
        default:
            await ns.deleteServer(serv);
    }
}
}
