import React, { Component } from 'react'
import PostItStory from './post-it-story'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class PostItStoryTeaser extends Component {
  state = {
    postItStory: false,
  }

  togglePostItStory = e => {
    e ? e.preventDefault() : null
    this.setState({ postItStory: !this.state.postItStory })
  }

  render() {
    let { postItStory } = this.state
    let {
      type,
      disabled,
      session: { id, username },
    } = this.props

    return (
      <div>
        <div
          className="post_it_story inst"
        >
            <img src={`/users/${id}/avatar.jpg`} alt="Your avatar" />
          <div className="story_teaser">
            <span
              className="p_whats_new"
              onClick={disabled ? null : this.togglePostItStory}
            >
                @{username} add story!
            </span>
          </div>
        </div>

        {postItStory && (
          <PostItStory back={this.togglePostItStory} type={type} />
        )}
      </div>
    )
  }
}

PostItStoryTeaser.defaultProps = {
  disabled: false,
}

PostItStoryTeaser.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool
}

const mapStateToProps = store => ({
  session: store.User.session,
})

export default connect(mapStateToProps)(PostItStoryTeaser)
export { PostItStoryTeaser as PurePostItStoryTeaser }
