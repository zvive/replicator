export async function main(ns){

// milk.js
// Hack if seclev is lowest and money is max.
// Hack until you have removed 10% of the max money.
let host = await ns.getHostname();

// Let the slower ones go
await ns.sleep(2000);

// Target Host stats
// Server Cash
let MaxCash = await ns.getServerMaxMoney(host);

// No cash. Exit.
if (MaxCash < 1) {
    ns.exit();
}

// Server Sec
let SerSec = await ns.getServerSecurityLevel(host);
let MinSec = await ns.getServerMinSecurityLevel(host);

// Local RAM
let hereRAM = await ns.getServerRam(host);
let LocalRam = hereRAM[0];

// milks RAM
let MilkRAM = Math.floor(ns.getScriptRam("/replicator/milk.js"));

// RAM for local Hack, Grow and Weaken
let HackRAM = Math.round(ns.getScriptRam("/replicator/h.js"));
let GrowRAM = Math.round(ns.getScriptRam("/replicator/g.js"));
let WeakenRAM = Math.round(ns.getScriptRam("/replicator/w.js"));

// RAM on host after maill is running
// I'll probably write this at some point to be more dynamic, but right now it's fine.
let LocalRAMAvail = (Math.round(LocalRam - MilkRAM));

// Proportional threading
// Now takes RAM into account
let homeRES = await ns.getServerRam("home");
let totalRAM = homeRES[0];


// Tune Proportional Threading
// RAM Boost (home RAM GBs divided by 1000. 8192 / 4000 = 2 * 10 = 20) (20 Threads)
let ThreadsBoost = Math.round(totalRAM / 4000);

// Home Threading
// Grow Threads
let HGthreads = Math.round(SerSec * ThreadsBoost);
// Weaken Threads
let HWthreads = Math.round(SerSec * ThreadsBoost);
// Hack Threads
let HHthreads = Math.round(LocalRAMAvail / HackRAM);

// Local Threading
// Grow Threads
let LGthreads = Math.round(LocalRAMAvail / GrowRAM);
// Weaken Threads
let LWthreads = Math.round(LocalRAMAvail / WeakenRAM);
// Hack Threads
let LHthreads = Math.round(LocalRAMAvail / HackRAM);

// When to stop hacking. 0.9 hacks to 90% (it takes 10% out)
let DrainGoal = (MaxCash * 0.9);
// === All above should be constant

// Not enough RAM?
if (HGthreads < 1) {
    HGthreads = 1;
}
if (HWthreads < 1) {
    HWthreads = 1;
}
if (HHthreads < 1) {
    HHthreads = 1;
}
if (LGthreads < 1) {
    LGthreads = 1;
}
if (LWthreads < 1) {
    LWthreads = 1;
}
if (LHthreads < 1) {
    LHthreads = 1;
}

while (true) {
    await ns.sleep(3000);
    // Server Cash
    let SerCash = await ns.getServerMoneyAvailable(host);
    // Server Sec
    let SerSec = await ns.getServerSecurityLevel(host);
    // Do all the things
    if (SerSec > MinSec) {
        await ns.tprint('weakening:' + host);
        await ns.exec("/replicator/w.js", "home", HWthreads, host);
        await ns.run("/replicator/w.js", LWthreads, host);
    } else if (SerCash < MaxCash) {
        await ns.tprint('growing:' + host);
        await ns.exec("/replicator/g.js", "home", HGthreads, host);
        await ns.run("/replicator/g.js", LGthreads, host);
    } else {
        while (ns.getServerMoneyAvailable(host) > DrainGoal) {
            await ns.tprint('hacking:' + host);
            await ns.run("/replicator/h.js", HHthreads, host);
            await ns.sleep(1000);
        }
    }
}
}
