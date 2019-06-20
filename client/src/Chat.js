import React, {Component} from 'react';
import MessageList from './MessageList.js';
import SendMessageForm from './SendMessageForm.js'
import RoomList from './RoomList.js'
import './Chat.css';





class Chat extends React.Component {



    constructor() {
        super()
        this.state = {
            messages: [],
            text: '',
            roomIds: [],
            number: 0,
            room: null,
            PH: 0
        }

        this.sendMessage = this.sendMessage.bind(this)
        this.subscribeToRoom = this.subscribeToRoom.bind(this)
        this.loadChat = this.loadChat.bind(this)



    }

    componentDidMount() {
        // Load the feed contents

        this.retrieveRoomIds()
            .then(res => this.setState({
                // messages: res.postIds
                roomIds: res.roomIds

            }));


    }




    // need to retrieve messages
    retrieveMessages = async () => {
        let url = '/retrieve_messages?userId=' + this.props.myUserId + '&roomId=' + this.state.room;
        //console.log(url)
        const response = await fetch(url)
        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.messages)
        }


        return json;
    }


    retrievePH = async () => {
        let url = '/retrieve_pH?userId=' + this.props.myUserId;
        const response = await fetch(url)
        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.messages)
        }

        console.log("weoraofksdojaodsjo")
        return json;
    }

    retrieveRoomIds = async () => {
        let url = '/retrieve_roomIds?userId=' + this.props.myUserId;
        const response = await fetch(url)
        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.messages)
        }


        return json;
    }

    subscribeToRoom(roomId)
    {
        this.retrieveMessages()
            .then(res => this.setState({
                // messages: res.postIds
                messages: res.messages,
                number: res.number,
                room: roomId
            }));


    }

    sendMessage(text)
    {
        this.setState({text: text}, () => {
            this.postMessage(this.state.text)
            this.loadChat()
        });

    }


    postMessage(text)
    {
        //console.log(this.props.myUserId)
        //console.log(this.state.roomIds[0])
        //console.log(this.state.number)
        let chatmessageid = this.props.myUserId.toString() + this.state.room.toString() + (this.state.number+1).toString();
        this.addMessage(chatmessageid);
    }

    // Actually sending an API call to post comment to database
    addMessage = function(chatmessageid){
        this.postMsg(chatmessageid)
            .then(
                this.setState({message: ""})
            );
    }

    postMsg = async (chatmessageid) =>
    {
        let url = '/post_message';
        //console.log("============")
        //console.log(this.props.myUserId)
        //console.log(this.state.roomIds[0].sessionId)
        //console.log(this.state.number)
        //console.log(JSON.stringify({chatMessageId: chatmessageid, message: this.state.text, chatSessionId: this.state.roomIds[0].sessionId, userId: this.props.myUserId}))
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({chatMessageId: chatmessageid, message: this.state.text, chatSessionId: this.state.room, userId: this.props.myUserId})
            });

        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.message)
        }

        return json;
    }


    loadChat() {
        // Load the chat for this post
        this.retrieveMessages()
            .then(res => this.setState( {
                // messages: res.postIds
                messages: res.messages,
                number: res.number,
            }));

       // this.retrievePH()
       //     .then(res => this.setState( {
       //         // messages: res.postIds
       //         PH: res.PH,
       //     }));
    }




    render() {
        //if (this.state.roomIds[0] == undefined) {} else {console.log(this.state.roomIds[0].sessionId)}
        //            text: '',
        //roomIds: [],
         //   number: 0
        //console.log("============")
        console.log(this.state.roomIds)

        return (
        <div className="Chat">
            <h3>Double Click to Join Chat</h3>
            <RoomList rooms={this.state.roomIds} subscribeToRoom={this.subscribeToRoom} loadChat={this.loadChat} roomId={this.state.room} />
            <MessageList messages={this.state.messages} myUserId={this.props.myUserId}/>
            <h5 className='txt'>pH:</h5>>
            <h4 className="ph">{this.state.messages.length}</h4>>
            <SendMessageForm  sendMessage={this.sendMessage} />
            </div>
    )
    }
}

export default Chat