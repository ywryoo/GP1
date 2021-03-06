/**
 * Created by Yangwook Ryoo on 2/14/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { googleAnalyticsId } from '../constants/ABCConfig';

export default class Html extends React.Component {
  static propTypes = {
    username: React.PropTypes.string
  };

  static defaultProps = {
    username: ''
  };

  trackingCode() {
    return ({__html:
      `(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=` +
      `function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;` +
      `e=o.createElement(i);r=o.getElementsByTagName(i)[0];` +
      `e.src='https://www.google-analytics.com/analytics.js';` +
      `r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));` +
      `ga('create','${googleAnalyticsId}','auto');ga('send','pageview');`
    });
  }

  render() {
    return this.props.username ? (
      <html className="no-js" lang="kr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>Welcome to GP1</title>
        <meta name="description" content="GP1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="app"></div>
        <script src="/app.min.js"></script>
        <script dangerouslySetInnerHTML={this.trackingCode()} />
      </body>
      </html>
    ) : <p>go to <a href="login">login</a></p>;
  }
}