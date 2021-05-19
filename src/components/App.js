import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Dashboard from "./Dashboard";
import InVue from "./InVue";
import Three from "./Three";
import Processing from "./Processing";

import "../styles/App.css";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/upload" component={Dashboard} />
                <Route path="/processing" component={Processing} />
                <Route path="/viewer" component={InVue} />
                <Route path="/legacy-viewer" component={Three} />
                <Route path="/" exact component={Homepage} />
            </Switch>
        );
    }
}

export default App;