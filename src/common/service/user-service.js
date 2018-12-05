import {fetch} from "../util/http.js"
import qs from 'qs'
// 登录
export function UserLogin (userInfo) {
    return fetch({
        url:'/user/login.do',
        method:'post',
        data: qs.stringify(userInfo)
    })
};
// 验证
export function GetUserInfo () {
    return fetch({
        url:'/user/get_information.do',
        method:'post'
    })
}
// 登出
export function UserLogout () {
    return fetch({
        url:'/user/logout.do',
        method:'post'
    })
}
// 用户名验证
export function CheckUsername(username) {
    return fetch({
        url:'/user/check_valid.do',
        data: qs.stringify({
            type: 'username',
            str: username
        }),
        method:'post'
    })
}
//用户注册
export function Register(userInfo) {
    return fetch({
        url:'/user/register.do',
        data: qs.stringify(userInfo),
        method:'post'
    })
}
//忘记密码获取问题
export function GetQuestion(username) {
    return fetch({
        url:'/user/forget_get_question.do',
        data: qs.stringify({
            username : username
        }),
        method:'post'
    })
}
//忘记密码更新密码
export function CheckAnswer(userInfo) {
    return fetch({
        url:'/user/forget_check_answer.do',
        data: qs.stringify(userInfo),
        method:'post'
    })
}
//重置密码
export function ResetPassWord(userInfo) {
    return fetch({
        url:'/user/forget_reset_password.do',
        data: qs.stringify(userInfo),
        method:'post'
    })
}