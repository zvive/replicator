// ramless.js
// Executes when replicator finds servers without RAM
// Then pass that server to the RAMLess Hacker.
// Rewrite to perform from all functions from "home".
export async function main(ns){
    let serv = ns.args[0];

    let files = ["replicator.js", "_replicator.time.txt"];
    let pservname = (serv + "-hack");

    // Purchase a server for RAMLess Replication
    if (!ns.serverExists(pservname)) {
        ns.purchaseServer(pservname, 16);
    }

    ns.sleep(2000);
    if (ns.serverExists(pservname)) {
        //kill("ramless_hacker.js", 1, serv);
        //sleep(2000);
        ns.scp(files, "home", pservname); 
        if (ns.getServerRequiredHackingLevel(serv) < ns.getHackingLevel()) {
            ns.run("ramless_hacker.js", 1, serv);
        }
    }

    // After buying and or re/starting ramless_hacker
    // scan the server without RAM and Replicate to those
    // new targets from "home".
    if (ns.serverExists(pservname)) {
        ns.exec("replicator.js", pservname, 1, serv);
        ns.sleep(60000);
        ns.deleteServer(pservname);
        ns.sleep(60000);
        ns.deleteServer(pservname);
    }
}
