// ramless.js
// Executes when replicator finds servers without RAM
// Then pass that server to the RAMLess Hacker.
// Rewrite to perform from all functions from "home".
export async function main(ns){
    let serv = ns.args[0];

    let files = ["/replicator/replicator.js", "/replicator/_replicator.time.txt"];
    let pservname = (serv + "-hack");

    // Purchase a server for RAMLess Replication
    if (!ns.serverExists(pservname)) {
        await ns.purchaseServer(pservname, 16);
    }

    await ns.sleep(2000);
    if (ns.serverExists(pservname)) {
        //kill("ramless_hacker.js", 1, serv);
        //sleep(2000);
        await ns.tprint("copying files to: " + pservname);
        await ns.scp(files, "home", pservname); 
        if (ns.getServerRequiredHackingLevel(serv) < ns.getHackingLevel()) {
            await ns.tprint("running ramless on: " + serv);
            await ns.run("/replicator/ramless_hacker.js", 1, serv);
        }
    }

    // After buying and or re/starting ramless_hacker
    // scan the server without RAM and Replicate to those
    // new targets from "home".
    if (ns.serverExists(pservname)) {
        await ns.tprint("starting replicator on: " + pservname);
        await ns.exec("/replicator/replicator.js", pservname, 1, serv);
        await ns.sleep(60000);
        await ns.deleteServer(pservname);
    }
}
