// 封装一个防抖函数
export function debounce(func,delay) {
  let timer = null;
  return function (...args){
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this,args);
    },delay);
  }
}

// 封装一个时间戳格式化函数
// 参数：一个是时间戳，一个是格式化样式
export function formatDate(date,fmt){
  // 1.获取年份
  /* +：匹配1~n个
     *：匹配0~n个
     ?：匹配0或1个
     * */
  if (/(y+)/.test(fmt)) { // test检测fmt里是否有符合正则表达式的字符，返回布尔值
   // repalece：替换，第一个参数被替换的值，第二个是替换值
   /* $1表示第一个子匹配,子匹配以正则表达式中的括号为分割
      const reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
      reg.exec('2019-10-08')

      console.log(RegExp.$1)  // 2019
      console.log(RegExp.$2)  // 10
      console.log(RegExp.$3)  // 08
    */
    // getFullYear后面加''是快速转字符串的方式
    // substr：分割字符串，第一个参数是起始位(必须)，第二个参数是分割个数(没填就是到末尾)，
    // 这里根据传入的fmt中y的个数来截取年份的位数，然后替换掉fmt中的y，传入yyyy，返回四位数年份，传入yy返回两位数年份
   fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2.获取除年份外的时间
  let o = {
   'M+': date.getMonth() + 1, // Date中月份从0开始
   'd+': date.getDate(), // getDate是日期，getDay是星期
   'h+': date.getHours(),
   'm+': date.getMinutes(),
   's+': date.getSeconds()
  };

  // 遍历o中的属性名
  for (let k in o) {
    // 如果fmt中能匹配到k属性名
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''; // 将k对应的属性值变成字符串
      // 替换掉fmt中符合规则的字符，如果fmt中的符合规则字符串长度为1，则直接返回str值，否则进行前面补0处理
      // 例如，传入的fmt中是'M',则只返回一位数月份，如果是'MM',则返回两位数的月份
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }

  return fmt;
}
 // 给月日时分秒前面补个0
 function padLeftZero(str){
  // 传入3，变成003，截取索引值1开始到结尾，返回03
  // 传入11，变成0011，截取索引值2开始到结尾，返回11
  return ('00' + str).substr(str.length);
 }
