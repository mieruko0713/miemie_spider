var request = require("request");
var fs = require("fs");
var vocabulary = require("./vocabulary");
vocabulary = vocabulary.wordList;
var result_json = {};
var result = fs.createWriteStream("result5001_6000.json");
var time = 0;
var url_pre = "https://api.shanbay.com/bdc/search/?word=";
var i = 5000;

// console.log(vocabulary.length);

// for(; i<; i++) {
//   url = "https://api.shanbay.com/bdc/search/?word=" + vocabulary[i];
//   request(url, function(error,response,body) {
//     result_json[vocabulary[time++]] = body;
//     if(time == 10) {
//     	console.log(result_json);
//     	result.write(JSON.stringify(result_json));
//     }
//   });
// }
var word=vocabulary[i];
// console.log(word);

var run = setInterval(function(){
	request(url_pre + word, function(error,response,body) {
            var body = JSON.parse(body);
      	result_json[word] = body;
            console.log("now word:",word);
            i++;
            word = vocabulary[i];
            console.log("next word:",word);
            console.log("length:",Object.getOwnPropertyNames(result_json).length);
            if(Object.getOwnPropertyNames(result_json).length==1000) {
            result.write(JSON.stringify(result_json));
            clearInterval(run);
      }
      
 })
},300);









