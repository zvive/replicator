// replicator.js
// happylittleforkbomb fork
// u/pythonbashman
export async function main(ns){

    // Programs on home
    ns.tprint('checking programs');
    var programs = ["brutessh.exe",
        "ftpcrack.exe",
        "relaysmtp.exe",
        "httpworm.exe",
        "sqlinject.exe",
        "nuke.exe"
    ];

    // How many programs are on home
    var progs = 0;
    for (var j = 0; j < programs.length; j++) {
        var prog = programs[j];
        if (ns.fileExists(prog, "home")) {
            progs++;
            await ns.tprint(progs + ' found');
        }
    }

    // var scanner = scan(getHostname());
    if (ns.getHostname() == "home") {
        let updateTime = Date.now();
        await ns.tprint("updating replication time: " + serv);
        await ns.write("/replicator/_replicator.time.txt", updateTime, "w");
    }

    //var servers2 = [getHostname()];
    //var scanner = scan(getHostname());
    if (ns.args[0] !== null) {
        var servers = await ns.scan(ns.args[0]);
    } else {
        //var servers = servers2.concat(scanner);
        await ns.tprint("scanning: " + ns.getHostname());
        var servers = await ns.scan(ns.getHostname());
    }

    // Main routine
    for (var i = 0; i < servers.length; i++) {
        var serv = servers[i];
        switch (serv) {
            // I figured out how to use RegEx here
            // If its Home, the darkweb, your brokerage, or one of the RAMLess hacker severs, Skip.
            case (serv.match(/-hack$|home|darkweb|TradingHouse/) || {}).input:
                break;
            // If RAMLess target, Skip.
            case (ns.args[0]):
                break;
            // If Self, Skip.
            case await ns.getHostname():
                break;
            // Otherwise start main function
            default:
                if (ns.serverExists(serv)) {
                    let files = ["/replicator/replicator.js", "/replicator/milk.js", "/replicator/h.js", "/replicator/g.js", "/replicator/w.js", "/replicator/_replicator.time.txt"];
                    await ns.tprint("copying replicator files to: " + serv);
                    await ns.scp(files, "home", serv);
                    // Servers that have no RAM... Lets hack'em anyway :)
                    let NextTargetRes = await ns.getServerRam(serv);
                    let NextTargetRAM = NextTargetRes[0];
                    if (NextTargetRAM < 1) {
                        await ns.tprint("running ramless on: " + serv);
                        await ns.exec("/replicator/ramless.js", "home", 1, serv);
                    }
                    // No root access? Break open and nuke, if home has enough programs.
                    if (!ns.hasRootAccess(serv)) {
                        if (ns.getServerRequiredHackingLevel(serv) > ns.getHackingLevel()) {} else {
                            var ports = await ns.getServerNumPortsRequired(serv);
                            if (!ns.fileExists(programs[5], "home")) {} else if (ports + 1 > progs) {
                                for (; progs < ports + 1;) {
                                    var progs = 0;
                                    for (var j = 0; j < programs.length; j++) {
                                        var prog = programs[j];
                                        if (ns.fileExists(prog, "home")) {
                                            progs++;
                                        }
                                    }
                                }
                            } else {
                                for (var j = 0; j < ports; j++) {
                                    if (ns.fileExists(programs[0], "home")) {
                                        await ns.brutessh(serv);
                                        j++;
                                        if (j >= ports) { break; }
                                    }
                                    if (ns.fileExists(programs[1], "home")) {
                                        await ns.ftpcrack(serv);
                                        j++;
                                        if (j >= ports) { break; }
                                    }
                                    if (ns.fileExists(programs[2], "home")) {
                                        await ns.relaysmtp(serv);
                                        j++;
                                        if (j >= ports) { break; }
                                    }
                                    if (ns.fileExists(programs[3], "home")) {
                                        await ns.httpworm(serv);
                                        j++;
                                        if (j >= ports) { break; }
                                    }
                                    if (ns.fileExists(programs[4], "home")) {
                                        await ns.sqlinject(serv);
                                        j++;
                                        if (j >= ports) { break; }
                                    }
                                }
                                await ns.nuke(serv);
                            }
                        }
                    }

                    // Is this a new run, or part of the last run?
                    if (ns.read("/replicator/_replicator.time.txt") > ns.read("/replicator/_replicator.time.last.txt")) {
                        if (NextTargetRAM > 1) {
                            await ns.killall(serv);
                            await ns.sleep(2000);
                            await ns.exec("/replicator/replicator.js", serv, 1);
                        }
                    }
                }
        }
    }

    // Should we be milking this target.
    switch (ns.getHostname()) {
        // I figured out how to use RegEx here
        case (serv.match(/home|darkweb|TradingHouse/) || {}).input:
            break;
        // RAMLess target? Don't try to run.
        case (ns.args[0]):
            break;
        // RAMLess Hacker? Take the args passed into replicator that would have 
        // only come from trying to attack a server without ram.
        case (serv.match(/-hack$/) || {}).input:
            if (!ns.fileExists("/replicator/_replicator.time.last.txt")) {
                await ns.write("/replicator/_replicator.time.last.txt", 0, "w");
            }
            await ns.write("/replicator/_replicator.time.last.txt", await ns.read("/replicator/_replicator.time.txt"), "w");
            await ns.exec("/replicator/ramless_hacker.js", "home", 1, serv);
            await ns.sleep(5000);
            break;
        // If everything else didn't trigger then behave normally.
        default:
            if (!ns.fileExists("/replicator/_replicator.time.last.txt")) {
                await ns.write("/replicator/_replicator.time.last.txt", 0, "w");
            }
            await ns.write("/replicator/.time.last.txt", await ns.read("/replicator/_replicator.time.txt"), "w");
            await ns.exec("/replicator/milk.js", await ns.getHostname(), 1);
            await ns.sleep(5000);
            break;
    }
}
