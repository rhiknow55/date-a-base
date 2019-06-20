import React, {Component} from 'react';
import UserRow from '../admin/UserRow';


class SeeMostBasicUsers extends Component {
    heartToggle = false;

    heart = () => {
        this.heartToggle = !this.heartToggle;
        if (this.heartToggle){
            return '💙';
        } else {
            return '🖤';
        }
    }

    renderUsers = () =>
    {
        var rows = new Array();
        for (let i = 0; i < this.props.most_basic_users.length; i++)
        {
            rows.push(<UserRow data = {this.props.most_basic_users[i]} key={i} heart = {this.heart}/>);
        }

        return rows;
    }

    render() {
        console.log(this.props.users);
        return <div>
            <h4>The users with an above average log are...</h4>
            {this.renderUsers()}
        </div>
    }
}
export default SeeMostBasicUsers;