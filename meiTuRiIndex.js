//author='niansen'
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var async = require('async');
var mkdirp = require('mkdirp');
// 需要爬的网址
function getUrls(a) {
    var urls = []
        , baseUrl = 'http://www.meituri.com/a/';
    for (var i = a; i < (a + 1); i++) {
        var tmp = baseUrl + i;
        urls.push(tmp);
        var dir = './meituri/' + i;
        //创建目录
        mkdirp(dir, function (err) {
            if (err) {
                console.log(err);
            }
            //else console.log(dir + '文件夹创建成功!');
        });
    }
    return urls;
}
var urls = getUrls(8766);
async.eachSeries(urls, function (url, callback) {
    fetchUrl(url, callback);
}, function (err, result) {
    // console.log('网址打开了');
});
// 抓取网页内容
function fetchUrl(url, callback) {
    var options = {
        nn: 1,
        mm: 30,
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36',
            'Connection': 'keep-alive'
        }
    };
    //console.log('准备打开网址：' + options.url);
    request(options, function (error, response, body) {
        if (error) console.log("打开网址失败", error);
        //else console.log('成功打开网址' + options.url);
        if (!error && response.statusCode == 200) {
            acquireData(options.url, body, options.nn, options.mm);
            callback(null, null);
        }
    })
}
function acquireData(url, data, nn, mm) {
    var $ = cheerio.load(data);
    var meizi = $('.content img').toArray();
    // var mm= $('#pages a').eq(10).text();
    // var mm= $('#pages a').eq(10).text();
    // console.log('获得:' + mm + '张妹子图');
    var list = url.split('/');
    for (var i = nn; i <= mm; i++) {
        var imgsrc = path.dirname(meizi[0].attribs.src) + '/' + i + '.jpg';
        //console.log("获取完整的url地址", imgsrc);
        var filename = parseUrlForFileName(imgsrc);  //生成文件名
        downloadImg(imgsrc, filename,'./meituri/'+list[4],function(dir, filename) {
         // console.log(filename + ' done');
            console.log('o(*￣▽￣*)o下载ing' + dir + '/' + filename + ' done');
         });
    }
}
function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}
var downloadImg = function (uri, filename, dir, callback) {
    request({uri: uri, encoding: 'binary'}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (!body)  console.log("(╥╯^╰╥)哎呀没有内容。。。");
            fs.writeFile(dir + '/' + filename, body, 'binary', function (err) {
                if (err) {
                    console.log(err);
                }
                // console.log('o(*￣▽￣*)o下载ing' + dir + '/' + filename + ' done');
                if (callback) {
                    callback(dir, filename);
                    callback = null;
                }
            });
        }
    });
};

/*整理到这里
* http://www.meituri.com/x/37/index_1.html
* 13613
* */