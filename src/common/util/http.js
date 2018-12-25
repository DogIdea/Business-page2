import axios from 'axios';

export function fetch(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            timeout:30*1000,
            responseType: "json",
            headers: { 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        });
        instance(options).then((res)=>{
            resolve(res)
        }).catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}
export function validate(value,type){
    let _value = value;
    if('require' === type) {
        return !! _value;
    }
    if('phone' === type) {
        return /^1\d{10}$/.test(_value);
    }
    if('email' === type) {
        return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(_value);
    }
}