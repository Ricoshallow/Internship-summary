// 设计一个简单的红绿灯策略，红灯亮为console.log(“red”)，黄灯亮为console.log(“yellow”), 绿灯亮为console.log(“green”)，
// 要求按照红3s-黄1s-绿3s顺序不断循环展示


let redLight = document.querySelector('#red')
let yellowLight = document.querySelector('#yellow')
let greenLight = document.querySelector('#green')

function red() {
    console.log('red');
    redLight.style.backgroundColor = "red"
    return redLight
}
function yellow() {
    console.log('yellow');
    yellowLight.style.backgroundColor = "yellow"
    return yellowLight
}
function green() {
    console.log('green');
    greenLight.style.backgroundColor = "green"
    return greenLight
}

function extinguish(light){
    light.style.backgroundColor = "gray"
}

// 回调实现
// function trafficLight(){
//     setTimeout(function(){
//         red()
//         setTimeout(function(){
//             extinguish(redLight)
//             yellow()
//             setTimeout(function(){
//                 extinguish(yellowLight)
//                 green()
//                 setTimeout(function(){
//                     extinguish(greenLight)
//                     trafficLight()
//                 },3000)
//             },1000)
//         },3000)
//     },0)
// }
// trafficLight()



// promise实现
// function trafficLight(){
//     let p = new Promise((resolve, reject)=>{
//         setTimeout(function(){
//             red()
//             resolve()
//         },0)
//     })
//     p.then((value)=>{
//         return new Promise((resolve, reject)=>{
//             setTimeout(function(){
//                 extinguish(redLight)
//                 yellow()
//                 resolve()
//             },3000)            
//         })

//     }).then((value)=>{
//         return new Promise((resolve, reject)=>{
//             setTimeout(function(){
//                 extinguish(yellowLight)
//                 green()
//                 resolve()
//             },1000)            
//         })
//     }).then((value)=>{
//         setTimeout(function(){
//             extinguish(greenLight)
//             trafficLight()
//         },3000)
//     })
// }

// trafficLight()



// 简化封装promise
function trafficLight(color, timer, lastLight){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if (lastLight){
                extinguish(lastLight)
            }
            resolve(color())
        },timer)
    })
}
// function main(){
//     trafficLight(red,0).then(function(value){
        
//         return trafficLight(yellow,3000,redLight)
//     }).then(function(value){
        
//         return trafficLight(green,1000,yellowLight)
//     }).then(function(value){
        
//         setTimeout(()=>{
//             extinguish(greenLight)
//             main()
//         },3000)
//     })
// }
// main()



// async await 实现
async function index(){
    while(1){
        await trafficLight(red,3000,greenLight)
        
        await trafficLight(yellow,3000,redLight)
        
        await trafficLight(green,1000,yellowLight)
        
    }
}
index()