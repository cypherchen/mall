import {request} from 'network/request'

// 导出一个ajax请求首页轮播图和推荐栏数据函数
export function getHomeMultidata(){
   return request({
     url: '/home/multidata'
   })
}

// 导出一个ajax请求首页商品数据函数,
// 两个参数一个是请求数据的类别，一个是请求数据的页数
export function getHomeGoods(type,page){
   return request({
     url: '/home/data',
     params: {
       type,
       page
     }
   })
}
