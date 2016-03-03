/**
 * Created by Yangwook Ryoo on 2/9/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import $ from 'jquery';
import CommentForm from '../CommentForm';
import CommentList from '../CommentList';

export default class CommentBox extends React.Component {
  static propTypes = {
    url:React.PropTypes.string.isRequired,
    pollInternal: React.PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {data: []};
    this.props = props;
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.interval = {};
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: data => {
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  handleCommentSubmit (comment) {
    let comments = this.state.data;
    comment.id = Date.now();
    let newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      contentType: "application/json; charset=utf-8",
      datatype : "json",
      type: 'POST',
      data: JSON.stringify(comment),
      success: data => {
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        this.setState({data: comment});
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    this.interval = setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="commentBox">
        <h1>댓글</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
      );
  }
}