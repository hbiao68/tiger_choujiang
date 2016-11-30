var express = require("express");
var http = require("http");
var app = express();

////////////////////// 获取post过来的数据 /////////////////////////////
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

////////////////////// 设置模板 /////////////////////////////
var ejs = require("ejs");
//使用set方法，为系统变量“views”和“view engine”指定值。
app.set("views", __dirname );
// 指定模板文件的后缀名为html
app.set('view engine', 'html');
// 运行hbs模块
app.engine('html', ejs.__express);

////////////////////// 利用文件来拆分路由的规模 /////////////////////////////
var router = express.Router();



//设置web工程的根目录
app.use(express.static(__dirname + '/'));


/*
 //添加中间件拦截器
 app.use(function(request, response, next) {
 console.log("In comes a " + request.method + " to " + request.url);
 next();
 });

 app.get('/', function (req, res){
 //显示./views/index.html页面,并且传递变量  name 在页面中动态显示
 res.render('index',{name:"huangbiao"});
 });

 app.use(function(request, response, next) {
 if (request.url == "/about") {
 response.writeHead(200, { "Content-Type": "text/plain" });
 response.end("Welcome to the about!\n");
 } else {
 next();
 }
 });

 app.use(function(request, response, next) {
 if (request.url == "/api") {
 response.json(200, {name:"张三",age:40});
 } else {
 next();
 }
 });

 app.get('/article', function(req, res) {
 res.sendfile('./views/article.html');
 });

 //下面的中间件应该放到最后，所有没有获取URL的全部返回下面的代码
 app.use(function(request, response) {
 response.writeHead(404, { "Content-Type": "text/plain" });
 response.end("404 error!\n");
 });
 */

////添加中间件拦截器
//app.use(function(request, response, next) {
//    console.log("In comes a " + request.method + " to " + request.url);
//    next();
//});
//
///**
// * 进入web工程首页
// */
//router.route('/')
//    .get(function(req, res, next) {
//        res.render('index',{name:"huangbiao"});
//    });
//
///**
// * 获取页面的模板
// */
//router.route('/test')
//    .post(function(req, res, next) {
//        res.render('index',{name:"huangbiao"});
//    })
//    .get(function(req, res, next) {
//        res.writeHead(200, { "Content-Type": "text/plain" });
//        res.end("Welcome to the about!\n");
//    });
//
///**
// * 前台发送ajax 请求
// */
//router.route('/ajax')
//    .post(function(req, res, next) {
//        res.json(200, {name:"张三",age:40});
//    })
//    .get(function(req, res, next) {
//        res.json(200, {name:"张三1",age:40});
//    });

//app.use('/', router);


http.createServer(app).listen(3000);

