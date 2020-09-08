// farmxp.js
// Hack if seclev is lowest and money is max.
// Hack until you have removed 10% of the max money.
export async function main(ns){

        let host = ns.getHostname();

        // Local RAM
        let hereRAM = ns.getServerRam(host);
        let LocalRam = hereRAM[0];

        // milks RAM
        let farmxpRAM = Math.floor(ns.getScriptRam("/replicator/farmxp.js"));

        // RAM for local Hack, Grow and Weaken
        let WeakenRAM = Math.floor(ns.getScriptRam("/replicator/w.js"));

        // RAM on host after maill is running
        // I'll probably write this at some point to be more dynamic, but right now it's fine.
        let LocalRAMAvail = (Math.floor(LocalRam - farmxpRAM));

        // Local Threading
        // Weaken Threads
        let LWthreads = Math.floor(LocalRAMAvail / WeakenRAM);

        // === All above should be constant

        while (true) {
                ns.run("/replicator/w.js", LWthreads, "foodnstuff");
                await ns.sleep(3000);
        }
}
