import React, {Component} from 'react';


class Options extends Component {
  render() {
    return (
    <div>
        <a href="#" onClick={this.props.on_click_manage_users}>
            <h3>Manage Users</h3>
        </a>
        <br>
        </br>
        <a href="#" onClick={this.props.on_click_manage_posts}>
            <h3>Manage Posts</h3>
        </a>
        <br>
        </br>
        <a href="#" onClick={this.props.on_click_manage_comments}>
            <h3>Manage Comments
                </h3>
        </a>
        <br></br>
        <a href="#" onClick={this.props.on_click_see_most_basic_users}>
           <h3>See Which Users Have Above Average Log</h3>
            
        </a>
    </div>
    );
    }
}


export default Options;