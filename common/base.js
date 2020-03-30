
// 银行卡格式化为 1111 1111 1111 1111
var formatCard = function (value) {
    if (!isNaN(String(value).replace(/[ ]/g, "")) && (/^([1-9]{1})(\d{15}|\d{18})$/.test(String(value)))) {
        //四位数字一组，以空格分割
        return String(value).replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
    } else {
        return false;
    }
}

// 手机号格式化  122 **** 2222
var formatMobile = function (mobile) {
    if (!(/^1\d{10}/.test(String(mobile).trim()))) {
        return false;
    }
    // 122 2222 2222 
    var nMobile = String(mobile).trim().replace(/(^\d{3}|\d{4}\B)/g, "$1 ");
    return [nMobile.substr(0, 3), '****', nMobile.substr(-4, 4)].join(' ');
}

export default {
    formatCard,
    formatMobile
}
