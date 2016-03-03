/**
 * Created by Yangwook Ryoo on 2/9/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import $ from 'jquery';

export default class CommentForm extends React.Component {
  constructor(){
    super();
    this.state = {author: '', text: ''};
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }

  handleTextChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    if(!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text:''});
  }
  render() {
    return (
      <form className="commnetForm" onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          placeholder="이름"
          value={this.state.author}
          onChange={this.handleAuthorChange.bind(this)}
        />
        <input
          type="text"
          placeholder="내용을 입력하세요."
          value={this.state.text}
          onChange={this.handleTextChange.bind(this)}
        />
        <input type="submit" value="올리기" />
      </form>
    );
  }
}
