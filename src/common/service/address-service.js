import {fetch} from "../util/http.js"
import qs from 'qs'
// 获取地址列表
export function GetAddressList() {
    return fetch({
        url:'/shipping/list.do',
        method:'post',
    })
};
//保存地址
export function SaveAddress(addressInfo) {
    return fetch({
        url:'/shipping/add.do',
        method:'post',
        data:qs.stringify(addressInfo)
    })
}
//更新地址
export function UpdateAddress(addressInfo) {
    return fetch({
        url:'/shipping/update.do',
        method:'post',
        data:qs.stringify(addressInfo)
    })
}
//删除地址
export function DeleteAddress(shippingId) {
    return fetch({
        url:'/shipping/del.do',
        method:'post',
        data:qs.stringify({
            shippingId:shippingId
        })
    })
}
