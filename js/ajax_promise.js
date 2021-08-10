function sendAjax(){
    return new Promise((resolve, reject)=>{
        var xhr = new XMLHttpRequest()

        xhr.open('GET','https://api.muxiaoguo.cn/api/dujitang')

        xhr.send()

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                document.write(xhr.response)
                resolve(xhr.response)
            }
        }
    })
    
}

async function main(){
    let res = await sendAjax()
    console.log(res);
}

main()
