// new_replicator.js
export async function main(ns){

ns.spawn("/replicator/replicator.js", 1);
await ns.sleep(2000);
ns.killall();
}
