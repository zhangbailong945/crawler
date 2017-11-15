var http=require('http');
var fs=require('fs');
var cheerio=require('cheerio');
var request=require('request');
var i=0;
var url="http://www.qyl66.com/gaoqing/recent/2/";

function getPage(x)
{
	startGrap();
}

function startGrap(x)
{
	//采用http模块向服务器发起一次get请求
	http.get(x,function(res)){
		var html=''; //存储网页html内容
	    var titles=[]; //标题内容
	    res.setEncoding('utf-8'); //防止中文乱码
		//监听data时间，每次取一块数据
		res.on('data',function(chunk){
			html+=chunk;
		});
		//监听end事件，如果网页内容的html抓取完毕，就执行该回调函数
		res.on('end',function(){
			//采用cheerio模块解析html
			var $cheerio.load(html);
		});
	}
}

