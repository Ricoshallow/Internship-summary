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
