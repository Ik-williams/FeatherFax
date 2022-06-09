import React from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { addStory } from '../../../utils/story-utils'
import { CPS, resetPostItStory } from '../../../actions/story'
import { getFeed } from '../../../actions/post'
import SecondaryButton from '../../others/button/secondary-btn'
import PrimaryButton from '../../others/button/primary-btn'

const PostItStoryActions = props => {
  let {
    back,
    postItStory: { fileChanged, showOverlay, ...rest },
    dispatch,
  } = props

  let toggleOverlay = () => dispatch(CPS('showOverlay', !showOverlay))

  let BackAndReset = async e => {
    e ? e.preventDefault() : null
    await dispatch(resetPostItStory())
    await dispatch(getFeed())
    back()
  }

  let postItStory = async e => {
    e.preventDefault()
    toggleOverlay()

    await addStory({
      dispatch,
      ...rest
    })

    toggleOverlay()
    BackAndReset()
  }

  return (
    <div className="t_p_act p_act">
      <SecondaryButton label="Cancel" onClick={BackAndReset} />

      <PrimaryButton
        label="Upload"
        onClick={postItStory}
        disabled={!fileChanged}
        extraClass="p_story"
      />
    </div>
  )
}

PostItStoryActions.propTypes = {
  back: func.isRequired,
}

const mapStateToProps = state => ({
  postItStory: state.Story.postItStory,
})

export default connect(mapStateToProps)(PostItStoryActions)
export { PostItStoryActions as PurePostItStoryActions }
