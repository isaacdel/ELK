/**
 * Created by davidgefen on 11/06/2016.
 */
var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info'
});

var indexName = "serverrequests";

/**
 * Delete an existing index
 */
function deleteIndex() {
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
 * create the index
 */
function initIndex() {
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
 * check if the index exists
 */
function indexExists() {
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;

function initMapping() {
    return elasticClient.indices.putMapping({
        index: indexName,
        type: "document",
        timestamp:{
            "enabled":true,
            "store":true
        },
        body: {
            properties: {
                reqtype: { type: "string" },
                ipAddress: { type: "string" },
                useragent: { type: "string" },
                timestamp: {type: "string"},
                filesize: {type: "float"},
                cpu: {type: "float"},
                memory: {type: "float"}
                // suggest: {
                //     type: "completion",
                //     analyzer: "simple",
                //     search_analyzer: "simple",
                //     payloads: true
                // }
            }
        }
    });
}
exports.initMapping = initMapping;


function addLog(log) {
    return elasticClient.index({
        index: indexName,
        type: "document",
        // timestamp: new Date(),
        body: {
            reqtype: log.reqtype,
            ipAddress: log.ipAddress,
            useragent: log.useragent,
            timestamp: new Date(),
            filesize: log.filesize,
            cpu: log.cpu,
            memory: log.memory
        }
    });
}
exports.addLog = addLog;