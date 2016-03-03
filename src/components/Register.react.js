/**
 * Created by Yangwook Ryoo on 2/29/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div className="row">
        <div className="medium-6 medium-centered large-4 large-centered columns">
          <form>
            <div className="row column log-in-form">
              <h4 className="text-center">Log in with you email account</h4>
              <label>Email
                <input type="text" placeholder="somebody@example.com" />
              </label>
              <label>Password
                <input type="text" placeholder="Password" />
              </label>
              <input id="show-password" type="checkbox" />
              <label for="show-password">Show password</label>
              <p><a type="submit" className="button expanded">Log In</a></p>
              <p className="text-center"><a href="#">Forgot your password?</a></p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}