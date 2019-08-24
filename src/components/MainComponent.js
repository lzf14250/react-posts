import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, fetchUsers, fetchComments, uploadPost, deletePost } from '../redux/ActionCreators';
import Header from './HeaderComponent';
import Userlist from './UserlistComponent';
import Postdetail from './PostdetailComponent';
import { Loading } from './LoadingComponent';

function mapStateToProps(state) {
    return {
        posts: state.posts,
        comments: state.comments,
        users: state.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchUsers: () => dispatch(fetchUsers()),
        fetchComments: () => dispatch(fetchComments()),
        uploadPost: (userId, title, body) => dispatch(uploadPost(userId, title, body)),
        deletePost: (postId) => dispatch(deletePost(postId))
    };
}


class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchPosts();
        this.props.fetchUsers();
        this.props.fetchComments();
    }

    render() {

        const userPosts = ({match}) => {
            
            if (this.props.posts.isLoading) {
                return (
                    <div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>
                );
            }
            else if (this.props.posts.errMess) {
                return (
                    <div className="container">
                        <div className="row">
                            <h4>{this.props.posts.errMess}</h4>
                        </div>
                    </div>
                );
            }
            else {
                
                const postsOfUser = this.props.posts.posts.filter(post => post.userId == match.params.userId);
                const postsRendered = postsOfUser.map(post => {
                    return (
                        <Postdetail post={post} 
                            deletePost={this.props.deletePost}
                            comments={this.props.comments.comments.filter(comment => comment.postId === post.id)} 
                            />
                    );
                });
        
                return (
                    <div className="container">
                        <div className="row">
                            {postsRendered}
                        </div>
                    </div>
                );
            }
        }

        return (
            <div>
                <Header uploadPost={this.props.uploadPost} />
                <Switch location={this.props.location}>
                    <Route exact path="/users" component={() => <Userlist users={this.props.users} />} />
                    <Route exact path="/users/:userId" component={userPosts} />
                    <Redirect to="/users" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));