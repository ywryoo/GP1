/**
 * Created by Yangwook Ryoo on 2/11/16.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//NOT USED
 import assign from 'lodash.assign';

let _callbacks = [];

let Dispatcher = () => {};
Dispatcher.prototype = assign({}, Dispatcher.prototype, {
  /**
   * Register a Store's callback so that it may be invoked by an action.
   * @param {function} callback the callback to be registered.
   * @return {number} the index of the callback within the _callbacks array.
   */
  register: callback => {
    _callbacks.push(callback);
    return _callbacks.length - 1; //index
  },
  /**
   * dispatch
   * @param {object} payload the data from the action.
   */
  dispatch: async payload => {
    _callbacks.forEach(async callback => {
      try {
        await callback(payload);
      } catch(e) {
        console.log("Error: "+e);
      }
    });
  }
});

exports = {Dispatcher:"default"};

