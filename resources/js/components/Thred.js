import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import Responce from "./Responce";
import axios from "axios";

class Thred extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    hundleSubmit(e) {
        e.preventDefault;
        axios
            .post("/api/Thred", this.state.data)
            .then(res => {
                console.log("success!");
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        console.log(this.props.data);
        const thredHtml = this.props.data.map(ele => (
            <li>
                {ele.id}. {ele.title}({ele.responces.length})
            </li>
        ));
        return (
            <div>
                <ul>{thredHtml}</ul>
                <form>
                    <label htmlFor="title">タイトル-></label>
                    <input type="text" name="title" placeholder="タイトル" />
                    <label htmlFor="name"> 名前-></label>
                    <input type="text" placeholder="名前" />
                    <label htmlFor="email">メール-></label>
                    <input type="email" name="email" placeholder="@" />
                    <br />
                    <label htmlFor="body">本文</label>
                    <textarea name="body" />
                    <input type="submit" value="送信する" />
                </form>
                <br />
                <Responce />
            </div>
        );
    }
}

export default Thred;
