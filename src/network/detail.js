import {request} from "./request";

// 导出一个请求商品详情页数据的函数
export function getDetail(iid){
   return request({
     url: '/detail',
     params: {
       iid
     }
   })
}

// 封装一个请求推荐商品的函数
export function getRecommend(){
  return request({
    url: '/recommend'
  })
}

// 导出一个封装商品详情页信息数据的类
export class Goods {
  constructor(itemInfo,columns,services) {
    this.columns = columns; // 销量收藏信息
    this.services = services; // 快递信息
    this.title = itemInfo.title; // 商品标题
    this.desc = itemInfo.desc; // 商品描述
    this.newPrice = itemInfo.price; // 商品价格
    this.oldPrice = itemInfo.oldPrice; // 商品原价
    this.discount = itemInfo.discountDesc; // 商品折扣
    this.realPrice = itemInfo.lowNowPrice; // 商品真实价格(价格区间的最低价)
  }
}

// 导出一个封装店铺信息数据的类
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name; // 店铺名字
    // this.fans = shopInfo.cFans; //
    this.sells = shopInfo.cSells; // 店铺总销量
    this.score = shopInfo.score; // 店铺评分
    this.goodsCount = shopInfo.cGoods; // 店铺商品数量
  }
}

// 导出一个商品参数的类
export class GoodsParam {
  constructor(info,rule) {
    this.image = info.image? info.image[0] : ''; // image有些商品没有
    this.infos = info.set; // 商品其他信息
    this.sizes = rule.tables[0]; // 商品尺码
  }
}


