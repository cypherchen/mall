import {request} from "./request";

// 请求分类页所有数据
export function getCategory(){
   return request({
     url: '/category'
   })
}

// 请求子分类的数据
export function getSubCategory(maitKey){
   return request({
     url: '/subcategory',
     params: {
       maitKey // 分类的子分类数据id
     }
   })
}

