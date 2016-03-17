/**
 * Created by Yangwook Ryoo on 3/11/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import LoginStore from '../stores/LoginStore';

export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

    static willTransitionTo(transition) {
      if (!LoginStore.isLoggedIn()) {
        transition.redirect('/login', {}, {'nextPath' : transition.path});
      }
    }

    constructor() {
      super()
      this.state = this._getLoginState();
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn(),
        user: LoginStore.user,
        jwt: LoginStore.jwt
      };
    }

    componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      LoginStore.addChangeListener(this.changeListener);
    }

    _onChange() {
      this.setState(this._getLoginState());
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this.changeListener);
    }

    render() {
      return (
      <ComposedComponent
        {...this.props}
        user={this.state.user}
        jwt={this.state.jwt}
        userLoggedIn={this.state.userLoggedIn} />
      );
    }
  }
};