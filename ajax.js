// 原始封装1/
function ajax(type, URL, param, dataType, callback, async) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    };
    if (type == "get") {
        if (param && param != "") {
            URL += "?" + param;
        }
    };
    xhr.open(type, URL, async);
    if (type = "get") {
        xhr.send(null);
    } else if (type == "post") {
        xhr.setRequerstHeadrt("content-type", "applicathion/x-www-form-urlencoded");
        xhr.send(param);
    }

    if (async) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var resoult = null;
                    if (dataType == "JSON") {
                        resoult = xhr.responseText;
                        resoult = JSON.parse(resoult);
                    } else if (dataType == "XML") {
                        resoult = xhr.responseXML;
                    } else {
                        resoult = xhr.responseText;
                    }
                    if (callback) {
                        callback(resoult);
                    }
                }
            }
        }
    } else {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var resoult = null;
                if (dataType == "JSON") {
                    resoult = xhr.responseText;
                    resoult = JSON.parse(resoult);
                } else if (dataType == "XML") {
                    resoult = xhr.responseXML;
                } else {
                    resoult = xhr.responseText;
                }
                if (callback) {
                    callback(resoult);
                }
            }
        }
    }
}

// 优化之后
function ajax2(obj) {
    var defaults = {
        type: "",
        url: "#",
        dataType: "json",
        // 参数数据
        data: {},
        async: true,
        success: function (resoult) {
            console.log(resoult);
        }
    };
    for (var key in obj) {
        defaults[key] = obj[key];
    };
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    };
    // 得到params
    // data：{
    //     uname:"zhangsan",
    //     age:"11"
    // } 
    // uname=zhangsan&age=11
    var params = "";
    for (var arrt in defaults.data) {
        params += arrt + "=" + defaults.data[arrt] + "&";
    }
    if (params) {
        params = params.substring(0, params.length - 1);
    }
    if (defaults.type == "get") {
        defaults.url += "?" + params;
    }
    xhr.open(defaults.type, defaults.url, defaults.async);

    if (defaults.type == "get") {
        xhr.send(null);
    } else if (defaults.type == "post") {
        xhr.setRequestHeader("content-type", "applicathion/x-www-form-urlencoded");
        xhr.send(params);
    }
    if (defaults.async) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var resoult = null;
                    if (defaults.dataType == "JSON") {
                        resoult = xhr.responseText;
                        resoult = JSON.parse(resoult);
                    } else if (defaults.dataType == "XML") {
                        resoult = xhr.responseXML;
                    } else {
                        resoult = xhr.responseText;
                    }
                    defaults.success(resoult);
                }
            }
        }
    } else {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var resoult = null;
                    if (defaults.dataType == "JSON") {
                        resoult = xhr.responseText;
                        resoult = JSON.parse(resoult);
                    } else if (defaults.dataType == "XML") {
                        resoult = xhr.responseXML;
                    } else {
                        resoult = xhr.responseText;
                    }
                    defaults.success(resoult);
                }
            }
        }
    }

}
