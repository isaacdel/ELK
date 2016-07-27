/**
 * Created by davidgefen on 12/06/2016.
 */
const pusage = require('pidusage');


function monitorOSCPU(callback) {
    return pusage.stat(process.pid, function(err, stat) {
        if(err){
            return callback(err);
        }
        return callback(null, stat.cpu);
    });
    // Unmonitor process
    pusage.unmonitor(18902);
}
exports.monitorOSCPU = monitorOSCPU;

function monitorOSMemory(callback) {
    return pusage.stat(process.pid, function(err, stat) {
        if(err){
            return callback(err);
        }
        return callback(null, stat.memory);
    });
    // Unmonitor process
    pusage.unmonitor(18902);
}
exports.monitorOSMemory = monitorOSMemory;
