import * as mathjs from "mathjs"


var math=mathjs;

/*精度计算加法*/
math.addF=function (num1,num2) {
    return mathjs.format(mathjs.chain(mathjs.bignumber(num1)).add(mathjs.bignumber(num2)).done());
}
/*精度计算减法*/
math.subtractF=function (num1,num2) {
    return mathjs.format(mathjs.chain(mathjs.bignumber(num1)).subtract(mathjs.bignumber(num2)).done());

}
/*精度计算乘法*/
math.multiplyF=function (num1,num2) {
    return mathjs.format(mathjs.chain(mathjs.bignumber(num1)).multiply(mathjs.bignumber(num2)).done());
}
/*精度计算除法*/
math.divideF=function (num1,num2) {
    return mathjs.format(mathjs.chain(mathjs.bignumber(num1)).divide(mathjs.bignumber(num2)).done());
}

export default math