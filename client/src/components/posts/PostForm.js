import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import TextFieldGroup from '../common/TextFieldGroup';

import './Post.css';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      tag: '',
      tags: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    if (this.state.tags.length > 2) {
      const newPost = {
        text: this.state.post,
        tags: this.state.tags,
        name: user.name,
        avatar: user.avatar
      };

      this.props.addPost(newPost);
      this.setState({ post: '', tag: '', tags: [] });
    } else {
      alert('Minimum 3 tags required')
    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onKeyPress = (e) => {
    if (e.target.name === 'tag' && e.keyCode === 13) {
      this.setState({
        tags: [...this.state.tags, this.state.tag.toLowerCase()],
        tag: ''
      })
    }
  }

  onTagClick = (e, index) => {
    e.preventDefault()

    const tags = this.state.tags
    tags.splice(index, 1)
    this.setState({
      tags: [...tags]
    })
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header text-white">Say Somthing</div>
          <div className="card-body">
            <div style={{
              minHeight: '25px',
              margin: '4px'
            }}>
              {
                this.state.tags.map((tag, index) => {
                  return (
                    <span
                      style={{
                        margin: '0px 3px',
                        padding: '5px',
                        background: '#2f3094'
                      }}
                      key={index}
                      className="badge badge-success">

                      {tag}
                      <span onClick={e => this.onTagClick(e, index)}>
                        <i style={{
                          marginLeft: '5px',
                          cursor: 'pointer'
                        }} className="far fa-times-circle"></i>
                      </span>

                    </span>
                  )
                })
              }
            </div>
            <div >
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="post"
                  value={this.state.post}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Minimum 3 tags required"
                  name="tag"
                  value={this.state.tag}
                  onKeyPress={this.onKeyPress}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>

              <button type="button" onClick={this.onSubmit} className="btn submit-btn">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
