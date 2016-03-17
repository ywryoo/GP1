/**
 * Created by Yangwook Ryoo on 2/15/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">ABC</li>
            <li><Link to="/">대시보드</Link></li>
            <li><Link to="/challenge">문제</Link></li>
            <li><Link to="/learn">배우기</Link></li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li><Link to="/">프로필</Link></li>
          </ul>
        </div>
      </div>
    );
  }
}