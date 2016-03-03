/**
 * Created by Yangwook Ryoo on 1/29/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import MainApp from './components/MainApp.react';
import CommentBox from './components/CommentBox';
import TodoApp from './components/TodoApp.react';
import Register from './components/Register.react';
import './components/Foundation.scss';

//pass props
class CommentBoxWrapper extends React.Component {
  render() {
    return (
      <CommentBox url='api/comments' pollInterval={2000} />
    );
  }
}

function renderReact() {
  render((
    <Router history={hashHistory}>
      <Route path="/" component={MainApp}>
        <IndexRoute component={CommentBoxWrapper} />
        <Route path="todo" component={TodoApp} />
        <Route path="register" component={Register} />
      </Route>
    </Router>
  ), document.getElementById('app'));
}

// Run the application when both DOM is ready
// and page content is loaded
if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', renderReact);
} else {
  window.attachEvent('onload', renderReact);
}