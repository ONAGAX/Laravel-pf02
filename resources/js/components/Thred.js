import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Col, Form, Button } from "react-bootstrap";
import axios from "axios";

class Thred extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = {
            responces: {
                username: "風吹けば名無し",
                email: "",
                body: ""
            },
            data: [],
            title: "",
            r_username: "",
            r_email: "",
            r_body: ""
        };
    }

    async th_hundleSubmit(e) {
        e.preventDefault();
        await this.setResth();
        axios
            .post("api/thred", this.state)
            .then(res => {
                this.props.onCreateThred(res);
                this.form.current.reset();
            })
            .catch(err => {
                console.log(err);
            });
    }

    setResth() {
        let name;
        if (this.state.r_username === "") {
            name = "風吹けば名無し";
        } else {
            name = this.state.r_username;
        }
        let responces = {
            email: this.state.r_email,
            body: this.state.r_body,
            username: name
        };
        this.setState({ responces: responces });
        console.log(this.state.responces.username);
    }

    userType(type, e) {
        switch (type) {
            case "th_title":
                this.setState({ title: e.target.value });
                return;
            case "th_name":
                this.setState({ r_username: e.target.value });
                return;
            case "th_email":
                this.setState({ r_email: e.target.value });
                return;
            case "th_body":
                this.setState({ r_body: e.target.value });
                return;
            default:
                return;
        }
    }

    render() {
        const thredHtml = this.props.data.map((ele, index) => (
            <li>
                <a href={"#" + ele.id}>
                    <h5>
                        {index + 1}. {ele.title} ({ele.responces.length})
                    </h5>
                </a>
            </li>
        ));
        return (
            <div>
                <ul>{thredHtml}</ul>
                <Form
                    onSubmit={e => {
                        this.th_hundleSubmit(e);
                    }}
                    ref={this.form}
                >
                    <Form.Row>
                        <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom01"
                        >
                            <Form.Label>タイトル</Form.Label>
                            <Form.Control
                                required
                                onChange={e => {
                                    this.userType("th_title", e);
                                }}
                                placeholder="タイトルを入力"
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                        >
                            <Form.Label>名前</Form.Label>
                            <Form.Control
                                onChange={e => {
                                    this.userType("th_name", e);
                                }}
                                placeholder="風吹けば名無し"
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="3"
                            controlId="validationCustom02"
                        >
                            <Form.Label>メール</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={e => {
                                    this.userType("th_email", e);
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
                            <Form.Label>本文</Form.Label>
                            <Form.Control
                                require
                                as="textarea"
                                row="9"
                                onChange={e => {
                                    this.userType("th_body", e);
                                }}
                                placeholder=""
                            />
                        </Form.Group>
                    </Form.Row>
                    <Button variant="success" type="submit">
                        スレッドを作成する
                    </Button>
                </Form>
                <br />
            </div>
        );
        const styles = {
            style: {
                marginTop: "20px"
            }
        };
    }
}

export default Thred;
