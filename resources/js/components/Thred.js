import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import Responce from "./Responce";
import axios from "axios";

class Thred extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            title: "",
            r_username: "",
            r_email: "",
            r_body: ""
        };
    }

    async hundleSubmit(e) {
        e.preventDefault();
        await this.setRes();
        axios
            .post("api/thred", this.state)
            .then(res => {
                this.props.onCreateThred(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    setRes() {
        if (this.state.r_username === "") {
            this.setState({ r_username: "風吹けば名無し" });
        }
        let responce = {
            username: this.state.r_username,
            email: this.state.r_email,
            body: this.state.r_body
        };
        this.setState({ responces: responce });
    }

    userType(type, e) {
        switch (type) {
            case "title":
                this.setState({ title: e.target.value });
                return;
            case "name":
                this.setState({ r_username: e.target.value });
                if (e.target.value === null) {
                    this.setState({ r_username: "風吹けば名無し" });
                }
                return;
            case "email":
                this.setState({ r_email: e.target.value });
                return;
            case "body":
                this.setState({ r_body: e.target.value });
                return;
            default:
                return;
        }
    }

    render() {
        const thredHtml = this.props.data.map(ele => (
            <li>
                {ele.id}. {ele.title}({ele.responces.length})
            </li>
        ));
        return (
            <div>
                <ul>{thredHtml}</ul>
                <form
                    onSubmit={e => {
                        this.hundleSubmit(e);
                    }}
                >
                    <label htmlFor="title">タイトル-></label>
                    <input
                        type="text"
                        defaultValue=""
                        name="title"
                        placeholder="タイトル"
                        onChange={e => {
                            this.userType("title", e);
                        }}
                    />
                    <label htmlFor="name"> 名前-></label>
                    <input
                        type="text"
                        defaultValue=""
                        placeholder="名前"
                        onChange={e => {
                            this.userType("name", e);
                        }}
                    />
                    <label htmlFor="email">メール-></label>
                    <input
                        type="email"
                        defaultValue=""
                        name="email"
                        placeholder="@"
                        onChange={e => {
                            this.userType("email", e);
                        }}
                    />
                    <br />
                    <label htmlFor="body">本文</label>
                    <textarea
                        name="body"
                        defaultValue=""
                        onChange={e => {
                            this.userType("body", e);
                        }}
                    />
                    <input type="submit" value="送信する" />
                </form>
                <br />
                {/* <Responce /> */}
            </div>
        );
    }
}

export default Thred;
