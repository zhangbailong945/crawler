let request=require('request');
let cheerio=require('cheerio');
let fs=require('fs');
let Url='http://www.qyl66.com/gaoqing/recent/2/';

//抓取
function getHref(){
    let randomIp = Math.floor(Math.random()*255) + '.' + Math.floor(Math.random()*255) + '.' + Math.floor(Math.random()*255);               
	let referer='http://www.qyl66.com/gaoqing/recent/2/';
	request({
		url:Url,
		method:'GET',
		headers:{
			'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/51.0.2704.106 Safari/537.36',
			'X-Forwarded-For':randomIp,
			'referrer':referer
		}
	   },function(err,res,body){
		if(err)
		{
		   console.log(err);	
		}
		else
		{
			let $=cheerio.load(body);
			//获取第一页高清列表
			let gaoqingUrl=$('.video>a');
			for(let i=0;i<30;i++)
			{
				let url='http://www.qyl66.com'+gaoqingUrl[i].attribs.href;
				//中文转码
				url=encodeURI(url);
				let Ip = Math.floor(Math.random()*255) + '.' + Math.floor(Math.random()*255) + '.' + Math.floor(Math.random()*255);
				let ref='http://www.qyl66.com';
				request({
					url:url,
					method:'GET',
					headers:{
			          'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/51.0.2704.106 Safari/537.36',
			          'X-Forwarded-For':randomIp,
			          'referrer':ref
		           }
				},function(err,res,body){
					if(err)
					{
					   console.log(err);	
					}
					else
					{
						//获取视频播放页面的html
						let $=cheerio.load(body);
						//获取标题
						let title=$('#video h1').text().trim();
						//获取视频地址
						let src=$('source').attr('src');
						//获取图片地址
						let pic=$('video').attr('poster');
						/*
						console.log(title);
						console.log(src);
						console.log(pic);
						*/
						//存储到csv中
						saveCSV(title,src,pic);
					}

				});
			}
		}
		
	});
	
}

//保存标题、视频地址、图片地址到csv中
function saveCSV(title,src,pic)
{
	fs.exists('./data',function(exists){
		if(!exists)
		{
			fs.mkdir('data',0777,function(err){
				if(err)
				{
					console.log(err);
				}
				else
				{
					console.log('create data success!');
				}
			});
		}

		let line=`${title.replace(/\n/g,'')},${src},${pic}`;
		let i=0;
		fs.appendFile('./data/url.csv',`${line}\n`,'utf-8',function(err){
			if(err) 
			  {
					console.log(err)
			  } else 
			  {
				i++;
				if(i==30)
				{
					console.log('grap success!');
				}
			  }
		});
		
	});
}


getHref();