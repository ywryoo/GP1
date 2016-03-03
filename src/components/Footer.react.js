/**
 * Created by Yangwook Ryoo on 2/15/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {Link} from 'react-router';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div className="callout large secondary">
        <div className="row">
          <div className="large-4 columns">
            <h5>ABC</h5>
            <p>ABC - test</p>
          </div>
          <div className="large-3 large-offset-2 columns">
            <ul className="menu vertical">
              <li><Link to="#">One</Link></li>
              <li><Link to="#">Two</Link></li>
              <li><Link to="#">Three</Link></li>
              <li><Link to="#">Four</Link></li>
            </ul>
          </div>
          <div className="large-3 columns">
            <ul className="menu vertical">
              <li><Link to="#">One</Link></li>
              <li><Link to="#">Two</Link></li>
              <li><Link to="#">Three</Link></li>
              <li><Link to="#">Four</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}