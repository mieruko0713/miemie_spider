var fs = require("fs");
var request = require("request");
var iconv = require("iconv-lite");
var vocabulary = require("./vocabulary");
vocabulary = vocabulary.wordList;
var st = 1;
var file = "result" + st + "_" + Math.floor(st/1000+1)*1000 + ".json";
var arr = [];
var arr_other=[];
var add = {};
var hash = {};
var url_pre = "https://api.shanbay.com/bdc/search/?word=";
var result = fs.createWriteStream("result_all.json");
var run;




function read_all() {
	fs.readFile(file, function(error, data) {
	if(error) {
		console.log(error);
	} else {
		var str = iconv.decode(data, "utf8");
		var wl = JSON.parse(str);
		console.log("wl",Object.getOwnPropertyNames(wl).length);
		var result_str = change(wl);
		// console.log("length:",result_arr.length);
		st += 1000;
		
		if(st>13000) {
			arr.sort(function(a,b){
				return a.content-b.content;
			});
			result.write(JSON.stringify(arr));
			// setRun();
			// function setRun() {
			// 	var j=0;
			// 	arr_other = [];
			// for(var i=0;i<vocabulary.length;i++) {
			// 	if(hash[vocabulary[i]]!=1) {
			// 		arr_other.push(vocabulary[i]);
			// 		console.log("还有",vocabulary[i]);
			// 	};
			// }
			// 	run = setInterval(function(){
			// 	var word = arr_other[j];
			// 	request(url_pre + word, function(error,response,body) {
			// 		var body = JSON.parse(body);
			// 		arr[body]
			// 		console.log("存下单词:",word);
			// 		j++;
			// 		if(j==arr_other.length) {
			// 			change(add);
			// 			clearInterval(run);
			// 			console.log("arr:length:",arr.length);
			// 			if(arr.length!=vocabulary.length) {
			// 				setRun();
			// 			} else {
			// 			    result.write(JSON.stringify(arr));
			// 			}
			// 			// arr_other = [];
			// 			// j=0;
			// 			// for(var i=0;i<vocabulary.length;i++) {
			// 			// 	if(hash[vocabulary[i]]!=1) {
			// 			// 		arr_other.push(vocabulary[i]);
			// 			// 	};
			// 			// }
			// 			// run = setInterval(function(){
			// 			// 	var word = arr_other[j];
			// 			// 	request(url_pre + word, function(error,response,body) {
			// 			// 		add[word] = JSON.parse(body);
			// 			// 		console.log(word);
			// 			// 		j++;
			// 			// 		if(j==arr_other.length) {
			// 			// 			change(add);
			// 			// 			clearInterval(run);
			// 			// 			console.log(i);
			// 			// 			console.log("arr:length:",arr.length);
			// 			// 		}});
			// 			// },300);
			// 		}
			// 	});
			// },300);
			// }
			
			// for(var i=0;i<vocabulary.length;i++) {
			// 	if(hash[vocabulary[i]]!=1) {
			// 		console.log("还有！");
			// 	};
			// }
			return;
		}
		file = "result" + st + "_" + Math.floor(st/1000+1)*1000 + ".json";
		if(st===12001) {
				file = "result" + st + "_" + 12347+ ".json";

		}
		console.log(file);
		read_all();
	    }
    });    
}
    
function change(obj) {
	var i=0;
    for(word in obj) {
    	i++;
    	if(hash[word]!=1){
    	   var o = {};
    	   o.content = word;
    	   o.definition = obj[word].data.definition;
    	   o.audio = obj[word].data.audio;
    	   o.pron = obj[word].data.pron;
    	   arr.push(o);
    	   hash[word]=1;
    	}
    	   
    }
    // console.log(i);
    console.log(arr.length);
    var str = JSON.stringify(arr);
    return str;
}

console.log(file);

// change(vocabulary);
read_all();

var j=0;

// console.log("j:",j);
// console.log("vocabulary:",vocabulary.length);