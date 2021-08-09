## 正则表达式
- 匹配大写字母 ```const upperRegex = /[A-Z]/```
- 匹配小写字母 ```const lowerRegex = /[a-z]/```
- 匹配数字 ```const digitsRegex = /\d/```
- 匹配非数字 ```const nonDigitsRegex = /\D/```
- 匹配字母和数字 ```const shortHand = /\w/```
- 匹配除字母和数字以外的字符 ```const shortHand = /\W/```

## char字符与ASCII码值的转换

- 'A': 65 &n 'a':97

- char to ASCII ```str.charCodeAt()```

- ASCII to char ```String.fromCharCode(num)```

## 除法

- 取整 ```parseInt(num/6)```
- 向上取整 ```Math.ceil(num/6)```
- 向下取整 ```Math.floor(num/6)```
- 四舍五入 ```Math.round(num/6)```
- 取余 ```num%6```


## 创建二维数组


```javascript
var m =5
var n=6

var arr = new Array(m)

// for (var i=0;i<m;i++){
//     arr[i] = new Array(n)
// }
// for (var k=0;k<m;k++){
//     for (var j=0;j<n;j++){
//         arr[k][j] = 0
//     }
// }

//创建元素全为零的二维数组
var arr = Array(m).fill(0).map(x => Array(n).fill(0))
arr[2][4] = 8

```