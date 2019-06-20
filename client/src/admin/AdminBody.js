import React, {Component} from 'react';
import Options from '../admin/Options';
import UserManagement from '../admin/UserManagement';
import CommentManagement from '../admin/CommentManagement';
import SeeMostBasicUsers from '../admin/SeeMostBasicUsers';

class AdminBody extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            show: this.props.show,
            users: null,
            most_basic_users: null,
            comments: null
        };

        this.on_click_manage_users = (e) => {
            e.preventDefault();
            fetch('/admin/users', {
                headers: {
                 'Authorization': 'Bearer ' + this.props.jwt,
                }
            }).then(response => {
                console.log("fetched json");
                console.log({response});
                return response.json();
            }
            ).then(response => this.setState({show: "manage users", users:response}));
        }

        this.on_click_manage_posts = (e) => {
            e.preventDefault();
            this.setState({show: "manage posts"});
        }

        this.on_click_manage_comments = (e) => {
            e.preventDefault();
            fetch('/admin/comments', {
                headers: {
                 'Authorization': 'Bearer ' + this.props.jwt,
                }
            }).then(response => {
                return response.json();
            }
            ).then(response => this.setState({show: "manage comments", comments:response}));
        }

        this.delete_comment = (id) => {
            // TODO
        }

        this.on_click_see_most_basic_users = (e) => {
            e.preventDefault();
            fetch('/admin/most_basic_users', {
                headers: {
                 'Authorization': 'Bearer ' + this.props.jwt,
                }
            }).then(response => {
                console.log("fetched json");
                console.log({response});
                return response.json();
            }
            ).then(response => this.setState({show:"see most basic users", most_basic_users:response}));
        }

        this.on_click_show_options = (e) =>{
            e.preventDefault();
            this.setState({show: "all options"});
        }
    }

    

  render() {
      if (this.state.show === "all options"){
          return (
            <div>
              <Options on_click_manage_users={this.on_click_manage_users} on_click_see_most_basic_users={this.on_click_see_most_basic_users}
              on_click_manage_comments={this.on_click_manage_comments} />
            </div>);
      }
      if (this.state.show === "manage users"){
          return (<div>
              <h3>You are now managing users</h3>
                    <a href="#" onClick={this.on_click_show_options}>
                        <h4>
                        Show All Options
                        </h4>
                    </a>
                    <hr></hr>
                    <UserManagement users={this.state.users}/>
                </div>);
      }
      if (this.state.show === "manage posts"){
        return (<div>
            <a href="#" onClick={this.on_click_show_options}>
                <h4>
                Show All Options
                </h4>
            </a>
            <hr></hr>
        </div>);
      }
      if (this.state.show === "manage comments"){
        return (<div>
            <a href="#" onClick={this.on_click_show_options}>
                <h4>
                Show All Options
                </h4>
            </a>
            <hr></hr>
            <CommentManagement comments={this.state.comments} delete_comment_callback={this.delete_comment} jwt = {this.props.jwt}/>

        </div>);
      }
      if (this.state.show === "see most basic users"){
        return (<div>
            <a href="#" onClick={this.on_click_show_options}>
                <h4>
                Show All Options
                </h4>
            </a>
            <hr></hr>
            <SeeMostBasicUsers most_basic_users = {this.state.most_basic_users}/>

        </div>);
      }
  }
}


export default AdminBody;