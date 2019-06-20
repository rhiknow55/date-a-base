import React, {Component} from 'react';
import Message from './Message.js';


// dummy
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

class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    //console.log(message.senderId)
                    return (

                        <Message key={index} username={message.senderId} text={message.text} timestamp={message.timestamp}/>

                    )
                })}
            </div>
        )
    }
}

export default MessageList