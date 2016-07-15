var http = require('http');
var url  = require('url');
var path = require('path');
var fs   = require('fs');
var mime = require("./mime").types;
var PORT = 3010;
var server = http.createServer(function(request, response){
    // 得到文件路径
    var pathname = url.parse(request.url).pathname;
    // 设置资源文件路径
    var realPath = "assets" + pathname;
    // 判断资源文件是否存在
    console.log(realPath)
    fs.exists(realPath, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type':'text/plain'
            });
            response.write('THis request URL '+ pathname + "was not found on this server");
            response.end();
        } else {
            fs.readFile(readFile, 'binary', function(err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });

                    response.end(err);
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });

                    response.write(file, "binary");

                    response.end();
                }
            })
        }
    })




})
server.listen(PORT, function(){
    console.log("Server runing at port: " + PORT + ".");
})
