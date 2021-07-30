/**vue双向绑定原理
 * 数据劫持结合发布者-订阅者模式
 * 1.实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。
 * 2.实现一个订阅者Watcher，每一个Watcher都绑定一个更新函数，watcher可以收到属性的变化通知并执行相应的函数，从而更新视图。
 * 3.实现一个解析器Compile，可以扫描和解析每个节点的相关指令（v-model，v-on等指令），如果节点存在v-model，v-on等指令，则解析器Compile初始化这类节点的模板数据，
 *   使之可以显示在视图上，然后初始化相应的订阅者（Watcher）。
 */


// Observer是一个数据监听器，其实现核心方法就是Object.defineProperty( )。
// 如果要对所有属性都进行监听的话，那么可以通过递归方法遍历所有属性值，并对其进行Object.defineProperty()处理 

function Observer(data) {
    this.data = data
    this.walk(data)
}
Observer.prototype = {
    walk: function(data) {
        var self = this
        Object.keys(data).forEach(function(key){
            self.defineReactive(data,key,data[key])
        })
    },
    defineReactive: function(data,key,val){
        var dep = new Dep()
        var childObj = observe(val)
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable: true,
            // 当获取值时触发的函数
            get: function getter(){
                if (Dep.target){
                    dep.addSub(Dep.target)
                }
                return val
            },

            // 当设置值时触发的函数，设置的值通过参数拿到
            set: function setter(newVal){
                if (newVal === val){
                    return
                }
                val = newVal
                childObj = observe(newVal)
                dep.notify()
            }
        })
    }
}

function observe(value,vm) {
    if (!value || typeof value !== 'object'){
        return
    }
    return new Observer(value)
}


// Dep主要负责收集订阅者，然后在属性变化的时候执行对应订阅者的更新函数
function Dep() {
    this.subs = []
}
Dep.prototype = {
    addSub: function(sub){
        this.subs.push(sub)
    },
    notify: function() {
        this.subs.forEach(function(sub){
            sub.update()
        })
    }
}
Dep.target = null


// Watcher就是一个订阅者，用于将Observer发来的update消息处理，执行Watcher绑定的更新函数
 
function Wacther(vm ,exp, cb){
    this.cb = cb
    this.vm = vm
    this.exp = exp
    this.value = this.get()
}
Wacther.prototype = {
    update: function(){
        this.run()
    },
    run: function(){
        var value = this.vm.data[this.exp]
        var oldVal = this.value
        if (value !== oldVal){
            this.value = value
            this.cb.call(this.vm, value, oldVal)
        }
    },
    get: function(){
        Dep.target = this
        // 会调用监听器中Object.defineProperty中的get函数，从而将当前watcher添加到订阅器dep中
        var value = this.vm.data[this.exp]
        Dep.target = null
        return value
    }
}


// Compile主要的作用是把new SelfVue 绑定的dom节点，（也就是el标签绑定的id）遍历该节点的所有子节点，找出其中所有的v-指令和" {{}} ".

// while(firstChild = el.firstChild)
// 这个语句进行了2个操作：
// 执行赋值操作firstChild = el.firstChild
// 执行while(firstChild)，while是条件为真的情况下才执行，也就是必须el.firstChild有值的情况下才执行
// appendChild() 方法可以从一个元素向另一个元素中移动元素。
function Compile(el) {
    this.$el = this.isElementNode(el) ? el : document.querySelector(el)
    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el)
        this.init()
        this.$el.appendChild(this.$fragment)
    }
}
Compile.prototype = {
    init: function(){
        this.compileElement(this.$fragment)
    },
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(), child
        while (child = el.firstChild) {
            fragment.appendChild(child)
        }
        return fragment
    },
    compileElement: function(el) {
        var childNodes = el.childNodes, me = this;
        [].slice.call(childNodes).forEach(function(node){
            var text = node.textContent
            var reg = /\{\{(.*)\}\}/
            if (me.isElementNode(node)){
                me.compile(node)
            }else if (me.isTextNode(node)&& reg.test(text)){
                me.compileText(node,RegExp.$1)
            }
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node)
            }
        })
    },
    compile: function(node) {
        var nodeAttrs = node.attributes, me = this;
        [].slice.call(nodeAttrs).forEach(function(attr) {
            var arrtName = arrt.arrtName
            if(me.isDirective(attrName)) {
                var exp =  attr.value
                var dir = arrtName.subString(2)
                if (me.isEventDiretive(dir)){
                    compileUtil.eventHandler(node, me.$vm, exp, dir)
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp)
                }
            }
        })
    }
}
// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    // ...省略
    bind: function(node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];
        // 第一次初始化视图
        updaterFn && updaterFn(node, vm[exp]);
        // 实例化订阅者，此操作会在对应的属性消息订阅器中添加了该订阅者watcher
        new Watcher(vm, exp, function(value, oldValue) {
        	// 一旦属性值有变化，会收到通知执行此更新函数，更新视图
            updaterFn && updaterFn(node, value, oldValue);
        });
    }
};

// 更新函数
var updater = {
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
    // ...省略
};

