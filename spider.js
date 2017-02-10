var request = require("request");
var fs = require("fs");
var vocabulary = require("./vocabulary");
vocabulary = vocabulary.wordList;
var result_json = {};
var result = fs.createWriteStream("result.json");
var time = 0;
var url_pre = "https://api.shanbay.com/bdc/search/?word=";
var i = 0;

// for(var i=0; i<10; i++) {
//   url = "https://api.shanbay.com/bdc/search/?word=" + vocabulary[i];
//   request(url, function(error,response,body) {
//     result_json[vocabulary[time++]] = body;
//     if(time == 10) {
//     	console.log(result_json);
//     	result.write(JSON.stringify(result_json));
//     }
//   });
// }

var run = setInterval(function(){
	var word = vocabulary[i++];
	request(url_pre + word, function(error,response,body) {
      result_json[word] = JSON.parse(body);
      if( i % 500 == 0 && i <= vocabulary.length) {
      	console.log(result_json);
      	//console.log(JSON.stringify(result_json,null, 2));
      	result.write(JSON.stringify(result_json));
      	clearInterval(run);
      }
 })
},300);









