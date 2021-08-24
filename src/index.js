
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    RouteProps,
    withRouter
} from "react-router-dom";

import ReactDOM from 'react-dom';
import List from "./components/list";
import Gen from "./components/generated";
// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/generate">
                    <Gen />
                </Route>
                <Route path="/add">
                    <List />
                </Route>
                <Route path="/">
                    <App />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>, document.getElementById('root'));