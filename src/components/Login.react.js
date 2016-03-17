/**
 * Created by Yangwook Ryoo on 3/3/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { googleAnalyticsId } from '../constants/ABCConfig';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  login(e) {
    console.log('asdfdsa');
  }

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
    return (
      <html className="no-js" lang="kr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>Login</title>
        <meta name="description" content="login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="app">
          <div className="row">
            <div className="medium-6 medium-centered large-4 large-centered columns">
              <form>
                <div className="row column log-in-form">
                  <h4 className="text-center">Log in with you email account</h4>
                  <label htmlFor="username">Email
                    <input type="text" id="username" placeholder="somebody@example.com" />
                  </label>
                  <label htmlFor="password">Password
                    <input type="password" id="password" ref="password" placeholder="Password" />
                  </label>
                  <label htmlFor="show-password">Show password</label>
                  <p><a type="submit" className="button expanded" onClick={this.login.bind(this)}>Log In</a></p>
                  <p className="text-center"><a href="#">Forgot your password?</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <script dangerouslySetInnerHTML={this.trackingCode()} />
      </body>
      </html>
    );
  }
}
