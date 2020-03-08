import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getPosts, getPostByTag } from '../../actions/postActions';

class Posts extends Component {
  constructor(props){
    super(props)
    this.state = {
      tag : null
    }
  }
  componentDidUpdate(prevProps){
    if(this.state.tag && this.state.tag !== this.props.match.params.tag){
      this.setState({tag : this.props.match.params.tag})

      this.props.getPostByTag(this.props.match.params.tag)
    }
  }
  componentDidMount() {
    
      if(this.props.match.params.tag){
        this.setState({tag : this.props.match.params.tag})
        this.props.getPostByTag(this.props.match.params.tag)
      }else{
        this.props.getPosts();
      }
  }

  render() {
    const { posts, loading, } = this.props.post;
    const auth = this.props.auth;
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    let isValidProfile = false;
    
    if(auth && auth.user && auth.user.verifiedAccount){
      isValidProfile = true;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              { isValidProfile ? <PostForm /> : <div class="alert alert-danger" role="alert">Your profile must be verified to be able to post or comment.</div> } 
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts, getPostByTag })(Posts);
