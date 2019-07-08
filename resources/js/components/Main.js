import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import Thred from "./Thred";
import Responce from "./Responce";
import Axios from "axios";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        Axios.get("/api/thred")
            .then(res => {
                this.setState({ data: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                {" "}
                <h2>掲示板</h2>
                <Thred data={this.state.data} />
            </div>
        );
    }
}

if (document.getElementById("example")) {
    ReactDOM.render(<Main />, document.getElementById("example"));
}
