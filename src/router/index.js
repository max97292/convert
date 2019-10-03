import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utils/history';

import ConvertPage from "../containers/convert";

export default class MainRouter extends Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" component={ConvertPage} />
                </Switch>
            </Router>
        );
    }
}