// 跨域ajax封装
// 调用
myajax({
    url:"https://suggest.taobao.com/sug",
    data:{wd:keywordsValue},
    jsonp:"cb",
    jsonpCallback:"hehe2",
    success:function(data){
    }
});


function myajax(obj){
    var defaults = {
        type: "get",
        url: "#",
        // 参数数据
        data: {},
        success: function (data) {
        },
        jsonp:"callback",
        jsonpCallback:"hehe"
    };
    for (var key in obj) {
        defaults[key] = obj[key];
    };
    var params = "";
    for (var arrt in defaults.data) {
        params += arrt + "=" + defaults.data[arrt] + "&";
    }
    if (params) {
        params = params.substring(0, params.length - 1);
        defaults.url="?"+params;
    };
    defaults.url+="&"+defaults.jsonp+"="+defaults.jsonpCallback;

    var script=document.createElement("script");
    script.src=defaults.url;

    window[defaults.jsonpCallback]=function(data){
        defaults.success(data);
    }
    var head=document.querySelector("head");
    head.appendChild(script);
}
