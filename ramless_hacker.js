// ramless_hacker.script
// Hack if seclev is lowest and money is max.
// Hack until you have removed 10% of the max money.
export async function main(ns){
    let serv = ns.args[0];
    ns.tprint(ns.getHostname() + ": RAMLessHacker Starting  " + serv); 

    // Targets RAM
    let ServRAM = ns.getServerRam(serv);
    let ServRAMTot = ServRAM[0];

    // Home RAM to devote to RAMLess targets
    // Be carefull here you could over hack the target easily
    let MyRAM = 1024;

    // ramless Hacker RAM
    let ramless_hackerRAM = ns.getScriptRam("ramless_hacker.script");
    let HackRAM = ns.getScriptRam("h.script");
    let WeakenRAM = ns.getScriptRam("w.script");
    let GrowRAM = ns.getScriptRam("g.script");

    // When to stop hacking. 0.9 hacks to 90% (it takes 10% out)
    let MaxCash = ns.getServerMaxMoney(serv);
    let DrainGoal = (MaxCash * 0.9);

    // Minimum Security level on the target
    let MinSec = ns.getServerMinSecurityLevel(serv);

    // Grow Threads
    let Gthreads = Math.round(MyRAM / GrowRAM);
    // Weaken Threads
    let Wthreads = Math.round(MyRAM / WeakenRAM);
    // Hack Threads
    //Hthreads = Math.round(32 / HackRAM);
    let Hthreads = 32
    // === All above should be constant
    // === All below are dynamic
    while (true) {
        ns.sleep(2000);
        // Target Host stats

        // Server Cash
        let SerCash = ns.getServerMoneyAvailable(serv);

        // Server Sec
        let SerSec = ns.getServerSecurityLevel(serv);

        // Target Host stats end

    // === End Vars

        // Do all the things
        if (SerSec > MinSec) {
            ns.run("w.script", Wthreads, serv);
        } else if (SerCash < MaxCash) {
            ns.run("g.script", Gthreads, serv);
        } else {
            while (ns.getServerMoneyAvailable(serv) > DrainGoal) {
                ns.run("h.script", Hthreads, serv);
            }
        }
    }
}
