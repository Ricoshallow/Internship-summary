const p = new Promise((resove, reject)=>{
    setTimeout(()=>{
        // console.log('get dataset');
        // resove('data')
        reject('some error')
    })
})

const res = p.then(function(value){
    console.log(p);
    console.log(value);
    return new Promise((res,rej)=>{
        // res('fullfield')
        rej('error')
    })
},function(err){
    console.log(err);
    return 'err soluted'
})

const resres =  res.then(function(value){
    console.log(value);   
},function(err){
    console.log(res);
    console.log(err);
})
console.log(res);
console.log(resres);