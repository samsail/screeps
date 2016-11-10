/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.worker');
 * mod.thing == 'a thing'; // true
 */
 var role = {
     run: function(creep) {
        var constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });
        if (creep.carry.energy == 0) {
            creep.memory.task = "gather_energy"
        }
        if(creep.memory.task == "gather_energy" && creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            var n = parseInt(creep.name.substring(7,creep.name.length))%2
            if(creep.harvest(sources[n]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[n]);
            }
        } else if (targets.length) {
            creep.memory.task = "store_energy"
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else if (constructions.length) {
            creep.memory.task = "construction"
            if(creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructions[0]);
            }
        } else {
            creep.memory.task = "upgrade"
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
     }
 }

module.exports = role;