/*
MIT License
-----------

Copyright (C) 2012 Markus Tiefenbacher

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var fs = require('fs');
var path = require('path');

var mongoFile = process.argv[2] ? String(process.argv[2]) : false;
var outputFileName = process.argv[3] ? String(process.argv[3]) : false;

if(!mongoFile) throw 'Give me a MongoExport File.';
if(!outputFileName) throw 'Give me a Name for the Output JSON.';

var mongoData = fs.readFileSync(path.resolve(mongoFile), 'utf8');

mongoData = mongoData.split('\n');

if(mongoData[mongoData.length-1].length <= 0) {
	// delete last row (mostly a empty row)
	mongoData.pop();
}

var outputJSON = { mongoexport: [] };
mongoData.forEach(function(item) {
	outputJSON.mongoexport.push(JSON.parse(item));
});

fs.writeFile(path.resolve(path.dirname(outputFileName), path.basename(outputFileName,path.extname(outputFileName))+'.json'), JSON.stringify(outputJSON), 'utf8', function(err) {
	if(err) {
		throw 'Error writing File';
	} else {
		console.log('MongoExport converted to real JSON!');
	}
});
