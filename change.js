var fs = require("fs");
var iconv = require('iconv-lite');   

fs.readFile("./result.json", function(error, data) {
	if(error) {
		console.log(error);
	} else {
		var str = iconv.decode(data, "utf8");
		var wl = JSON.parse(str);
		var result_arr = change(wl);
		fs.writeFile("./result2.json", result_arr,function(error) {
			if(error) {
				console.log(error);
			}
		});
	}
});    
    
function change(obj) {
	var arr = [];
    for(word in obj) {
    	var o = {};
    	o.content = word;
    	o.definition = obj[word].data.definition;
    	o.audio = obj[word].data.audio;
    	o.pron = obj[word].data.pron;
    	arr.push(o);
    }
    var str = JSON.stringify(arr);
    return str;
}


