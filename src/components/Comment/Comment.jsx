/**
 * Created by Yangwook Ryoo on 2/9/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

export default class Comment extends React.Component {
  render() {
    let rawMarkup = this.props.children.toString()  ;
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
}
