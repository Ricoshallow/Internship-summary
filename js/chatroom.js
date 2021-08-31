/**
 * A simple chatroom use Mediator Pattern
 */

class ChatRoom {
    constructor(name) {
        this.name = name
        this.members = []
    }
    addMember(member) {
        this.members.push(member)
        member.chatRoom = this // ** when a Member join a chatRoom, bind this charRoom in Member-self
    }
    passMessage(message, fromMember, toMember) {
        toMember.recieveMessage(message, fromMember) // chatRoom is like a mediator transform the message
    }
}


class Member {
    constructor(name) {
        this.name = name
        this.chatRoom = null // ** indicate which chatRoom the Member is in
    }
    sendMessage(message, toMember) {
        this.chatRoom.passMessage(message, this, toMember) // a Member can send message to someone else in the same chatRoom
    }
    recieveMessage(message, fromMember) {
        console.log(`${this.name} recieve ${fromMember.name}'s message : ${message}`) // a Member can recieve message form someone else by chatRoom
    }
}

// test---------------------------------------------------------------------------------test

const rico = new Member('rico')
const carol = new Member('carol')
const jack = new Member('jack')
const rose = new Member('rose')
const chatRoom = new ChatRoom('family')
chatRoom.addMember(rico)
chatRoom.addMember(carol)
chatRoom.addMember(jack)
chatRoom.addMember(rose)

jack.sendMessage('i love you rose', rose)
jack.sendMessage('Hi rico! i am jack', rico)
jack.sendMessage('Hi carol! i am jack', carol)
rico.sendMessage('i love you carol forever', carol)