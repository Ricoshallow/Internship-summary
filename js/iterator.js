obj = {
    name: "best team",
    member: [
        'lebron James',
        'kobe Brant',
        'Stephen Curry',
        'Shaquille ONeal',
        'Kevin Durant'
    ],
    [Symbol.iterator](){
        let _this = this
        let index =0
        //创建一个指针对象
        return {
            // 对象中的next方法
            next(){
                // 每次调用next方法返回一个包含value和done属性的对象
                if (index<_this.member.length){
                    index++
                    return  {value: _this.member[index],done: false}
                } else {
                    return {value: undefined, done: true}
                }
                
            }
        }
        
        
    }
}

for (let item of obj){
    console.log(item);
}