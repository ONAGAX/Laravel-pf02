import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import axios from "axios";

class Responce extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            body: "",
            thred_id: ""
        };
    }

    async hundleSubmitRes(e) {
        e.preventDefault();
        await this.setCheck();
        axios
            .post("api/responce", this.state)
            .then(res => {
                this.props.onCreateThred(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    setRes(id) {
        this.setState({ thred_id: id });
    }

    setCheck() {
        if (this.state.username === "") {
            this.setState({ username: "風吹けば名無し" });
        }
    }

    userType(type, e) {
        switch (type) {
            case "name":
                this.setState({ username: e.target.value });
                if (e.target.value === "") {
                    this.setState({ username: "風吹けば名無し" });
                }
                return;
            case "email":
                this.setState({ email: e.target.value });
                return;
            case "body":
                this.setState({ body: e.target.value });
                return;
            default:
                return;
        }
    }

    render() {
        const { data } = this.props;
        return (
            <div>
                {data.map(ele => (
                    <div id={ele.id}>
                        <h4>{ele.title}</h4>
                        {ele.responces.map(res => (
                            <div id={res.id}>
                                <p>
                                    {res.id}{" "}
                                    {res.email ? (
                                        <a href={res.email}>{res.username}</a>
                                    ) : (
                                        res.username
                                    )}{" "}
                                    {res.created_at}
                                </p>
                                <p>{res.body}</p>
                            </div>
                        ))}
                        <form
                            onSubmit={e => {
                                this.hundleSubmitRes(e);
                            }}
                        >
                            <label htmlFor="name"> 名前-></label>
                            <input
                                type="text"
                                placeholder="風吹けば名無し"
                                onChange={e => {
                                    this.userType("name", e);
                                }}
                            />
                            <label htmlFor="email">メール-></label>
                            <input
                                type="email"
                                defaultValue=""
                                name="email"
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
                            <input
                                type="submit"
                                value="送信する"
                                onClick={e => {
                                    this.setRes(ele.id);
                                }}
                            />
                        </form>
                    </div>
                ))}
            </div>
        );
    }
}

export default Responce;
