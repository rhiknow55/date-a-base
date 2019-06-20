import React from 'react'

class RoomList extends React.Component {

    click(sessionId){
        this.props.subscribeToRoom(sessionId)
        //console.log('loaaaaad')


    }




    render () {
        return (
            <div className="rooms-list">
                <ul>
                    <h3>Your rooms: </h3>

                    {this.props.rooms.map(room => {
                        const active = this.props.roomId === room.sessionId ? "active" : "";
                        return (
                            <li key={room.sessionId} className={"room " + active}>
                                <a
                                    onClick={() => this.click(room.sessionId)}
                                    href="#">
                                    # {room.userName}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RoomList