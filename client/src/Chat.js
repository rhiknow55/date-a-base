import React, {Component} from 'react';
import MessageList from './MessageList.js';
import SendMessageForm from './SendMessageForm.js'


const DUMMY_DATA = [
    {
        senderId: 'user1',
        text: 'Hey, how is it going?'
    },
    {
        senderId: 'user2',
        text: 'Great! How about you?'
    },
    {
        senderId: 'user1',
        text: 'Good to hear! I am great as well'
    }
]

class Chat extends React.Component {


    constructor() {
        super()
        this.state = {
            messages: []
        }
        //this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        // Load the feed contents
        this.retrieveMessages()
            .then(res => this.setState( {
               // messages: res.postIds
                messages: DUMMY_DATA


            }));
    }


    // need to retrieve messages
    retrieveMessages = async () => {
        let url = '/retrieve_posts?numberOfPosts=' + 3;
        const response = await fetch(url)

        // const response = await fetch('/retrieve_posts?', {
        //     method: 'POST',
        //     headers: new Headers({
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     }),
        //     body: JSON.stringify({
        //         numberOfPosts: NUMBER_OF_POSTS_TO_LOAD
        //     })
        // })

        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.messages)
        }
        return json;
    }

    render() {

        return (
            <div className="Chat">
                <MessageList messages={this.state.messages}/>
                <SendMessageForm />
            </div>

    )
    }
}

export default Chat