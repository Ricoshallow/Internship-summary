# ES6

**日常前端代码开发中，有哪些值得用ES6去改进的编程优化或者规范？**
- 常用箭头函数来取代var self = this;的做法。
- 常用let取代var命令。
- 常用数组/对象的结构赋值来命名变量，结构更清晰，语义更明确，可读性更好。
- 在长字符串多变量组合场合，用模板字符串来取代字符串累加，能取得更好地效果和阅读体验。
- 用Class类取代传统的构造函数，来生成实例化对象。
- 在大型应用开发中，要保持module模块化开发思维，分清模块之间的关系，常用import、export方法。

## String字符串

- 新增模板字符串 [templateString.js](./js/templateString.js)
- 原型上新增方法 
    - includes() 判断一个字符串是否包含一个指定的值 ```string.incudes('#)```
    - startsWith() 判断当前字符串是否以另外一个给定的子字符串开头 ```string.startsWith('#)```

    
##  Array数组

- 数组结构赋值： ```let [a,b,c] = [1,2,3]```
- 扩展运算符：  可以轻松的实现数组和松散序列的相互转化
- 原型上新增方法
    - includes()
    - flat()：扁平化嵌套数组 ```arr.flat(Infinity)```
    - find：返回数组中满足提供的测试函数的第一个元素的值 ```arr.find(element => element > 10)```

##  Number数字
- Math.trunc()：会将数字的小数部分去掉，只保留整数部分

##  Object对象
- 对象属性变量式声明
```javascript
let [apple, orange] = ['red appe', 'yellow orange'];
let myFruits = {apple, orange};    // let myFruits = {apple: 'red appe', orange: 'yellow orange'};
```
- 对象的解构赋值：
```javascript
let {orange,...others} = {apple: 'red apple', orange: 'yellow orange',grape: 'purple grape'};
console.log(orange)//"yellow orange"
console.log(others)//{apple: 'red apple',grape: 'purple grape'}
```
- super 关键字: super关键字总是指向当前函数所在对象的原型对象
- 原型上新增方法：

    - Object.is()：做两个目标对象的相等比较，用来完善'==='方法

    ```javascript
    Object.is(+0, -0) // false
    Object.is(NaN, NaN) // true
    ```
    - Object.assign()： ```Object.assign(target, source1, source2);```
    - Object.keys()，Object.values()，Object.entries()：用来获取对象的所有键、所有值和所有键值对数组
    ```javascript
    // simple array
        var arr = ['a', 'b', 'c'];
        console.log(Object.keys(arr)); // console: ['0', '1', '2'] 

    // array like object
        var obj = { 0: 'a', 1: 'b', 2: 'c' };
        console.log(Object.keys(obj)); // console: ['0', '1', '2']
    ```
## Function函数

- 箭头函数：箭头函数内的this指向的是函数定义时所在的对象，而不是函数执行时所在的对象,特点：

    （1）箭头函数没有自己的this对象，会“隐绑定到上层作用域”。

    （2）不可以当作构造函数，也就是说，不可以对箭头函数使用new命令，否则会抛出一个错误。

    （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

    （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
- 函数默认赋值 
    ```javascript
    function log(x, y = 'World') {
        console.log(x, y);
    }
    ```
## Set and Map

- Set:

    ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值.
    ```javascript
    const s = new Set();

    [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

    for (let i of s) {
      console.log(i);
    }
    // 2 3 5 4

    ```
- Map:

    ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
    ```javascript
    const m = new Map();
    const o = {p: 'Hello World'};
    
    m.set(o, 'content')
    m.get(o) // "content"
    
    m.has(o) // true
    m.delete(o) // true
    m.has(o) // false
    ```

## iterator

- 概念：

    迭代器是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作。
    数组上的iterator: ```Array.prototype[Symbol.iterator]```

- 工作原理

    1. 创建一个指针对象，指向当前数据结构的起始位置

    2. 第一次调用对象的next方法，指针自动指向数据结构的第一个成员

    3. 接下来不断调用next方法，直到指向最后一个成员

    4. 每次调用next方法返回一个包含value和done属性的对象

- 自定义遍历对象 ```for (var item of obj)```


## Generator函数

- 概念：

    ```Generator``` 函数是一个状态机，封装了多个内部状态。```Generator``` 函数返回的是遍历器（iterator）对象，只有调用next方法才会遍历下一个内部状态，所以```Generator```是一种可以暂停执行的函数。```yield```表达式就是暂停标志。

- 运行原理：

    遍历器对象的next方法的运行逻辑如下:

    1. 遇到```yield```表达式，就暂停执行后面的操作，并将紧跟在```yield```后面的那个表达式的值，作为返回的对象的value属性值。

    2. 下一次调用next方法时，再继续往下执行，直到遇到下一个```yield```表达式。

    3. 如果没有再遇到新的```yield```表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。

    4. 如果该函数没有return语句，则返回的对象的value属性值为undefined。

- next方法的参数：

    ```yield```表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。



## Promise
 - 概念：

    Promise 是ES6引入的一种新的异步编程解决方案，有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。

- 用法：

    Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject，他们是两个函数，用来改变Promise对象的状态。Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
    ```javascript
    const p = new Promise((resove, reject)=>{
        setTimeout(()=>{
            // 改变状态为“resolved”
            resove('data')
            // 改变状态为“rejected”
            // reject('some error')
        })
    })

    p.then(function(value){
        // success
    },function(reason){
        // failure
    })
    
    ```
- Promise.prototype.then()

    为 Promise 实例添加状态改变时的回调函数。返回一个新的Promise实例
    


- Promise.resolve() and Promise.reject()    

    将现有对象转换为Promise对象