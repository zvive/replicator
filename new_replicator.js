// new_replicator.script
export async function main(ns){

ns.spawn("replicator.js", 1);
ns.sleep(2000);
ns.killall();
}
