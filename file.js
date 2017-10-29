var fs = require('fs');
var buf = new Buffer(1024);
var mkdirp = require('mkdirp');

//异步和同步
function readFile() {
    //异步读取
    fs.readFile('input.txt', function (err, data) {
        if(err) {
            return console.log(err);
        }
        console.log("异步读取:", data.toString());
    });

//同步读取
    var data = fs.readFileSync('input.txt');
    console.log("同步读取:", data.toString());

    console.log("程序执行完毕");
}
//打开文件
function openFile() {
    //异步打开文件
    console.log("准备打开文件！");
    fs.open('input.txt', 'r+', function (err, fd) {
        if(err) {
            return console.error(err);
        }
        console.log("文件打开成功！", fd);
    })
}

//获取文件信息
function statFile() {
    console.log("准备打开文件！");
    fs.stat('input.txt', function (err, stats) {
        if (err) {
            return console.error(err);
        }
        console.log("读取文件信息成功！", stats);

        //检测文件类型
        console.log("是否为文件（isFile)?", stats.isFile());
        console.log("是否为目录（isDirectory）？", stats.isDirectory());
    })
}
//写入文件
function weiteFile() {
    console.log("准备写入文件");
    fs.writeFile('input.txt', '我是通过写入的文件内容！', function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
        console.log("-----------------我是分割线----------------");
        console.log("读取写入的数据！");
        fs.readFile('input.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("异步读取文件数据：", data.toString());
        })
    })
}
//读取文件
function openAndRead() {
    console.log("准备打开已存在的文件！");
    fs.open('input.txt', 'r+', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("文件打开成功！\n"+"准备读取文件");
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
                return console.error(err);
            }
            console.log(bytes, "字节被读取");

            //仅输出读取的字节
            if (bytes > 0) {
                console.log(buf.slice(0, bytes).toString());
            }
        })
    })
}
//关闭文件
function closeFile() {
    console.log("准备打开文件！");
    fs.open('input.txt', 'r+', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("文件打开成功！\n" + "准备读取文件！");
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
                return console.error(err);
            }

            //仅输出读取的字节
            if (bytes > 0) {
                console.log(buf.slice(0, bytes).toString());
            }

            //关闭文件
            fs.close(fd, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("文件关闭成功！");
            })
        })
    })
}
//截取文件
function ftruncateFile() {
    console.log("准备打开文件！");
    fs.open('input.txt', 'r+', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("文件打开成功！\n" + "截取10字节后的内容。");

        //截取文件
        fs.ftruncate(fd, 10, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("文件截取成功！\n" + "读取相同的文件。");
            fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
                if (err) {
                    return console.error(err);
                }

                //仅输出读取的字节
                if (bytes > 0) {
                    console.log(buf.slice(0, bytes).toString());
                }

                //关闭文件
                fs.close(fd, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log("文件关闭成功！");
                })
            })
        })
    })
}
//删除文件
function unlinkFile() {
    console.log("准备删除文件！");
    fs.unlink('input.txt', function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("删除成功！");
    })
}
//创建目录
function mkdirFile() {
    console.log("创建目录/tmp/test/");
    // fs.mkdir('./tmp/text/', function (err) {
    mkdirp('./tmp/text/', function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("目录创建成功！");
    })
}
// readFile();//异步和同步读取文件
// openFile();//打开文件
// statFile();//获取文件信息
// weiteFile();//写入
// openAndRead();//读取文件文件
// closeFile();//关闭文件
// ftruncateFile();//截取文件
// unlinkFile();//删除文件
mkdirFile();//创建目录
/*
* 未完
* http://www.runoob.com/nodejs/nodejs-fs.html
* */