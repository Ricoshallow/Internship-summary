/**
 * a simple EventBus use Observer Pattern, so the EventBus is like a subject while fns are like obsever
 */

class EventBus {
    constructor(){
        this._event = new Map()
    }
    // listen obsever
    on(event, obsever){
        let curEvent = this._event.get(event)
        if (!curEvent){
            this._event.set(event, [obsever])
        } else {
            curEvent.push(obsever)
        }
    }
    // remove listener
    off(event, obsever){
        let curEvent = this._event.get(event)
        let index = curEvent.indexOf(obsever)
        curEvent.splice(index, 1)
    }
    // emit obsever
    emit(event, ...arg){
        let curEvent = this._event.get(event)
        for (let obsever of curEvent) {
            obsever.call(this, arg)
        }

    }
}


const fn1 = function(...parame){
    console.log(`I am fn1 ${parame}`);
}
const fn2 = function(...parame){
    console.log(`I am fn2 ${parame}`);
}
const fn3 = function(...parame){
    console.log(`I am fn3 ${parame}`);
}
const fn4 = function(...parame){
    console.log(`I am fn4 ${parame}`);
}
const eventBus = new EventBus()

// test ---------------------------------------- test

eventBus.on('event1',fn1)
eventBus.on('event1',fn2)
eventBus.on('event1',fn3)
eventBus.on('event2',fn4)
eventBus.emit('event1','first emit')
console.log("--------------");
eventBus.emit('event2', 'first emit')
console.log("--------------'\n--------------");
eventBus.off('event1',fn2)
eventBus.on('event2',fn2)
eventBus.emit('event1','second emit')
console.log("--------------");
eventBus.emit('event2','second emit')
