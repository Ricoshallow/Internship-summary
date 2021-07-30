# CSS
###  **渐变背景**
- 线性渐变

    ```background-image: linear-gradient( 角度 , 颜色);```

    直线的方向由角度指定，或者在关键字 to 后面加上 top、bottom、right、left 中的某一个关键字或多个关键字，例如 to bottom left。

- 色标

    可以根据需求添加任意多个颜色。额外添加的颜色叫色标（color stop）。
    ```css
    background-image: linear-gradient(to right, black, white, black);
    ```

    还可以在颜色后面再加一个值，明确指明各色标的位置。
    ```css
    background-image: linear-gradient(to right, #E94E65, #15A892 20%, #A89215 80%, #1574A8);
    ```
###  **表格内容自动换行**

```css
    /**jsgrid表格内容自动换行 */
    /* 普通表格设置td */
    .jsgrid-cell { white-space: normal !important; height:auto; } 
```
<br>
<br>

# HTML

### **ifram**
```<ifram></ifram>```标签规定一个内联框架。一个内联框架被用来在当前 HTML 文档中嵌入另一个文档。
1. 基本属性

    ```html
    <iframe src="demo.html" height="300" width="500" name="demo" scrolling="auto" sandbox="allow-same-origin"></iframe>
    ```

    - src iframe页面地址，有同域跨域之分
    - height iframe高度
    - width iframe宽度
    - name iframe命名，可通过window.frames[xxx]被调用
    - scrolling iframe滚动模式
    - sandbox html5新特性，用于限制iframe的功能

2. 使用

    我们可以通过contentWindow和contentDocument两个API获取iframe的window对象和document对象。
    ```javascript
    let iframe = document.getElementById('demo');
    let iwindow = iframe.contentWindow; // 获取 iframe的window对象
    let idoc = iframe.contentDocument; // 获取iframe的document对象

    ```

3. 优缺点
    
    优点
    - 重载页面时不需要重载整个页面，只需要重载页面中的一个框架页(减少了数据的传输，加快了网页下载速度)
    - 主要应用于不需搜索引擎来搜索的页面
    - 方便制作导航栏

    缺点

    - 会产生很多页面，不容易管理
    - 多框架的页面会增加服务器的http请求
    - 浏览器的后退按钮无效（只能针对实现当前光标所在页面的前进与后退，无法实现frameset整个页面的前进与后退）

### HTML自定义标签
- 创建

    在标签里面 以” data- ”为前缀自定义属性
    ```javascript
    // 将改行数据对应的节点保存到自定义属性中
     {
        headerTemplate: function () {
            return "<a href='###' onclick='swapCheck()' >Select All</a>"
        },
        itemTemplate: function (_, item) {
            return $("<input>").attr("type", "checkbox").attr("name", "chkSelect").attr("id", "chkSelect").attr("value", item.jobId).attr("data-node",item.node);
        },
        align: "center",
        width: 50
    }
    ```
- 获取

    自定义属性对象Dataset

    ```javascript
    // 调用函数删除对应节点上的数据
    $('#btn_terminate').bind('click',function(){
        console.log($("#chkSelect:checked").length);
        // if no checked users
        if ($("#chkSelect:checked").length == 0){
            alert("please choose the job you want to terminate")
        }
        $.each($("#chkSelect:checked"), function (i, e) {
            // console.log('cancel...');
            
            // console.log(e.id,e.name,e.value,e.dataset.node);
            
            ctlApi.cancelJob(e.dataset.node, e.value, function (re) {
                // console.log('test...');
                // location.reload(true);
                bindGrid();
                
            });
        });
    })
    ```

### Diolag 标签
- show()
- showModal()
    ```javascript
    // 当该方法用于显示对话窗口时，用户不可以与页面的其他元素进行交互
    document.getElementById("myDialog").showModal();
    ```

<br>
<br>

# Plug-in and Frame

### **CodeMirror**


### **H-ui**

# Jquery
### jquery tmpl

hmtl:
```html
    <script id="userTemplate" type="text/x-jquery-tmpl">
        <li class="list-group-item"><input id="chkUser" type="checkbox" {{if selected==1}} checked {{/if}}value="${userId}"> ${userId}</li>
    </script>
```

js:
```javascript
    ctlApi.getExistsUserByGroupId(groupId, function (re) {
        // console.log("re", re);
        $("#userTemplate").tmpl(re).appendTo("#memberGrid");
    });
```
### jquery tab栏切换
html: 
```html
<body>
    <div class="wrapper">
        <ul class="tab">
            <li class="tab-item active">标题1♥</li>
            <li class="tab-item">标题2♥</li>
            <li class="tab-item">标题3♥</li>
            <li class="tab-item">标题4♥</li>
        </ul>
        <div class="products">
            <div class="main selected">
                <span class="a">1</span>
            </div>
            <div class="main">
                <span class="a">2</span>
            </div>
            <div class="main">
                <span class="a">3</span>
            </div>
            <div class="main">
                <span class="a">4</span>
            </div>
        </div>
    </div>

</body>

```

js: 
```javascript
    $(function () {
            $(".wrapper .tab-item").click(function () {
                $(this).addClass("active").siblings().removeClass("active");
                $(".products .main").eq($(this).index()).show().siblings().hide();
            })
        })

```

### jquery 全局搜索表格内容
js:
```javascript
    
    $(function () {
        $("#searchbox").keyup(function () {
            $("table tbody tr").hide()
            .filter(":contains('"+($(this).val())+"')").show();//filter和contains共同来实现了这个功能。
        })
    });
  
```

### jquery 添加删除元素解决对话框留存问题

**问题描述**：在利用对话框增加修改函数的业务中，点击按钮弹出的对话框在完成处理逻辑以后，对话框不会被清除和销毁，当我们再次点击按钮弹出对话框时，实际上会有两个对话框。这会导致提交按钮的重复提交（提交按钮绑定了同一个提交函数），造成混乱现象。

**解决方法**：
1. 在每次逻辑处理完后重载页面，页面被重置就能恢复到原本状态，但是频繁重载页面对用户不太友好。
2. 动态添加对话框，每次点击按钮时先清除上一个对话框，再进行当前逻辑处理。

```js

    var updatedialog = ` 
<dialog id="updateFuncViewDialog">
    <form method="dialog">
      <p>
          <label>Update function in DolphinDB Function View:</label>
        <div id="cm_container" class="panel panel-default" style="margin-bottom: 10px;min-height:150px;max-height:255px; overflow-y:auto">
            <textarea id="updateFuncView" cols="5" style="width:100%;"></textarea>
        </div>
          
      
    </p>
      <menu  class="text-center" style="padding-inline-start: 0px;">
        <button class="btn btn-sm btn-info" id="confirmUpdateBtn" value="default">Confirm</button>
        <button class="btn btn-sm btn-light" value="cancel">Cancel</button>
      </menu>
    </form>
</dialog>`

var btnUpdateFunctionView = function (funcName) {
    //移除元素
    $('body').remove("#updateFuncViewDialog")
    // prepend() - 在被选元素的开头插入内容
    $('body').prepend(updatedialog)
    console.log(funcName);
    updateFuncEditor = codeMirrorEditor($("#updateFuncView")[0], 900, 200);
    $("#updateFuncViewDialog")[0].showModal();
    for (var i = 0; i < allFunctionViews.length; i++) {
        var currFuncName = allFunctionViews[i]["name"];
        if (currFuncName === funcName) {
            updateFuncEditor.setValue(allFunctionViews[i]["body"]);
        }
    }

    $("#confirmUpdateBtn").bind("click", function (e) {
        console.log(e);
        e.stopPropagation()
        var updatedInput = updateFuncEditor.getValue();
        // console.log(updatedInput);
        var i = updatedInput.indexOf("def");
        var j = updatedInput.indexOf("(");
        if (i === -1 || j === -1) {
            alert("Please provide a valid function definition");
            return;
        }
        // new function name
        var newFuncName = updatedInput.substring(i + 3, j).trim();

        // drop and then add
        nodeApi.dropFunctionView(funcName);
        nodeApi.runSync(updatedInput);
        console.log(updatedInput);
        nodeApi.addFunctionView(newFuncName);
        getAllFuncViews();

    });
}
```