import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import axios from "axios";

class Responce extends Component {
    constructor(props) {
        super(props);
        {
            data: props.data;
        }
    }

    render() {
        // const resHtml = (
        //     this.props.data.map(ele=>{

        //     }))
        return (
            <div>
                <h4 />
                <ul>
                    <li>レス一覧</li>
                </ul>
            </div>
        );
    }
}

export default Responce;
