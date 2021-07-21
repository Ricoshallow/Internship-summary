const btn = document.querySelector('button')
var sendAjax = function(){
    console.log('发送请求中，请稍后...');
}
btn.addEventListener('click',debounce(sendAjax,2000))

//防抖: 触发事件后 n 秒后才执行函数，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
function debounce(fun,delay) {
    let timer
    return function (){
        let context = this
        let args = arguments
        console.log(timer);
        clearTimeout(timer)
        timer = setTimeout(function(){
            fun.apply(context,args)
        },delay)
    }
}





var changeBgc = function(){
    let r = Math.floor(Math.random()*255)
    let g = Math.floor(Math.random()*255)
    let b = Math.floor(Math.random()*255)
    document.body.style.backgroundColor = `rgb(${r},${g},${b})`
}

window.addEventListener('resize',throttle(changeBgc,1000))
// window.addEventListener('scroll',throttle2(changeBgc,1000))


// 节流: 指连续触发事件但是在 n 秒中只执行一次函数
function throttle (fun,timeInterval) {
    let timer
    return function() {
        let context = this
        let args = arguments
        if (timer){
            console.log(timer);
            return 
        }else{
            timer = setTimeout(function(){
                console.log(timer);
                fun.apply(context,args)
                timer = null
            },timeInterval)
        }   
    }
}

// 节流实现2： 时间戳
function throttle2 (fun,timeInterval) {
    let pre = 0
    return function (){
        let now = + new Date()
        if (now-pre>timeInterval){
            fun()
            pre = now
        }
        
    }
}
