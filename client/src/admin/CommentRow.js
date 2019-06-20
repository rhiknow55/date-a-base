import React, {Component} from 'react';


class CommentRow extends Component {
    constructor(props){
        super(props)
        this.delete = () => {
            fetch('admin/delete_comment',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + this.props.jwt,
                    },
                    body: JSON.stringify({commentId: this.props.data.commentId})
                });
        }
    }

    render() {
        const c = this.props.data;
        return <div>
             <a href="#" onClick={this.delete}>
             Comment ID: {c.commentId} | Author: {c.userId} | Post: {c.postId} | Message: {c.message}
            </a>
        </div>
    }
}
export default CommentRow;