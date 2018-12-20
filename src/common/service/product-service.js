import {fetch} from "../util/http.js"
import qs from 'qs'
//产品搜索
export function GetProductList (listParam) {
    return fetch({
      url:'/product/list.do',
      method:'post',
      data: qs.stringify(listParam)
    })
}
//产品详情
export function GetProductDetail (productId) {
    return fetch({
      url:'/product/detail.do',
      method:'post',
      data: qs.stringify({
        productId: productId
      })
    })
}
//创建订单
export function CreateOrder (orderInfo){
    return fetch({
      url:'/order/create.do',
      method:'post',
      data: qs.stringify(orderInfo)
    })
}