import {fetch} from "../util/http.js";
import qs from 'qs';
//获取购物车总数
export function GetCartCount () {
    return fetch({
        url:'/cart/get_cart_product_count.do',
        method:'post'
    })
};
//添加购物车
export function AddToCart (productInfo) {
    return fetch({
        url:'/cart/add.do',
        method:'post',
        data: qs.stringify(productInfo),
    })
};
//获取购物车列表包括总价
export function GetCartList () {
    return fetch({
        url:'/cart/list.do',
        method:'post'
    })
};
//获取购物车列表
export function SelectProduct (productId) {
    return fetch({
        url:'/cart/select.do',
        method:'post',
        data: qs.stringify({
          productId: productId
        })
    })
};
//删除购物车订单
export function UnselectProduct (productId) {
    return fetch({
        url:'/cart/un_select.do',
        method:'post',
        data: qs.stringify({
          productId: productId
        })
    })
};
//选择所有购物车信息
export function SelectAllProduct() {
    return fetch({
        url:'/cart/select_all.do',
        method:'post'
    })
};
//删除所有购物车信息
export function UnselectAllProduct() {
    return fetch({
        url:'/cart/un_select_all.do',
        method:'post'
    })
};
//更新购物车信息
export function UpdateProduct(productInfo) {
    return fetch({
        url:'/cart/update.do',
        method:'post',
        data: qs.stringify(productInfo)
    })
};
//删除购物车的商品
export function DeleteProduct(productIds) {
    return fetch({
        url:'/cart/delete_product.do',
        method:'post',
        data: qs.stringify({
          productIds: productIds
        })
    })
};