import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppView from './app/AppView/AppView';

// tslint:disable-next-line:no-submodule-imports
import 'es6-promise/auto';

import './styles.scss';

// Update type for polyfilled 'from' function that converts an iterable to an array
declare global {
    // tslint:disable-next-line:interface-name
    interface ArrayConstructor {
        /**
         * Creates an array from an iterable object.
         * @param iterable An iterable object to convert to an array.
         */
        from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
    }
}

ReactDOM.render(<AppView />, document.getElementById('root'));
