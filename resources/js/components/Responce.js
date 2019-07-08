import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Form, Col, Button } from "react-bootstrap";
import axios from "axios";

class Responce extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = {
            validated: false,
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
                this.form.current.reset();
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
                        <hr />
                        <h4 id={"#" + ele.id}>{ele.title}</h4>
                        {ele.responces.map((res, index) => (
                            <div id={res.id}>
                                <p>
                                    {index + 1}{" "}
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
                        <a href="#">
                            <span>▲ トップに戻る</span>
                        </a>
                        <Form
                            onSubmit={e => {
                                this.hundleSubmitRes(e);
                            }}
                            ref={this.form}
                        >
                            <Form.Row>
                                <Form.Group
                                    as={Col}
                                    md="3"
                                    controlId="validationCustom02"
                                >
                                    <Form.Control
                                        onChange={e => {
                                            this.userType("name", e);
                                        }}
                                        placeholder="風吹けば名無し"
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="3"
                                    controlId="validationCustom02"
                                >
                                    <Form.Control
                                        type="email"
                                        onChange={e => {
                                            this.userType("email", e);
                                        }}
                                        placeholder="email@gmail.com"
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    controlId="validationCustom02"
                                >
                                    <Form.Control
                                        required
                                        as="textarea"
                                        row="9"
                                        onChange={e => {
                                            this.userType("body", e);
                                        }}
                                        placeholder="本文"
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={e => {
                                    this.setRes(ele.id);
                                }}
                            >
                                カキコ
                            </Button>
                        </Form>
                    </div>
                ))}
            </div>
        );
    }
}

export default Responce;
