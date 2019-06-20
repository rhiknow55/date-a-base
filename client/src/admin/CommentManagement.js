import React, {Component} from 'react';
import CommentDeletion from '../admin/CommentDeletion'
import CommentRow from '../admin/CommentRow'

class CommentManagement extends Component {
    renderComments = () =>
    {
        var rows = new Array();
        for (let i = 0; i < this.props.comments.length; i++)
        {
            rows.push(<CommentRow data = {this.props.comments[i]} key={i} jwt={this.props.jwt}/>);
        }

        return rows;
    }

    render() {
        return <div>
            <CommentDeletion />
            {this.renderComments()}
        </div>
    }
}
export default CommentManagement;