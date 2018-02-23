const express = require('express');
const path = require('path'); 
const app = express();

//静态资源访问
app.use("/music-eikook/",express.static(path.join(__dirname, '../dist/')))
app.use("/",express.static(path.join(__dirname, '../dist/')))

//挂载路由
app.get('/', function(req,res){
	res.sendFile(path.join(__dirname, '../dist/index.html'))
});
//启动服务
const server = app.listen(8090, function () {
	console.log('server listening at http://127.0.0.1:8090');
});
