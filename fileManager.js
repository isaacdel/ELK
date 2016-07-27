/**
 * Created by davidgefen on 11/06/2016.
 */
const fs = require('fs');

const fileName = "texts.txt";
const filePath = './' + fileName;

function createNewFile() {
    fs.writeFile(fileName, "", function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was created!");
    });
}
exports.createNewFile = createNewFile;

function addText(text) {
    fs.open(filePath, 'a', function( e, id ) {
        fs.appendFile(filePath, text + '\n', function() {
            fs.close(id, function () {
                console.log('text was written');
            });
        });
    });
}
exports.addText = addText;

function readLines(numberOfLines, callback){
    fs.readFile(filePath, function(err, data) {
        if(err) callback(err);
        var arrLines = data.toString().split("\n");
        var ans = '';
        for(var i = arrLines.length - 2; i >= 0 ; --i) {
            if(numberOfLines > 0){
                numberOfLines--;
                ans = ans + arrLines[i] + '\n';
                console.log('Line from file:',  arrLines[i]);
            }
            else {
                return callback(null, ans);
            }
        }
    });
}
exports.readLines = readLines;

function deleteLines(numberOfLines){
    fs.readFile(filePath, function(err, data) {
        if(err) callback(err);
        var lines = data.toString();
        for(var i = 0; i < numberOfLines ; ++i) {
            lines = lines.substr(0,lines.substr(0,lines.lastIndexOf('\n')).lastIndexOf('\n')+1);
            if(i === numberOfLines - 1){
                fs.writeFile(fileName, lines, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was edited!");
                });
            }
        }
    });
}
exports.deleteLines = deleteLines;

function getFileSize(){
    var stats = fs.statSync(filePath);
    var fileSizeInBytes = stats["size"];
    return fileSizeInBytes / 1000.0;
}
exports.getFileSize = getFileSize;

 //createNewFile();
// addText("kaki");
//readLines(3);
//deleteLines(1);