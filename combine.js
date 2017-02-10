var fs = require("fs");
var iconv = require("iconv-lite");
var vocabulary = require("./vocabulary");
vocabulary = vocabulary.wordList;

console.log(vocabulary[1000]);

var result = [];

fs.readFile("./result0_500.json", parse_to_json);
fs.readFile("./result500_1001.json", function(error, data){
	parse_to_json(error, data);
	fs.writeFile("./result1001.json", JSON.stringify(result), function(error){
	  if(error) {
	  	console.error(error);
	  }
	  console.log(result.length);
    });
});


function parse_to_json(error, data) {
	if(error) {
		console.error(error);
	} else {
		var str = iconv.decode(data, "utf8");
		var js = JSON.parse(str);
		for(word in js) {
			var o = {};
			o.content = word;
			o.definition = js[word].data.definition;
			o.pron = js[word].data.pron;
			result.push(o);
		}
		console.log(o);
		console.log(result.length)
	}
}