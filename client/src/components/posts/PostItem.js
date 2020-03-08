import React, { Component } from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import CommentForm from '../post/CommentForm'

import './Post.css';

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id, this.props.history);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  deletePost = (id) => {
    this.props.deletePost(id, this.props.history)
  }

  renderControls = () => {
    const { auth, post } = this.props
    const higherRoles = ['superadmin', 'admin', 'moderator']
    const controlView =
      <span style={{
        cursor: 'pointer',
        margin: '1px 5px'
      }} onClick={() => this.deletePost(post._id)}>
        <i className="fas fa-trash" style={{ color: '#e3003f' }}></i>
      </span>

    return higherRoles.indexOf(auth.user.role) > -1 ? controlView : null

  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="post-feed">
        <div className="card card-body mb-3">
          <div className="row">

            <div className="col-md-12">
              <div className="col-md-12">
                <div className='row justify-content-between' >
                  <div className='col-4'>
                    <div className='row'>
                      <div style={{
                        paddingLeft: '0px',
                        width: '25px'
                      }}>
                        <a href="profile.html">
                          <img
                            className="profile-pic rounded-circle d-none d-md-block"
                            src={post.avatar}
                            alt=""
                          />
                        </a>
                      </div>
                      <div className='align-self-center username'>
                        <span className="name">{post.name ? post.name : "John Doe"}</span>
                        <Link to={`/profile/${post.handle}`}
                          className="text-center"
                          style={{
                            marginBottom: '0px',
                            paddingLeft: '7px'
                          }}>@{post.handle}</Link>
                      </div>
                    </div >
                  </div>
                  <div className='col-2'>
                    <div className='row justify-content-end'>
                      {this.props.match.params.id ? this.renderControls() : null}
                      <div>
                        <span
                          onClick={this.onLikeClick.bind(this, post._id)}
                          style={{
                            cursor: 'pointer',
                            margin: '1px 5px'
                          }}
                        >
                          <i
                            className={classnames('fas fa-thumbs-up', {
                              'liked-btn': this.findUserLike(post.likes),
                              'text-secondary': !this.findUserLike(post.likes)
                            })}
                          />
                          <span className="badge">{post.likes.length}</span>
                        </span>
                        <span
                          onClick={this.onUnlikeClick.bind(this, post._id)}
                          style={{
                            cursor: 'pointer',
                            margin: '1px 5px'
                          }}
                        >
                          <i className="text-secondary fas fa-thumbs-down" />
                        </span>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
              <p className="post-text lead">{post.text}</p>
              <div className='col-12' style={{ paddingLeft: '0px' }}>
                <div className='row'>
                  <div className='col-9'>
                    <div className="tags-wrapper">

                      {
                        post.tags.map((tag, index) => {
                          return (
                            <span
                              style={{
                                margin: '0px 3px'
                              }}
                              key={index}
                              className="badge badge-dark">

                              {tag}
                            </span>
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className='col-3 align-self-center'>
                    <div className='row justify-content-end'>
                      <p style={{ fontSize: '12px', margin: '0px', fontWeight: '700' }}>Posted On : {moment(post.date).format('DD/MM/YYYY')}</p>
                    </div>
                  </div>
                </div>

              </div>

              <div className='col-12' style={{ border: '0.1px solid #f1f1f1', margin: '20px 0px' }}></div>

              <div className='col-12' style={{ padding: "0px" }}>

                <div className='col-12' >
                  <div className='row justify-content-between'>
                    <div className='col-4' style={{ paddingLeft: "0px" }}>
                      <span style={{ color: '#888', fontSize: '13px' }}>Comments</span> <small style={{ fontWeight: 500 }}>{post.comments.length > 0 ? `${post.comments.length}` : '0'} </small>
                    </div>
                    <div>
                      {this.props.match.params.id ? null : <Link className='btn btn-sm view-btn' to={{ pathname: `/post/${post._id}` }}>View</Link>}
                    </div>
                  </div>
                </div>



                {this.props.match.params.id ? <div className='col-12' style={{ padding: "0px" }}>
                  {
                    post.comments.map((comment, index) => {
                      return (
                        <div key={index}>
                          <div className='col-12' style={{ margin: '10px 0px' }}></div>
                          <span style={{ fontSize: '14px', marginLeft: '5px' }}>{comment.text}</span>
                          <Link to={`/profile/${comment.handle}`} style={{ color: "#2f3094", fontSize: '12px', margin: '0px 3px' }}>@{comment.handle}</Link>
                          <small style={{ color: 'grey', fontSize: '11px', marginLeft: '3px' }}>{moment(comment.date).format('DD/MM/YYYY')}</small>
                        </div>
                      )
                    })
                  }
                </div> : null}
              </div>


              {/* <div className='col-12' style={{border : '0.1px solid black', margin : '7px 0px'}}></div> */}

              {
                auth.user.verifiedAccount && auth.user.profile !== null && this.props.match.params.id ?
                  <div className='col-12' style={{ marginTop: '10px' }}>
                    <div className='row justify-content-between'>
                      <CommentForm postId={post._id} />
                    </div>
                  </div> :
                  null
              }


              {/* {showActions ? (
             

                { <Link to={`/post/${post._id}`} className="">
                  Write a comment {post.comments.length}
                </Link> }
                { {post.user === auth.user.id || ['superadmin', 'admin', 'moderator'].includes(auth.user.role) ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null} }
                 
                </div>
              </div>
            ) : null} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem));
