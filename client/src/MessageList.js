import React, {Component} from 'react';
import Message from './Message.js';




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