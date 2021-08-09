// 异步依次获取用户数据，订单数据，商品数据。用generator函数解决
function getUser() {
    setTimeout(()=>{
        let data = 'userList'
        iterator.next(data)
    },1000)
}
function getOrder() {
    setTimeout(()=>{
        let data = 'orderList'
        iterator.next(data)
    },1000)
}
function getGoods() {
    setTimeout(()=>{
        let data = 'goodsList'
        iterator.next(data)
    },1000)
}

function * gen(){
    let user = yield getUser()
    console.log(user);
    let order = yield getOrder()
    console.log(order);
    let goods = yield getGoods()
    console.log(goods);
}

let iterator = gen()
// iterator.next()
console.log(iterator.next());
