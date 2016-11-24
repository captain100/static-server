var http = require('http');
var url  = require('url');
var path = require('path');
var fs   = require('fs');
var mime = require("./mime").types;
var PORT = 3010;
var server = http.createServer(function(request, response){
    // 得到文件路径
    var pathname = url.parse(request.url).pathname;
    console.log('pathname = ',pathname)
    // 请求chart
    if (pathname === '/chart/chart.js') {
        var chartUrl = path.join(__dirname, './node_modules/chart.js/dist/Chart.min.js')
        console.log(chartUrl)
        requestStaticData(chartUrl)
        return 
    }
    if (pathname === '/') pathname = pathname + 'index.html'
    // 设置资源文件路径
    var realPath = "assets" + pathname;
    // 判断资源文件是否存在
    console.log(realPath)
    requestStaticData(realPath)

    // 加载资源文件
    function requestStaticData (realPath) {
        fs.exists(realPath, function(exists) {
            // 区分加载类型
            var ext = path.extname(realPath);
            ext = ext ? ext.slice(1) : 'unknown';
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type':'text/plain'
                });
                response.write('THis request URL '+ pathname + "was not found on this server");
                response.end();
            } else {
                fs.readFile(realPath, 'binary', function(err, file) {
                    if (err) {
                        response.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });

                        response.end(err);
                    } else {
                        var contentType = mime[ext] || "text/plain";
                        response.writeHead(200, {
                            'Content-Type': contentType,
                            'Connection': 'keep-alive',
                            'Transfer-Encoding': 'chunked'
                        });
                        response.write(file, "binary");
                        response.end();
                    }
                })
            }
        })
    }
})


server.listen(PORT, function(){
    console.log("Server runing at port: " + PORT + ".");
})
