// new_replicator.js
export async function main(ns){

await ns.spawn("/replicator/replicator.js", 1);
await ns.sleep(2000);
await ns.killall();
}
