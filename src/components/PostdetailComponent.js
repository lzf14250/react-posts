import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';

class Postdetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCommentOpen: false
        };

        this.toggleComment = this.toggleComment.bind(this);

    }

    toggleComment() {
        this.setState({
            isCommentOpen: !this.state.isCommentOpen
        });
    }

    render() {

        function RenderComments({comments}) {
            var comments = comments.map(comment => {
                return (
                    <div className="col-12">
                        <blockquote className="blockquote text-info">
                            <p className="mb-0">{comment.body}</p>
                            <footer className="blockquote-footer">
                                By {comment.name},
                                <cite title="Source Title"> {comment.email}</cite>
                            </footer>
                        </blockquote>
                    </div>
                );
            });
            return comments;
        }

        return (
            <div className="col-12 mt-4">
                <Card className="row">
                    <CardHeader className="bg-primary text-white col-12">
                        <div className="row">
                            <div className="col-10">{this.props.post.title}</div>
                            <Button className="btn btn-warning col-1 mr-0" 
                            onClick={() => this.props.deletePost(this.props.post.id)}>
                            Delete
                        </Button>
                        </div>
                    </CardHeader>
                    <CardBody className="row">
                        <h5>{this.props.post.body}</h5>
                        {this.state.isCommentOpen ? 
                            <Button onClick={this.toggleComment}>Hide Comment</Button>
                                :
                            <Button onClick={this.toggleComment}>Show Comment</Button>
                        }
                        {this.state.isCommentOpen ?
                            <div className="row">
                                <RenderComments comments={this.props.comments} />
                            </div>
                                :
                            <div></div>
                        }
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Postdetail;
