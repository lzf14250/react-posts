import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Jumbotron, Button, Modal, 
    ModalBody, ModalHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPostModalOpen: false,
            userIdErr: '',
            titleErr: '',
            bodyErr: ''
        }

        this.togglePostModal = this.togglePostModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearErrMess = this.clearErrMess.bind(this);
    }

    togglePostModal() {
        this.setState({
            isPostModalOpen: !this.state.isPostModalOpen
        });
        this.clearErrMess();
    }

    clearErrMess() {
        this.setState({
            userIdErr: '',
            titleErr: '',
            bodyErr: ''
        });
    }

    handleSubmit(event) {
        if (!(/\d+/g.test(this.userId.value))) {
            this.setState({
                userIdErr: 'UserId must be a number'
            })
        }
        else if (!this.title.value) {
            this.setState({
                titleErr: 'Title can not be empty'
            });
        }
        else if (!this.body.value) {
            this.setState({
                bodyErr: 'Content can not be empty'
            });
        }
        else {
            // valid post
            this.togglePostModal();
            this.props.uploadPost(this.userId.value, this.title.value, this.body.value);
        }
        event.preventDefault();
    }

    render() {
        return (
            <>
                <Navbar expand="sm">
                    <div className="container">
                        <Nav navbar>
                            <NavItem>
                                <Button onClick={this.togglePostModal}>
                                    <i className="fa fa-pencil"></i> New Post
                                </Button>
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar>
                <Modal isOpen={this.state.isPostModalOpen}
                    toggle={this.togglePostModal}>
                    <ModalHeader toggle={this.togglePostModal}>
                        New Post
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label>UserId</Label>
                                <Input type="text" id="userId" name="userId" 
                                    innerRef={(input) => this.userId = input} />
                            </FormGroup>
                            <FormGroup>
                                <span style={{color: "red"}}>{this.state.userIdErr}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input type="text" id="title" name="title" 
                                    innerRef={(input) => this.title = input} />
                            </FormGroup>
                            <FormGroup>
                                <span style={{color: "red"}}>{this.state.titleErr}</span>
                            </FormGroup>
                            <FormGroup>
                                <Label>Content</Label>
                                <Input type="textarea" id="body" name="body" 
                                    rows="10"
                                    innerRef={(input) => this.body = input} />
                            </FormGroup>
                            <FormGroup>
                                <span style={{color: "red"}}>{this.state.bodyErr}</span>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default Header;