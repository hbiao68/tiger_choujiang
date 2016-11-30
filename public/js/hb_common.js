/******************Array 对象扩展***********************/
/** 去除数组中的重复项 **/
Array.prototype.removeRepeat = function () {
    var reset = [], done = {};
    for (var i = 0; i < this.length; i++) {
        var temp = this[i];
        //这里的json对象一定要以数组的方式访问，否则会认为找不到这个对象
        if (!done[temp]) {
            done[temp] = true;
            reset.push(temp);
        }
    }
    return reset;
};

//删除指定的数组
Array.prototype.del = function(n)
{
    if (n<0) return this;
    return this.slice(0,n).concat(this.slice(n+1,this.length));
};

// 数组第一次出现指定元素值的位置
Array.prototype.indexOf = function(o)
{
    for (var i=0; i<this.length; i++) if (this[i]==o) return i;
    return -1;
};

/**
 *  检索数组元素（原型扩展或重载）
* @param {o} 被检索的元素值
* @type int
* @returns 元素索引
*/
Array.prototype.contains = function(o) {
    var index = -1;
    for(var i=0;i<this.length;i++){if(this[i]==o){index = i;break;}}
    return index;
};

/******************Date 对象扩展***********************/


Date.prototype.getWeek = function () {
    var a = new Array("日", "一", "二", "三", "四", "五", "六");
    var week = new Date().getDay();
    var str = a[week];
    return str;
};

//将指定的秒数加到此实例的值上
Date.prototype.addSeconds = function (value) {
    var second = this.getSeconds();
    this.setSeconds(second + value);
    return this;
};

//将指定的分钟数加到此实例的值上
Date.prototype.addMinutes = function (value) {
    var minute = this.getMinutes();
    this.setMinutes(minute + value);
    return this;
};

//将指定的小时数加到此实例的值上
Date.prototype.addHours = function (value) {
    var hour = this.getHours();
    this.setHours(hour + value);
    return this;
};


//将指定的天数加到此实例的值上
Date.prototype.addDays = function (value) {
    var date = this.getDate();
    this.setDate(date + value);
    return this;
};


//将指定的星期数加到此实例的值上
Date.prototype.addWeeks = function (value) {
    return this.addDays(value * 7);
};

//将指定的月份数加到此实例的值上
Date.prototype.addMonths = function (value) {
    var month = this.getMonth();
    this.setMonth(month + value);
    return this;
};
//将指定的年份数加到此实例的值上
Date.prototype.addYears = function (value) {
    var year = this.getFullYear();
    this.setFullYear(year + value);
    return this;
};

/**
 * 日期格式化（原型扩展或重载）
 * 格式 YYYY/yyyy/YY/yy 表示年份
 * MM/M 月份
 * W/w 星期
 * dd/DD/d/D 日期
 * hh/HH/h/H 时间
 * mm/m 分钟
 * ss/SS/s/S 秒
 * @param {formatStr} 格式模版
 * @type string
 * @returns 日期字符串
 */
Date.prototype.format = function(formatStr){
    var str = formatStr;
    var Week = ['日','一','二','三','四','五','六'];
    str=str.replace(/yyyy|YYYY/,this.getFullYear());
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));
    str=str.replace(/MM/,(this.getMonth()+1)>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));
    str=str.replace(/M/g,this.getMonth());
    str=str.replace(/w|W/g,Week[this.getDay()]);
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str=str.replace(/d|D/g,this.getDate());
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str=str.replace(/h|H/g,this.getHours());
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str=str.replace(/m/g,this.getMinutes());
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    str=str.replace(/s|S/g,this.getSeconds());
    return str;
};

/**
 * 比较日期差（原型扩展或重载）
 * @param {strInterval} 日期类型：'y、m、d、h、n、s、w'
 * @param {dtEnd} 格式为日期型或者 有效日期格式字符串
 * @type int
 * @returns 比较结果
 */
Date.prototype.dateDiff = function(strInterval, dtEnd) {
    var dtStart = this;
    if (typeof dtEnd == 'string' ) { //如果是字符串转换为日期型
        dtEnd = StringToDate(dtEnd);
    }
    switch (strInterval) {
        case 's' :return parseInt((dtEnd - dtStart) / 1000);
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));
        case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();
    }
};

/**
 * 日期计算（原型扩展或重载）
 * @param {strInterval} 日期类型：'y、m、d、h、n、s、w'
 * @param {Number} 数量
 * @type Date
 * @returns 计算后的日期
 */
Date.prototype.dateAdd = function(strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
};

/**
 * daysNumber 表示当前日期往前推的天数
 * return Array
 * @param number
 */
Date.prototype.getBeforeDate = function(daysNumber) {
    var myDate = this;
    var dateArray = [];
    for (var i = 1; i <= daysNumber; i++) {
        var tempDate = new Date(myDate.getTime() - i *24 * 3600 * 1000);
        //dateArray.push(tempDate.format('yyyy/MM/dd'));
        dateArray.push(tempDate);
    }
    return dateArray;
};

/**
 * daysNumber 表示当前日期往后推的天数
 * return Array
 * @param number
 */
Date.prototype.getAfterDate = function(daysNumber) {
    var myDate = this;
    var dateArray = [];
    for (var i = 1; i <= daysNumber; i++) {
        var tempDate = new Date(myDate.getTime() + i *24 * 3600 * 1000);
        //dateArray.push(tempDate.format('yyyy/MM/dd'));
        dateArray.push(tempDate);
    }
    return dateArray;
};

/**
 * 取得日期数据信息（原型扩展或重载）
 * @param {interval} 日期类型：'y、m、d、h、n、s、w'
 * @type int
 * @returns 指定的日期部分
 */
Date.prototype.datePart = function(interval){
    var myDate = this;
    var partStr='';
    var Week = ['日','一','二','三','四','五','六'];
    switch (interval)
    {
        case 'y' :partStr = myDate.getFullYear();break;
        case 'm' :partStr = myDate.getMonth()+1;break;
        case 'd' :partStr = myDate.getDate();break;
        case 'w' :partStr = Week[myDate.getDay()];break;
        case 'ww' :partStr = myDate.WeekNumOfYear();break;
        case 'h' :partStr = myDate.getHours();break;
        case 'n' :partStr = myDate.getMinutes();break;
        case 's' :partStr = myDate.getSeconds();break;
    }
    return partStr;
};


/**
 * 把日期分割成数组（原型扩展或重载）
 * @type array
 * @returns 日期数组
 */
Date.prototype.toArray = function() {
    var myDate = this;
    var myArray = Array();
    myArray[0] = myDate.getFullYear();
    myArray[1] = myDate.getMonth()+1;
    myArray[2] = myDate.getDate();
    myArray[3] = myDate.getHours();
    myArray[4] = myDate.getMinutes();
    myArray[5] = myDate.getSeconds();
    return myArray;
};

/**
 * 判断闰年（原型扩展或重载）
 * @type boolean
 * @returns 是否为闰年 true/false
 */
Date.prototype.isLeapYear = function() {
    return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));
};

/******************String 表单检查***********************/
//检查是否是URL地址
String.prototype.isURL=function(){
    var re=/http[s]?:\/\/([\w-]+.)+[\w-]+(\/[\w-./?%&=]*)?/;
    var result = re.test(this);
    return result;
};

//检查表单是否是email字符串
String.prototype.isEmail=function(){
    var re=/\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*/;
    var result = re.test(this);
    return result;
};

//检查号码，正确格式为：XXXX-XXXXXXX，XXXX-XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX
String.prototype.isPhoneNumber=function(){
    var re=/^((\d{3,4})|\d{3,4}-)?\d{7,8}$/;
    var result = re.test(this);
    return result;
};


/******************String 数字检查***********************/
/**
 * 获取字符串长度（原型扩展或重载）
 * @type int
 * @returns 字符串长度
 */
String.prototype.len = function() {
    var arr=this.match(/[^\x00-\xff]/ig);
    return this.length+(arr==null?0:arr.length);
};


//检查是否是浮点数，包括0，包括正浮点数  负浮点数
String.prototype.isFloat=function(){
    var re=/^-?([1-9]\d*.\d+|0.\d*[1-9]\d*|0?.0+|0)$/;
    var result = re.test(this);
    return result;
};

//检查是否是非负浮点数，包括0
String.prototype.isFloatNegativ=function(isContainZero){
    if(isContainZero){
        var re=/(^-([1-9]\d*.\d+|0.\d*[1-9]\d*)$)|(0)/;
        var result = re.test(this);
        return result;
    }else{
        var re=/^-([1-9]\d*.\d+|0.\d*[1-9]\d*)$/;
        var result = re.test(this);
        return result;
    }
};

//检查是否是正浮点数，包括0
String.prototype.isFloatPositive=function(isContainZero){

    if(isContainZero){
        var re=/^[1-9]\d*.\d+|0.\d*[1-9]\d*|0?.0+|0$/;
        var result = re.test(this);
        return result;
    }else{
        var re=/^[1-9]\d*.\d+|0.\d*[1-9]\d*$/;
        var result = re.test(this);
        return result;
    }
};

//检查是否是整数，包括0，正整数，负整数
String.prototype.isInt = function(){
    var re=/^-?\d+$/;
    var result = re.test(this);
    return result;
};

/**
 * 检查是否是正整数
 * isContainZero 是否包含0
 */
String.prototype.isIntPositive = function(isContainZero){
    if(isContainZero){
        var re=/(^[0-9]*[1-9][0-9]*$)|(0)/;
        var result = re.test(this);
        return result;
    }else{
        var re=/^[0-9]*[1-9][0-9]*$/;
        var result = re.test(this);
        return result;
    }
};

/**
 * 检查是否是负整数
 * isContainZero 是否包含0
 */
String.prototype.isIntNegativ = function(isContainZero){
    if(isContainZero){
        var re=/(^-[0-9]*[1-9][0-9]*$)|(0)/;
        var result = re.test(this);
        return result;
    }else{
        var re=/^-[0-9]*[1-9][0-9]*$/;
        var result = re.test(this);
        return result;
    }
};

/******************String***********************/
//检查字符串是否是指定字符串开头，返回true 和 false
String.prototype.isStartWith=function(str){
    var reg=new RegExp("^"+str);
    return reg.test(this);
};
//检查字符串是否是指定字符串结尾，返回true 和 false
String.prototype.isEndWith=function(str){
    var reg=new RegExp(str+"$");
    return reg.test(this);
};

//一个单词首字母大写,返回字符串
String.prototype.capitalize=function(){
    var result = this.charAt(0).toUpperCase()+this.substring(1).toLocaleLowerCase();
    return result;
};
// 保留字母和空格,返回字符串
String.prototype.getEn = function() {
    var result = this.replace(/[^A-Z a-z]/g, "");
    return result;
};
//逆序
String.prototype.reverse = function() {
    return this.split("").reverse().join("");
};
//检查字符串是否包含自定字符串，返回true 和 false
String.prototype.isContains=function(target){
    var myReg = new RegExp(target);
    var result = myReg.test(this);
    return result;
};
//去除两边的空格,返回字符串
String.prototype.trim = function() {
    var result = this.replace(/^\s+|\s+$/g, "");
    return result;
};
// 除去左边空白,返回字符串
String.prototype.trimLeft = function() {
    return this.replace(/^\s+/g, "");
};
// 除去右边空白,返回字符串
String.prototype.trimRight = function() {
    return this.replace(/\s+$/g, "");
};
// 去除所有的空白
String.prototype.delBlank = function() {
    var result = this.replace(/\s+/g, "");
    return result;
};
/**
 * 字符串转换为日期型（原型扩展或重载）
 * @type Date
 * @returns 日期
 */
String.prototype.toDate = function() {
    var converted = Date.parse(this);
    var myDate = new Date(converted);
    if (isNaN(myDate)) {
        var arys= this.split('-');
        myDate = new Date(arys[0],--arys[1],arys[2]);
    }
    return myDate;
};

//将json字符串转为json对象
String.prototype.toJson=function(){
    return (new Function("return " + this))();
};


function obj2str(o){
    var r = [];
    if(typeof o =="string") return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
    if(typeof o =="undefined") return "undefined";
    if(typeof o == "object"){
        if(o===null) return "null";
        else if(!o.sort){
            for(var i in o)
                r.push(i+":"+obj2str(o[i]))
            r="{"+r.join()+"}"
        }else{
            for(var i =0;i<o.length;i++)
                r.push(obj2str(o[i]))
            r="["+r.join()+"]"
        }
        return r;
    }
    return o.toString();
}

//将json对象转为String
function JsonToString(o) {
    var arr = [];
    var fmt = function(s) {
        if (typeof s == 'object' && s != null) return JsonToStr(s);
        return /^(string)$/.test(typeof s) ? '"' + s + '"' : s;
    }
    for (var i in o)
        arr.push("'" + i + "':" + fmt(o[i]));
    return '{' + arr.join(',') + '}';
}






//我的收藏
function myCollection(obj){
    //表示已经收藏
    if($(obj).hasClass("collection")){
        $(obj).html("&#xe637;").removeClass("collection");
    }else{
        $(obj).html("&#xe621;").addClass("collection");
    }
}

//历史回退到上一个链接地址
function goBack(){
    window.history.go(-1);
}

//页面跳转转到target属性指明的链接，obj代表控件this
function jumpTo(obj){
    var _href = obj.getAttribute("target");
    window.location.href = _href;
}

//获取屏幕宽度
function getScreenWidth(){
    return document.documentElement.clientWidth;
}

//获取屏幕高度
function getScreenHeight(){
    return document.documentElement.clientHeight;
}

//只允许输入数字,obj为控件对象，event为触发的事件
function numberInputOnly(obj,event){
    if(obj.value.length==1){
        obj.value=obj.value.replace(/[^1-9]/g,'');
    }else{
        obj.value=obj.value.replace(/\D/g,'');
    }
}


/*****下拉导航左右定格****/
function order_menu_caret(){
    var obj = $("#order_menu_caret");
    var w = $(window).width();
    var left_right = w - obj.width();
    var lr = left_right/2;
    obj.css("left",-lr);
    obj.css("width",w);
}

var SQH=function(domObj){

    sqhSwip={
        startX : 0,
        startY : 0,
        touchSatrtFunc : function(evt) {
            try
            {
                //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
                var touch = evt.touches[0]; //获取第一个触点
                //记录触点初始位置
                this.startX = Number(touch.pageX); //页面触点X坐标
                this.startY = Number(touch.pageY); //页面触点Y坐标
            }
            catch (e) {
            }
        },
        touchMoveFunc : function(event){
            //event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            var touch = event.touches[0]; //获取第一个触点
            var endX = Number(touch.pageX); //页面触点X坐标
            var endY = Number(touch.pageY); //页面触点Y坐标
            if(endX > this.startX){
                $("#carousel-generic").carousel('prev');
            }else{
                $("#carousel-generic").carousel('next');
            }

            if((endY - this.startY) < 500){
                $("body").one("touchmove", function(event){
                    event.preventDefault();
                });
            }else{
            }
        },
        each : function(obj){
            var currentObj = this;
            $(obj).each(function(i){
                this.addEventListener('touchstart', currentObj.touchSatrtFunc, false);
                this.addEventListener('touchmove', currentObj.touchMoveFunc, false);
            });
        }
    };
    sqhSwip.each(domObj);
};

//添加弹出提示信息，之后就自动消失
function sqh_tips(mysetting){
    var timestamp = new Date().getTime();
    var setting = {
        //将时间戳作为一个id传递
        target : timestamp,
        //提示的内容
        content : "弹出提示内容",
        //指明弹出窗口的内容
        width : "200px",
        //显示的时间
        persistent : 1000,
        //默认透明度是0.5，可以自己调节透明度
        bgopacity:0,
        contentOpacity:0.8,
        fontColor:"#ffffff",
        background:"black",
        fontSize : "14px",
        //显示回调函数
        beforeShow : function(obj){
//                alert(obj.outerHTML);
            //删除添加的节点
            $(obj).remove();
        },
        //退出的时间
        hide:300
    };

    //获取用户的配置文件
    setting = $.extend(setting,mysetting);

    function addHtml(setting){
        var contentHtml ='<div id="'+setting.target+'">'+
            '<div style="position: fixed;top:30%;width: 100%;z-index:1050;" id="__dialog_div">'+
            '<div style="position: relative;width: '+setting.width+';margin:0px auto;" onclick="remove()" >'+
            '<div class="alert alert-info" style="font-size:'+setting.fontSize+'; opacity: '+setting.contentOpacity+';color:'+setting.fontColor+';background: '+setting.background+';border-color: '+setting.background+';">'+
            setting.content+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="modal-backdrop fade in" id="__zhezhao" style="opacity: '+setting.bgopacity+';"></div>'+
            '</div>';
        //将遮罩效果代码添加到body标签中
        $("body").append(contentHtml);
        //让弹出内容有进入 和 退出的效果
        $("#"+setting.target).show().delay(setting.persistent).hide(setting.hide,function(){
            setting.beforeShow(this);
        });
    }

    //如果传递的参数不正确，则
    if(typeof setting != "object"){
        setting.content = "参数传递有误";
    }

    //添加代码，弹出效果
    addHtml(setting);
}


/*
 //    如果使用new ，则方法内部的this则是当前对象，如果是直接使用groupBtnInit()，则this代表的是window对象
 new groupBtnInit({
 targetId : "",
 groupBtnWidth : "90px",
 groupBtnStyle:"width:90px;position:absolute;top:5px;right:0px;",
 inputStyle:"height:25px;dispaly:table-cell;",
 minusBtnClass:"clear_border_radius clear_padding",
 minusBtnStyle:"height:25px;width:25px;",
 pluseBtnClass:"clear_border_radius clear_padding",
 pluseBtnStyle:"height:25px;width:25px;",
 afterMinuseFunc:function(obj,pluginObj){
 //获取值
 //alert(obj.getInputValue());
 //获取另一个按钮对象
 //alert(obj.getOtherBtn().outerHTML);
 //                alert(3);
 //                obj.getOtherBtn().click();
 }
 });

 <div class="input-group ">
 <div class="input-group-btn">
 <button type="button" class="btn btn-default padding_6px minus_btn">
 <span  class="glyphicon glyphicon-minus"></span>
 </button>
 </div>
 <input type="text" value="0"  class="form-control text-center"  readonly>
 <div class="input-group-btn">
 <button type="button" class="btn btn-default padding_6px plus_btn">
 <span  class="glyphicon glyphicon-plus"></span>
 </button>
 </div>
 </div>
 */

//按钮组加、减的办法
function groupBtnInit(userSetting){

    //如果用户没有传递参数，则使用默认参数
    userSetting = userSetting || {};

    var that = this;
//        //缓存插件对象
//        var pluginObj = this;

    this.setting ={
        //按钮组所在的父控件ID
        targetId : "groupBtn",
        //按钮组的宽度
        groupBtnWidth :" 100px",
        //设置按钮组的类样式
        groupBtnClass:"",
        //设置按钮组的行内样式
        groupBtnStyle:"",
        //左按钮类样式
        minusBtnClass : "",
        //左按钮行内样式
        minusBtnStyle : "",
        //右按钮类样式
        pluseBtnClass : "",
        //右按钮行内样式
        pluseBtnStyle : "",
        //输入值类样式
        inputClass : "text-center",
        //输入行内样式
        inputStyle : "",
        //设置允许的最大值
        maxValue : Number.MAX_VALUE,
        //设置允许的最小值
        minValue : 1,

        //加按钮调用之前,pluginObj代表当前运行的对象，obj代表按钮对象
        beforePlusFunc : function(obj,pluginObj){
//            alert("beforePlusFunc");
        },
        //加按钮调用之前,pluginObj代表当前运行的对象，obj代表按钮对象
        beforeMinuseFunc: function(obj,pluginObj){
//            alert("beforeMinuseFunc");
        },
        //加按钮调用之前,pluginObj代表当前运行的对象，obj代表按钮对象
        afterPlusFunc:function(obj,pluginObj){
//            alert("afterPlusFunc");
        },
        //加按钮调用之前,pluginObj代表当前运行的对象，obj代表按钮对象
        afterMinuseFunc:function(obj,pluginObj){
//            alert("afterMinuseFunc");
        }
    };

    //获取用户的配置文件，覆盖默认设置
    this.setting = $.extend(this.setting,userSetting);

    //初始化参数
    this.checkParam=function(){
        var settingObj = that.setting;
        //如果用户没有设置targetId的值，则设置targetId的值为doucument
        if(userSetting.targetId == undefined || userSetting.targetId == ""){
            settingObj.targetId = document;
        }else{
            settingObj.targetId = "#"+settingObj.targetId;
        }
    }

    //检查参数
    this.checkParam();

    //缓存上下文
    this.context = $(this.setting.targetId);

    //设置按钮组的宽度,参数groupWidth是字符串，例如500px;
    this.setGroupWidth = function(groupWidth){
        $("div.input-group",that.context).css("width",groupWidth);
    };
    //设置按钮组的类样式
    this.setGroupBtnClass = function(groupBtnClass){
        $("div.input-group",that.context).addClass(groupBtnClass);
    };

    //设置按钮组的行内样式
    this.setGroupBtnStyle = function(groupBtnStyle){
        if("" == groupBtnStyle || undefined == groupBtnStyle){
            that.setGroupWidth(that.setting.groupBtnWidth);
        }else{
            $("div.input-group",that.context).attr("style",groupBtnStyle);
        }
    };

    //设置“所有”输入框的input类样式
    this.setInputClass = function(inputClass){
        $("div.input-group input.form-control",that.context).addClass(inputClass);
    };

    //设置“所有”输入框的行内样式
    this.setInputStyle = function(styleStr){
        $("div.input-group input.form-control",that.context).attr("style",styleStr);
    };

    //设置“所有”加按钮类样式
    this.setPluseBtnClass = function(pluseBtnClass){
        $("div.input-group button.plus_btn",that.context).addClass(pluseBtnClass);
    };

    //设置“所有”加按钮类样式
    this.setPluseBtnStyle = function(pluseBtnStyle){
        $("div.input-group button.plus_btn",that.context).attr("style",pluseBtnStyle);
    };

    //设置“所有”减按钮类样式
    this.setMinusBtnClass = function(minusBtnClass){
        $("div.input-group button.minus_btn",that.context).addClass(minusBtnClass);
    };

    //设置“所有”减按钮类样式
    this.setMinusBtnStyle = function(minusBtnStyle){
        $("div.input-group button.minus_btn",that.context).attr("style",minusBtnStyle);
    };

    //检查数据是否正常,如果正常返回数字，如果不正常，返回false
    this.checkGoodsNubmer = function(number){
        var numbers = parseInt(number);
        var result = numbers;
        if(numbers === NaN){
            result = false;
        }
        if(numbers < 0){
            result = false;
        }
        return result;
    };

    //初始化减按钮功能
    this.initMinuseBtn = function(){
        $("button.minus_btn",that.context).bind("click",function(event){

            //定义一个内部方法用来获取input表单的值
            this.getInputValue = function(){
                //this代表当前减按钮的控件
                return $(this).closest("div.input-group").find("input").val();
            };

            //设置输入的值
            this.setInputValue = function(userValue){
                $(this).closest("div.input-group").find("input").val(userValue)
            };

            //获取加号btn控件
            this.getOtherBtn = function(){
                //this代表当前减按钮的控件
                return $(this).closest("div.input-group").find("button.plus_btn")[0];
            };

            //parent代表groupBtnInit对象
            if(typeof that.setting.beforeMinuseFunc == "function"){
                //this代表控件对象，that代表方法对象
                that.setting.beforeMinuseFunc(this,that);
            };

            var $currentObj = $(this);
            var $inputObj = $currentObj.closest(".input-group").find("input");
            //如果获取的值是小于设置的最小值则不做任何处理
            if($inputObj.val() <= that.setting.minValue){
                return false;
            };
            //检查数据是否正常
            var isCheck = that.checkGoodsNubmer($inputObj.val());
            if(isCheck){
                var currentNumber = parseInt($inputObj.val());
                if(currentNumber >= 1){
                    $inputObj.val( currentNumber - 1);
                }
            };

            //parent代表groupBtnInit对象
            if(typeof that.setting.afterMinuseFunc == "function"){
                //this代表控件对象，that代表方法对象
                that.setting.afterMinuseFunc(this,that);
            }
        });
    };

    //初始化加按钮功能
    this.initPlusBtn = function(){
        $("button.plus_btn",that.context).bind("click",function(){

            //定义一个内部方法用来获取input表单的值
            this.getInputValue = function(){
                return $(this).closest("div.input-group").find("input").val();
            }

            //设置输入的值
            this.setInputValue = function(userValue){
                $(this).closest("div.input-group").find("input").val(userValue)
            }

            //获取减号btn控件
            this.getOtherBtn = function(){
                return $(this).closest("div.input-group").find("button.minus_btn")[0];
            }

            //parent代表groupBtnInit对象
            if(typeof that.setting.beforePlusFunc == "function"){
                //this代表控件对象，that代表方法对象
                that.setting.beforePlusFunc(this,that);
            }

            var $currentObj = $(this);
            var $inputObj = $currentObj.closest(".input-group").find("input");

            //如果获取的值是大于设置的最大值则不做任何处理
            if($inputObj.val() >= that.setting.maxValue){
                return false;
            }

            var isCheck = that.checkGoodsNubmer($inputObj.val());
            if(isCheck==0 || isCheck){
                $inputObj.val(parseInt($inputObj.val()) + 1);
            }
            //parent代表groupBtnInit对象
            if(typeof that.setting.afterPlusFunc == "function"){
                //this代表控件对象，that代表方法对象
                that.setting.afterPlusFunc(this,that);
            }
        });
    };

    //初始化按钮组控件，设置其显示和绑定方法
    this.init = function(){
        //按钮组的宽度
//        that.setGroupWidth(that.setting.groupBtnWidth);
        //设置按钮组的类样式
        that.setGroupBtnClass(that.setting.groupBtnClass);
        //设置按钮组的行内样式
        that.setGroupBtnStyle(that.setting.groupBtnStyle);
        //设置输入框的类样式
        that.setInputClass(that.setting.inputClass);
        //设置加按钮的类样式
        that.setInputStyle(that.setting.inputStyle);
        //设置加按钮的类样式
        that.setPluseBtnClass(that.setting.pluseBtnClass);
        //设置输入框的行内样式
        that.setPluseBtnStyle(that.setting.pluseBtnStyle);
        //设置减按钮的类样式
        that.setMinusBtnClass(that.setting.minusBtnClass);
        //设置减按钮的行内样式
        that.setMinusBtnStyle(that.setting.minusBtnStyle);
        //初始化减按钮功能
        that.initMinuseBtn();
        //初始化加按钮功能
        that.initPlusBtn();
    }

    this.init();

}


//var mysetting = {
//    type:"span",
//    switchSelecter : "#all",
//    exceptSelector: "#ddd"
//    listSelecter : "#list input"
//};
//sqh_all_checked(mysetting);
//    1、要求传递 全选的id  和 被选择的list
//    2、全选控件的回调函数
//    3、被选择的list回调函数
function sqh_all_checked(mySetting){
    //要用that定义变量，缓存起来
    var that = this;

    this.setting = {
        //默认开关控件 和 list 控件全部是checkbox类型，这样不用输入回调函数,如果是其他的，参数应该为other
        type:"checkbox",
        //开关选择器
        switchSelecter : "#checkedall",
        //开关按钮触发的click事件，obj表示是开关控件
        switchClick : function(obj,currentFunObj){
            if(obj.checked == false || obj.checked == undefined){
                //console.log("选中");
                currentFunObj.$list.each(function(i,dom){
                    dom.checked = false;
                });
            }else{
                //console.log("不选中");
                currentFunObj.$list.each(function(i,dom){
                    dom.checked = true;
                });
            }
        },
        //listItem选择器
        listSelecter : "input[name='items']",
        //筛选不要的listSelecter对象
        exceptSelector : "",
        //listItem的click事件，obj表示item控件
        listClick : function(obj,currentFunObj){
            var flag = true;
            currentFunObj.$list.each(function(){
                if(!this.checked)
                    flag = false;
            });
            //document.getElementById(this.switchSelecter.split("#")[1]).checked = flag;
            //jquery选中，兼容性
            currentFunObj.$switch.each(function(i,dom){
                dom.checked = flag;
            });
        }
    };
    //开关控件
    this.$switch = null;
    //被操作的对象
    this.$list = null;

    //参数接收jquery对象
    this.isCheckboxWidget = function(jqueryObj){
        var result = true;
        jqueryObj.each(function(i,dom){
            if("checkbox" != dom.type){
                result = false;
            }
        });
        return result;
    };

    //检查参数
    this.checkSetting = function(){
        //根据传递过来的select判断控件是否存在
        if(that.$switch.size() <= 0 || that.$list.size() <= 0){
            alert("根据传递过来的选择条件找不到控件");
            return false;
        }

        //检查type类型是否是checkbox，如果不是，则需要自定义回调函数，否则报错
        if("checkbox" == that.setting.type){
            if(!that.isCheckboxWidget(that.$switch)){
                alert("全选控件不为checkbox控件");
                return false;
            }
            if(!that.isCheckboxWidget(that.$list)){
                alert("被选控件不为checkbox控件");
                return false;
            }
        }else{
            //判断用户是否自定义方法
            if(mySetting.switchClick == undefined || mySetting.listClick == undefined){
                alert("默认类型不是checkbox，请您自定义回调方法");
                return false;
            }
        }
    }

    //获取目标变量
    this.initTarget = function(){
        //开关控件
        that.$switch = $(this.setting.switchSelecter);
        //被操作的对象
        that.$list = null;
        if(that.setting.exceptSelector == "" || that.setting.exceptSelector == undefined){
            that.$list = $(that.setting.listSelecter);
        }else{
            that.$list = $(that.setting.listSelecter).not(that.setting.exceptSelector);
        }
    };

    //用户自定义函数
    this.userDefinedFunc = function(){
        //开关控件的回调函数
        that.$switch.click(function(){
            //判断用户是否做了回调函数
            //that指向的是sqh_all_checked函数，如果是that则指向的是当前function匿名函数
            if(that.setting.switchClick != undefined){
                that.setting.switchClick(this,that);
            }
        });

        that.$list.each(function(i,dom){
            //被操作控件的回调函数
            $(dom).click(function(){
                //判断配置文件是否做了回调函数
                //that指向的是sqh_all_checked函数，如果是that则指向的是当前function匿名函数
                if(that.setting.listClick != undefined){
                    that.setting.listClick(dom,that);
                }
            });
        });
    };

    //初始化对象,注意里面方法的顺序
    this.init = function(){
        //获取用户的配置文件
        that.setting = $.extend(that.setting , mySetting);
        //获取目标变量
        that.initTarget();
        //检查参数
        that.checkSetting();
        //自定义回调函数
        that.userDefinedFunc();
    };
    this.init();

}

/**
 * 排他选择，即只能选择一个，其余的就不能选中
 */
function oneSelectedPlugin(mySetting){

    var that = this;
    mySetting = mySetting || {};
    this.setting = {
        //选中的目标控件,使用jquery的查找方式
        selector : "",
        //选中状态，判断控件是否被选中的条件,已attr=value的形式，只要查询出来的属性值包含value，则认为是目标控件
//            condition : "class=color_66cc66",
        condition : "class=color_66cc66",
        //选中的回调函数,obj表示当前控件，PluginObj表示控件对象
        selectedFun : function(obj,PluginObj){
        },
        //没有选中的回调函数,obj表示当前控件，PluginObj表示控件对象
        unselectedFun : function(obj,PluginObj){
        },
        //排除部分选项
//            exceptSelector : ".huangbiao"
        exceptSelector : ""
    };

    //获取用户的配置文件
    that.setting = $.extend(that.setting , mySetting);

    this.checkParam = function(){
        var targetWidgetQueryStr = that.setting.selector;
        //检查目标控件字符串
        if(targetWidgetQueryStr == "" || targetWidgetQueryStr == undefined){
            alert("请输入jquery查询字符串");
            return false
        }else{
            if($(targetWidgetQueryStr).length <= 0 ){
                alert("根据您输入的查询条件找不到控件");
                return false;
            }
        }
        return true;
    };

    //判断当前控件是否选中
    this.isSelected = function(obj){
        //标准属性的名字
        var propName = that.setting.condition.split("=")[0];
        //标准属性的值
        var propValue = that.setting.condition.split("=")[1];
        //当前属性的值
        var currentPropValue = $(obj).prop(propName);
        //当前属性的值中有与标准属性的值，则表示存在，返回为真
        if(currentPropValue.indexOf(propValue)>0){
            return true;
        }else{
            return false;
        }
    };

    //让所有目标控件全部不选中
    this.unSelectedAll = function(){
        $(that.setting.selector).each(function(){
            that.setting.unselectedFun(this,that);
        });
    }

    //obj代表当前被点击的控件
    this.targetClick = function(obj){
        if(!that.isSelected(obj)){
            //让所有的控件全部不选中
            that.unSelectedAll();
            //当前控件选中
            that.setting.selectedFun(obj,that);
        }
    };

    //插件初始化
    this.init = function(){

        if(!that.checkParam()){
            return false;
        }

        //判断是否有筛选条件，没有排除的选项
        if(that.setting.exceptSelector == "" || that.setting.exceptSelector == undefined){
            //给被选中的单选控件绑定事件
            $(that.setting.selector).on("click",function(){
                that.targetClick(this);
            });
        }else{
            //有排除的选项
            //给被选中的单选控件绑定事件
            $(that.setting.selector).not(that.setting.exceptSelector).on("click",function(){
                that.targetClick(this);
            });
        }

    };
    this.init();
}


/*****************滑动效果的函数*****************/
/*
 <div class="all_width sqh_overflow_hidden" id="availableDate">
 <div class="inner ">
 <div class="border_b_right_eee float_left margin_bottom_5 margin_top_5" >
 今天<br>
 5月25日
 </div>
 <div class="border_b_right_eee float_left margin_bottom_5 margin_top_5 sqh_font_color_red" >
 今天<br>
 5月26日
 </div>
 <div class="border_b_right_eee float_left margin_bottom_5 margin_top_5" >
 今天<br>
 5月27日
 </div>
 <div class="border_b_right_eee float_left margin_bottom_5 margin_top_5" >
 今天<br>
 5月28日
 </div>
 <div class="border_b_right_eee float_left margin_bottom_5 margin_top_5" >
 今天<br>
 5月29日
 </div>
 <div class="border_b_right_eee float_left margin_bottom_5 margin_top_5" >
 今天<br>
 5月30日
 </div>
 <div >
 今天<br>
 6月1日
 </div>
 </div>

 <div class="sqh_absolute" style="top:0px;left:10px;" id="preBtn">
 <span class="icon iconfont sqh_color_99 sqh_line_height_25" aria-hidden="true">&#xe608;</span>
 </div>
 <div class="sqh_absolute" style="top:0px;right:10px;" id="nextBtn">
 <span class="icon iconfont sqh_color_99 sqh_line_height_25" aria-hidden="true">&#xe611;</span>
 </div>
 </div>

 */
//滑动效果的函数
function initFlipsnap(mysetting){
    var that = this;
    //校验参数的值
    mysetting = mysetting || {};
    this.setting={
        //值为jquery的查询器
        targetObj : "#flipsnap",
        //指定滑动的内容
        targetContent : ".inner",
        //单元格的控件
        targetCell : "div",
        //总共有多少个单元格
        allNumber : 7,
        //一行显示多少个单元格
        pageSize : 3,
        //最大滑动的距离
        maxPoint : 4
    };

    this.setting = $.extend(this.setting , mysetting);

    //获取显示屏的尺寸
    this.getScreenWidth = function(){
        return document.body.clientWidth ;
    };

    //初始化方法
    this.init = function(){
        var screenWidth = that.getScreenWidth();
        var oneDivWidth = (screenWidth / that.setting.pageSize) - 3;
        var innerDivWidth = oneDivWidth * that.setting.allNumber;

        //设置容器的宽度，及单元格的宽度 * 单元格的个数
        var contentObj = $(that.setting.targetContent,$(that.setting.targetObj));
        contentObj.css("width",innerDivWidth);

        //让容器内的所有单元格全部往左浮动
//        $(".inner div").css("width",oneDivWidth).css("float","left");
        $(that.setting.targetCell,contentObj).css("width",oneDivWidth).css("float","left");

        //初始化flisnap控件
        var flipsnap = Flipsnap(that.setting.targetObj +' ' + that.setting.targetContent,{
            //每次滑动的距离
            distance: oneDivWidth,
            //最大滑动的距离
            maxPoint : that.setting.maxPoint
        });

        //绑定结束事件
        flipsnap.element.addEventListener("fstouchend",function(ev){

        });

        $("#nextBtn").bind("click",function(){
            flipsnap.toNext();
        });

        $("#preBtn").bind("click",function(){
            flipsnap.toPrev();
        });
    };

    //给选中的日期添加颜色,还有业务逻辑处理
    $("#availableDate .inner div").bind("click",function(){
        $("#availableDate .inner div[class*='sqh_font_color_red']").removeClass("sqh_font_color_red");
        $(this).addClass("sqh_font_color_red");
    });

    this.init();
}

/**********************解决底部自动导航的问题*******************/
/*
* myclass为底部固定的dom节点
* targetDom 需要计算的目标dom高度，即内容的最大高度
* */
function autoNav(myclass,targetDom){
    //如果没有传递参数，则使用默认的值，否则使用用户自定义的值
    if(myclass == undefined || myclass == ""){
        myclass = ".navbar";
    }
    //获取内容的高度
    if(targetDom == undefined || targetDom == ""){
        targetDom = "body";
    }
    var bodyHeight = $(targetDom).height();
    //获取底部导航的高度
    var navHeight = $(myclass).height();
    //获取显示屏的高度
    var iHeight = document.documentElement.clientHeight||document.body.clientHeight;
    //如果内容的高度大于（窗口的高度 - 导航的高度）,z则需要添加一个div，设置其高度
    if(bodyHeight > (iHeight - navHeight)){
        $(targetDom).append('<div style="height: '+navHeight+'px"></div>');
    }
}

/********************** 根据多个标签 解决底部自动导航的问题*******************/
/*
 * myclass为底部固定的dom节点
 * domArray 数组，多个组件的高度和为页面的内容，如果不填写，则默认为body
 * targetDom 字符串，自动添加的内容是放在指定控件内
 * inOrOut  布尔值，如果为true，表示是添加targetDom内，false表示是添加targetDom外
 * */
function autoNavMoreComponent(myclass,domArray,targetDom){
    //如果没有传递参数，则使用默认的值，否则使用用户自定义的值
    if(myclass == undefined || myclass == ""){
        myclass = ".navbar";
    }

    //如果输入的参数不为数组
    if(!domArray instanceof Array){
        //alert("第二个参数为数组");
        //return false;
        domArray = ["body"];
    }
    //计算多个控件的总高度
    var contentHeight = 0;
    for(var i = 0; i < domArray.length ; i++){
        contentHeight = contentHeight + $(domArray[i]).height();
    }
    //获取底部导航的高度
    var navHeight = $(myclass).height();
    //获取显示屏的高度
    var iHeight = document.documentElement.clientHeight||document.body.clientHeight;
    //如果内容的高度大于（窗口的高度 - 导航的高度）,z则需要添加一个div，设置其高度
    if(contentHeight > (iHeight - navHeight)){
        if(targetDom == undefined || targetDom == ""){
            targetDom = "body";
        }
        $(targetDom).append('<div style="height: '+navHeight+'px"></div>');
    }
}

/******************根据图片的大小，设置图片顶部留白和底部留白部分，以图片实际显示尺寸作为参照物*******************/
function imgPercent(mySetting){

    var that = this;
    if(mySetting == "" || mySetting == undefined || typeof mySetting != "object"){
        mySetting = {};
    }
    //使用时间戳作为空间的ID
    var timeStamp = new Date().getTime();

    this.setting = {
        //将内容填放的位置
        targetContent : "#imgPercent",
        //图片的地址内容
        imgURL : "../img/index_logo.png",
        //img控件的父div的样式设置
        imgContainerClass : "",
        //img控件的样式
        imgClass : "",
        //顶部div的样式
        topClass : "",
        //底部div的样式
        bottomClass : "",
        //顶部留白占图片百分比
        topPercent : 0,
        //底部留白占图片百分比
        bottomPercent : 0,
        //目标的ID值，这个默认是时间戳
        objectId : "",
        //显示之前的回调函数
        beforeShow : function(plugin,id){
        },
        //显示之后的回调函数
        afterShow : function(plugin,id){
        }

    };

    this.setting = $.extend(this.setting, mySetting,{objectId:timeStamp});

    //获取顶部div的HTML代码字符串
    this.getTopDiv = function(){
        var topDivHtml = '<div id="topDiv'+that.setting.objectId+'"></div>';
        //判断配置文件中是否引用了Class样式
        if(that.setting.topClass != "" && that.setting.topClass != undefined && typeof that.setting.topClass == "string"){
            topDivHtml = '<div id="topDiv' + that.setting.objectId + '" class="' + that.setting.topClass + '"></div>';
        }
        return topDivHtml;
    };

    //获取顶部div的HTML代码字符串
    this.getImgDiv = function(){
        var imgDivHtml =  '<div id="imgDiv'+that.setting.objectId+'">';
        var imgHtml = '<img id="imgDiv'+that.setting.objectId+'" class="img-responsive div_center " src="'+that.setting.imgURL+'"/></div>';
        //判断配置文件中是否引用了Class样式
        if(that.setting.imgContainerClass != "" && that.setting.imgContainerClass != undefined && typeof that.setting.imgContainerClass == "string"){
            imgDivHtml = '<div id="imgDiv'+that.setting.objectId+'" class="' + that.setting.imgContainerClass + '">';
//                        '<img class="img-responsive div_center" src="'+that.setting.imgURL+'"/></div>';
        }
        //判断配置文件中是否引用了Class样式
        if(that.setting.imgClass != "" && that.setting.imgClass != undefined && typeof that.setting.imgClass == "string"){
            imgHtml = '<img class="img-responsive div_center '+that.setting.imgClass+'" src="'+that.setting.imgURL+'"/></div>';
        }

        return imgDivHtml + imgHtml ;
    };

    //获取顶部div的HTML代码字符串
    this.getBottomDiv = function(){
        var bottomDivHtml = '<div id="bottomDiv'+that.setting.objectId+'"></div>';
        //判断配置文件中是否引用了Class样式
        if(that.setting.bottomClass != "" && that.setting.bottomClass != undefined && typeof that.setting.bottomClass == "string"){
            bottomDivHtml = '<div id="bottomDiv' + that.setting.objectId + '" class="' + that.setting.bottomClass + '"></div>';
        }
        return bottomDivHtml;
    };

    this.init = function(){
        $(that.setting.targetContent).html(that.getImgDiv());
        //生成最终显示的代码
        var targetHTML = '<div id="'+that.setting.objectId+'">' + that.getTopDiv() + that.getImgDiv() + that.getBottomDiv() + '</div>';
        //执行显示前的回调函数
        if(that.setting.beforeShow != undefined && typeof that.setting.beforeShow == "function"){
            that.setting.beforeShow(that,that.setting.objectId);
        }
        //将代码放到指定的容器中
        $(that.setting.targetContent).html(targetHTML);

        //获取图片的实际高度
        var imgHeight = $("#imgDiv"+that.setting.objectId).find("img").height();
        //获取顶部留白的高度，这个高度是按照图片的比例计算出来的
        var topDivHeight = imgHeight * that.setting.topPercent;
        //获取底部留白的高度，这个高度是按照图片的比例计算出来的
        var bottomDivHeight = imgHeight * that.setting.bottomPercent;

        $("#topDiv"+that.setting.objectId).css("height",topDivHeight);
        $("#bottomDiv"+that.setting.objectId).css("height",bottomDivHeight);
        //执行显示前的回调函数
        if(that.setting.afterShow != undefined && typeof that.setting.afterShow == "function"){
            that.setting.afterShow(that,that.setting.objectId);
        }

    };

    this.resize = function(){
        //获取图片的实际高度
        var imgHeight = $("#imgDiv"+that.setting.objectId).find("img").height();
        //获取顶部留白的高度，这个高度是按照图片的比例计算出来的
        var topDivHeight = imgHeight * that.setting.topPercent;
        //获取底部留白的高度，这个高度是按照图片的比例计算出来的
        var bottomDivHeight = imgHeight * that.setting.bottomPercent;

        $("#topDiv"+that.setting.objectId).css("height",topDivHeight);
        $("#bottomDiv"+that.setting.objectId).css("height",bottomDivHeight);
    };

    this.init();

}

//右侧导航
function navRight(){
//        nav_right
//        nav_switch
//        nav_right_son
    var that = this;
    //上下文
    this.context = $(".nav_right");
    //开关
    this.pluginSwitch = $(".nav_switch",context);
    //子菜单
    this.menu = $(".nav_right_son",context);
    //给开关绑定事件
    that.pluginSwitch.on("click",function(){
        that.menu.slideToggle("slow");
//            that.menu.fadeToggle("slow","linear");
    });
}

/*********************collapse 折叠效果***************************/
/*
 <div class="bg_ff my_collapse">
 <ul class="list-unstyled clear_margin_bottom ">
 <li class="pointer data-item">
 <div class="font_16 height_div_40 padding_left_10 padding_right_10 border_b_bottom_eee data-title" >
 积分能为我带来什么?
 <span class="iconfont icon font_16 float_right">&#xe61d;</span>
 </div>
 <div class="color_99 bg_ff padding_left_10 padding_right_10 padding_top_10 padding_bottom_10 border_b_bottom_eee data-detail" >
 <ul class="list-unstyled clear_margin_bottom line_height_15 ">
 <li>在美团，小小的积分可以为你赢来大大的福利，因为积分：</li>
 <li>1）可以在商城兑换各种超值好礼;</li>
 <li>2）能让你小试手气，赢得大奖;</li>
 <li>3）能够用来秒杀各种商城定期派发的抵用券/li>
 <li>4）在消费时还能抵现金</li>
 <li>小妹温馨提示：在美国，抽奖和商品兑换是最划算的</li>
 </ul>
 </div>
 </li>
 </ul>
 </div>
注意：
div.my_collapse     表示collapse 控件
li.data-item        collapse控件中的一个折叠效果
div.data-title      collapse的标题
div.data-detail     collapse的详细内容

* */

function myCollapse(){
    var that = this;

    this.setting = {
        //collapse控件选择器
        selector : ".my_collapse",
        //变化之前触发
        beforeChange : function(titleObj,pluginObj){
//                alert("beforeChange");
//                alert(titleObj.outerHTML);
//                alert(pluginObj);
        },
        //变化之后触发
        afterChange : function(titleObj,pluginObj){
//                alert("afterChange");
        }
    };

    //隐藏所有的内容
    this.hideAll = function(){
        $(that.setting.selector).find("li.data-item").removeClass("active");
    };

    //隐藏除自身之外的li控件
    this.hideOther = function(obj){
        $(that.setting.selector).find("li.data-item").not($(obj).closest("li")).removeClass("active").find(".icon").html("&#xe61d;");
    };

    //改变icon图标
    //obj为div.data-title控件
    this.changeIcon = function(obj){
        if($(obj).closest("li.data-item").hasClass("active")){
            $(obj).find("span.icon").html("&#xe61d;");
        }else{
            $(obj).find("span.icon").html("&#xe61c;");
        }
    };

    this.bindEvent = function(){
        $(that.setting.selector).find("li.data-item div.data-title").on("click",function(){
            //改变前的回调函数
            that.setting.beforeChange(this,that);

            //this代表的是div.data-title控件
            that.hideOther(this);
            //改变图标
            that.changeIcon(this);
            //显示或者隐藏内容
            $(this).closest("li.data-item").toggleClass("active");

            //改变后的回调函数
            that.setting.afterChange(this,that);
        });
    };

    this.init = function(){

        //给标题绑定事件
        that.bindEvent();
    };

    this.init();
}

/*********************倒计时***************************/
//var mySetting = {
//    //目标容器的ID，这个使用jquery查询的条件
//    targetId:"#countDownTarget",
//    //定时器的总共时长
//    timeCount : 15,
//被间隔执行一次的方法
//setpCallback:function(){
//    console.log("setpCallback");
//},
////定时器结束执行的方法
//lastCallback:function(){
//    console.log("lastCallback");
//},
//    tips : "{_time_}秒后自动返回首页"
//}
//
//new countDown(mySetting);
function countDown(userSetting){
    var that = this;
    //如果用户没有传递参数，则使用默认参数
    userSetting = userSetting || {};
    this.setting = {
        //目标容器的ID，这个使用jquery查询的条件
        targetId:"#countDownTarget",
        //定时器的总共时长
        timeCount : 60,
        //默认步长，即每次总共时长减少的值，单位为毫秒
        step : 1000,
        //最小临界值，即到了这个值之后就不再减少了
        minCritical : 0,
        //是否有临界值，false表示没有，true表示有,默认是有临界值的
        hasCritical : true,
        //被间隔执行一次的方法
        setpCallback:function(){},
        //定时器结束执行的方法
        lastCallback:function(){},
        //目标控件中提示内容,{_time_}表示定时器的时间
        tips : "{_time_}"
    };

    //获取用户的配置文件，覆盖默认设置
    this.setting = $.extend(this.setting,userSetting);

    //开始倒计时
    this.startTimeOut = function(){
        setTimeout(that.action,that.setting.step);
    };
    //倒计时采取的动作
    this.action = function(){
        //没间隔执行一次回调
        that.setting.setpCallback();
        that.setting.timeCount--;
        //执行定时器的动作
        $(that.setting.targetId).html(that.setting.tips.replace("{_time_}",that.setting.timeCount));

        //判断定时器是否需要临界值
        if(that.setting.hasCritical){
            //判断计数器 是否小于 临界值，如果小于，则不在执行
            if(that.setting.timeCount > that.setting.minCritical){
                that.startTimeOut();
            }else{
                //没间隔执行一次回调
                that.setting.lastCallback();
            }
        }
        //没有临界值的操作
        else{
            that.startTimeOut();
        }
    };

    //插件初始化的方法
    this.init = function(){
        that.startTimeOut();
    };
    //执行初始化函数
    this.init();

}

/*
function shareOne(){
	//alert("shareOne");
	new WXShare({
		"weixinConfig":{
			debug: false, 
		    appId: '{$datas["appId"]}', 
		    timestamp: '{$datas["timestamp"]}', 
		    nonceStr: '{$datas["nonceStr"]}', 
		    signature: '{$datas["signature"]}',
		    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']
		},
		//分享到“分享给朋友”
		"shareAppMessage":function(){
			alert("shareAppMessage");
		},
		//分享到“朋友圈”
		"shareTimeline":function(){
			alert("shareTimeline");
		},
		//是否显示分享向导
		"isShowWizard" : true,
		//分享向导HTML代码存放的位置，如果没有，默认是body的最后面；这里使用的jquery的查找方式
		"wizardHTMLWidget" : "#huangbiao_weixin_share"
	});

	
}

function shareTwo(){
	//alert("shareTwo");
	new WXShare({
		"weixinConfig":{
			debug: false, 
		    appId: '{$datas["appId"]}', 
		    timestamp: '{$datas["timestamp"]}', 
		    nonceStr: '{$datas["nonceStr"]}', 
		    signature: '{$datas["signature"]}',
		    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']
		},
		"shareData" : {
			"title": "黄彪titile",
	        "desc": "黄彪desc",
	        "link": 'http://www.sqhzg.cn/index.php/Wap/Activity/index.html',
	        "imgUrl": 'http://www.sqhzg.cn/Public/Static/Wap/v30/images/tiger_choujiang/515530446979026513.png',
	        "success": function () {
	        	alert("share success");
	        },
	        "cancel": function () { 
		        // 用户取消分享后执行的回调函数
	        	alert("share cancel");
		    }
		},
		
		//是否显示分享向导
		"isShowWizard" : true,
		//分享到“朋友圈”
		"shareTimeline":function(){
			alert("shareTimeline");
		},
	});
}
*/
//分享微信
function WXShare(userSetting){
	
	var that = this;
	var __WEIXIN__ = wx;
	//标记是否是第一次加载该空间
	var __IS_CONFIG__ = window.__WEIXIN_SHARE__;
	//分享wizard容器提示左右标记
	var WIZARD_WIDGET_LEFT = '<div id="_WEIXIN_SHARE_"><div class="fixed position_all_0 bg_000 opacity_65 all_width all_height"></div>';
	var WIZARD_WIDGET_RIGHT = '</div>'
	
	//检查用户输入
	var tempSetting = userSetting || {};
	//默认配置文件
	var defaultSetting = {
		//通过config接口注入权限验证配置
		"weixinConfig":{
			debug: false, 
		    appId: 'wx02f88e7d9f7a15c4', 
		    timestamp: '1479716496', 
		    nonceStr: 'b2QetkvZSZ8edLfl', 
		    signature: '98345b0600a085e8fb2f03e2cad55d4dc211f5ae',
		    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']
		},
		
		//判断当前客户端版本是否支持指定JS接口
		"checkJsApi" : {
			"jsApiList": ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'], 
	        "success": function(res) {
	            if(res === false){
	                //alert(JSON.stringify(res));
	            }
	        }
		},
		
		// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
		//所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		"wxReady":function(){
			
		},
		
		// config信息验证失败会执行error函数，如签名过期导致验证失败，
		//具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		"wxError":function(res){
			console.dir("res : " + res);
			alert(res.errMsg);
		},
		//是否显示分享向导
		"isShowWizard" : false,
		//分享向导HTML代码存放的位置，如果没有，默认是body的最后面；这里使用的jquery的查找方式
		"wizardHTMLWidget" : null,
		//分享向导HTML
		"wizardHTML" : {
			"ios_wx":WIZARD_WIDGET_LEFT + '<div class="share_level ios_wx"><div class="absolute"style="margin-left: 10%;top: 5%;"><img src="__PUBLIC__/Wap/v30/images/share_goods/ios_share_1.png"class="img_responsive all_width"><img src="__PUBLIC__/Wap/v30/images/share_goods/ios_share_2.png"class="img_responsive all_width"><img src="__PUBLIC__/Wap/v30/images/share_goods/ios_share_3.png"class="img_responsive all_width"><div class="absolute all_width"style="left: -3%; bottom: -20%;"><div class="margin_center width_30 pointer"style="padding-bottom: -10%;"><img src="__PUBLIC__/Wap/v30/images/share_goods/ios_share_4.png"class="img_responsive all_width"></div></div></div></div>' + WIZARD_WIDGET_RIGHT,
			"ios_QQ":WIZARD_WIDGET_LEFT + '<div class="share_level ios_QQ"><div class="absolute"style="margin-left: 10%;top: 5%;"><img src="__PUBLIC__/Wap/v30/images/share_goods/ios_QQ_1.png"class="img_responsive all_width"><img src="__PUBLIC__/Wap/v30/images/share_goods/ios_QQ_2.png"class="img_responsive all_width"><img src="__PUBLIC__/Wap/v30/images/share_goods/ios_QQ_3.png"class="img_responsive all_width"><div class="absolute all_width"style="left: -3%; bottom: -20%;"><div class="margin_center width_30 pointer"style="padding-bottom: -10%;"><img src="__PUBLIC__/Wap/v30/images/share_goods/ios_share_4.png"class="img_responsive all_width"></div></div></div></div>'  + WIZARD_WIDGET_RIGHT,
			"android_wx":WIZARD_WIDGET_LEFT + '<div class="share_level android_wx"><div class="absolute"style="margin-left: 10%;top: 5%;"><img src="__PUBLIC__/Wap/v30/images/share_goods/android_wx_1.png"class="img_responsive all_width"><img src="__PUBLIC__/Wap/v30/images/share_goods/android_wx_2.png"class="img_responsive all_width"><img src="__PUBLIC__/Wap/v30/images/share_goods/android_wx_3.png"class="img_responsive all_width"><div class="absolute all_width"style="left: -3%; bottom: -20%;"><div class="margin_center width_30 pointer"style="padding-bottom: -10%;"><img src="__PUBLIC__/Wap/v30/images/share_goods/ios_share_4.png"class="img_responsive all_width"></div></div></div></div>'  + WIZARD_WIDGET_RIGHT,
			"android_QQ":WIZARD_WIDGET_LEFT + '<div class="share_level android_QQ"><div class="absolute"style="margin-left: 10%;top: 5%;"><img src="__PUBLIC__/Wap/v30/images/share_goods/android_QQ_1.png"class="img_responsive all_width"><img src="__PUBLIC__/Wap/v30/images/share_goods/android_QQ_2.png"class="img_responsive all_width"><img src="__PUBLIC__/Wap/v30/images/share_goods/android_QQ_3.png"class="img_responsive all_width"><div class="absolute all_width"style="left: -3%; bottom: -20%;"><div class="margin_center width_30 pointer"style="padding-bottom: -10%;"><img src="__PUBLIC__/Wap/v30/images/share_goods/ios_share_4.png"class="img_responsive all_width"></div></div></div></div>'  + WIZARD_WIDGET_RIGHT
		},
		
		//分享到“朋友圈”
		"shareTimeline":false,
		
		//分享到“分享给朋友”
		"shareAppMessage":false,
		
		//分享到“分享到QQ”
		"shareQQ":false,
		
		//分享到“分享到腾讯微博”
		"shareWeibo":false,
		
		//分享到“分享到QQ空间”
		"shareQZone":false,
		
		"shareData" : {
			"title": "我在参与社区惠国庆抽奖活动，奖品多多，一起来吧！",
	        "desc": "国庆七天假，是时候人品大爆发了！",
	        "link": 'http://www.sqhzg.cn/index.php/Wap/Activity/index.html',
	        "imgUrl": 'http://www.sqhzg.cn/Public/Static/Wap/v30/images/tiger_choujiang/515530446979026513.png',
	        "success": function () {
	        },
	        "cancel": function () { 
		        // 用户取消分享后执行的回调函数
		    }
		}
		
	};
	
	
	//获取最终配置
	var __SETTING__ = this.setting = $.extend(defaultSetting,tempSetting);
	
	//隐藏分享提示
	this.hiddenTips = function(){
		$("#_WEIXIN_SHARE_").remove();
	};
	
	//插件工具对象
	this.util = {
		/*$("#confirmBtn").on("click",function(obj){
			//微信浏览器打开
			if (that.util.browser.iPhone || that.util.browser.iPad || that.util.browser.ios) {
				//alert("苹果微信");
				$(".ios_wx").removeClass("display_none");
			}else{
				$(".android_wx").removeClass("display_none");
			}
		});*/
		//检车终端设备
		browser: function () {
			var u = navigator.userAgent, app = navigator.appVersion;
			return { //移动终端浏览器版本信息 
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器 
				iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
				iPad: u.indexOf('iPad') > -1 //是否iPad 
			};
		}()
	};
	
	//判断设备，返回不同的wizardHTML
	this.getWizardHtml = function(){
		//微信浏览器打开
		if (that.util.browser.iPhone || that.util.browser.iPad || that.util.browser.ios) {
			//alert("苹果微信");
			return __SETTING__.wizardHTML.ios_wx;
		}else{
			return __SETTING__.wizardHTML.android_wx;
		}
	};
	
	//注册配置信息
	this.configWXInfo = function(){
		if(__IS_CONFIG__ == null || __IS_CONFIG__ == undefined || __IS_CONFIG__ == ""){
			__WEIXIN__.config(__SETTING__.weixinConfig);
			//标记已经加载了微信配置信息
			window.__WEIXIN_SHARE__ = true;
		}
	};
	
	//显示向导的内容,并绑定关闭的事件
	this.showWizardDialog = function(tempWizardHtml){
		//向导HTML代码添加到目标控件中，这里使用的jquery的查找方式
		if(__SETTING__.wizardHTMLWidget !=null && __SETTING__.wizardHTMLWidget != "" && __SETTING__.wizardHTMLWidget != undefined){
			//alert("wizardHTMLWidget OK");
			__SETTING__.shareData.success = __SETTING__.shareWeibo;
			__WEIXIN__.onMenuShareWeibo(__SETTING__.shareData);
			$(__SETTING__.wizardHTMLWidget).html(tempWizardHtml);
		}else{
			//alert("wizardHTMLWidget no OK");
			$("body").append(tempWizardHtml);
		}
		
		//给弹出的提示代码添加隐藏的事件
		$("#_WEIXIN_SHARE_").on("click",function(){
			//alert("_WEIXIN_SHARE_ onclick");
			that.hiddenTips();
		});
	};
	
	//分享到不同区域的事件
	this.shareAction = function(){
		//分享到“朋友圈”
		if(__SETTING__.shareTimeline !=null && __SETTING__.shareTimeline != "" && __SETTING__.shareTimeline != undefined){
			__SETTING__.shareData.success = __SETTING__.shareTimeline;
			__WEIXIN__.onMenuShareTimeline(__SETTING__.shareData);
		}
		
		//分享到“分享给朋友”
		if(__SETTING__.shareAppMessage !=null && __SETTING__.shareAppMessage != "" && __SETTING__.shareAppMessage != undefined){
			__SETTING__.shareData.success = __SETTING__.shareAppMessage;
			__WEIXIN__.onMenuShareAppMessage(__SETTING__.shareData);
		}
		
		//分享到“分享到QQ”		
		if(__SETTING__.shareQQ !=null && __SETTING__.shareQQ != "" && __SETTING__.shareQQ != undefined){
			__SETTING__.shareData.success = __SETTING__.shareQQ;
			__WEIXIN__.onMenuShareQQ(__SETTING__.shareData);
		}
		
		//分享到“分享到腾讯微博”
		if(__SETTING__.shareWeibo !=null && __SETTING__.shareWeibo != "" && __SETTING__.shareWeibo != undefined){
			__SETTING__.shareData.success = __SETTING__.shareWeibo;
			__WEIXIN__.onMenuShareWeibo(__SETTING__.shareData);
		}
		
		//分享到“分享到QQ空间”
		if(__SETTING__.shareQZone !=null && __SETTING__.shareQZone != "" && __SETTING__.shareQZone != undefined){
			__SETTING__.shareData.success = __SETTING__.shareQZone;
			__WEIXIN__.onMenuShareQZone(__SETTING__.shareData);
		}
		
		//如果全部都没有配置，则默认使用默认的方法
		if(__SETTING__.shareQZone ==false && __SETTING__.shareWeibo ==false && __SETTING__.shareQQ ==false && __SETTING__.shareAppMessage ==false && __SETTING__.shareTimeline ==false){
			__WEIXIN__.onMenuShareQZone(__SETTING__.shareData);
		}
	};
	
	//初始化方法
	function init(){
		//注册配置信息
		that.configWXInfo();
		
		//注册成功执行的逻辑方法
		__WEIXIN__.ready(function(){
			//判断当前客户端版本是否支持指定JS接口
			__WEIXIN__.checkJsApi(__SETTING__.checkJsApi);
			
			//是否显示分享向导
			if(__SETTING__.isShowWizard){
				//根据设备获取不同的wizardHTML
				var tempWizardHtml = that.getWizardHtml();
				//显示向导的内容,并绑定关闭的事件
				that.showWizardDialog(tempWizardHtml);
			}
			
			//分享到不同区域的事件
			that.shareAction();
		});
		
		//注册失败的提示信息
		__WEIXIN__.error(function(res){
			console.dir(res);
		});
	}
	//执行初始化防范
	init();
}


