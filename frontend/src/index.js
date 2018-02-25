import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers/index';

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import sagaRoot from './saga/index';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

/* eslint-disable no-underscore-dangle */
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers, composeEnhancers(applyMiddleware(logger, sagaMiddleware))
);
/* eslint-enable */

sagaMiddleware.run(sagaRoot);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
