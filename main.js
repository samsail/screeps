var default_worker = [MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY,CARRY]
var worker = require("role.worker")
module.exports.loop = function () {
    if (Object.keys(Game.creeps).length < 20 && Game.spawns["Spawn1"].canCreateCreep(default_worker) == 0) {
        Game.spawns["Spawn1"].createCreep(default_worker, "worker_" + Memory.worker_count.toString(), {role : "worker"})
        Memory.worker_count = Memory.worker_count + 1;
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        worker.run(creep);
    }
    if (Game.rooms["W1N7"].controller.level != Memory.room_level) {
        Game.notify("Screeps room levelled up to level" + Game.rooms["W1N7"].controller.level.toString())
        Memory.room_level = Game.rooms["W1N7"].controller.level
    }
}