import React from 'react'
import { connect } from 'react-redux'
import FileInput from '../../others/input/file'
import TextArea from '../../others/input/textArea'
import { CPS } from '../../../actions/story'

const PostItStoryMiddle = ({ postItStory, session, dispatch }) => {
  let { username } = session
  let { fileChanged, desc, previewImg, filter, fileInput } = postItStory

  let dp = (...args) => dispatch(CPS(...args))

  let fileChange = e => {
    e.preventDefault()
    dp('fileChanged', true)
    dp('fileInput', e.target.value)

    let reader = new FileReader(),
      file = e.target.files[0]
    dp('targetFile', file)

    reader.onload = e => dp('previewImg', e.target.result)
    reader.readAsDataURL(file)
  }

  let valueChange = e => dp('desc', e.target.value)

  return (
      <div className="i_p_main p_main" style={{ height: 296 }}>
          {// Show if image/file is selected
              fileChanged ? (
                  <div>
                      <div className="i_p_ta">
            <TextArea
                placeholder={`What's new with you, @${username}?`}
                value={desc}
                valueChange={valueChange}
                className="t_p_ta"
            />
                      </div>
                      <div className="i_p_img">
                          <img src={previewImg} className={filter} />
                      </div>
                  </div>
              ) : (
                  // If not show button to select
                  <form
                      className="story_img_form"
                      method="post"
                      encType="multipart/formdata"
                  >
                      <FileInput
                          value={fileInput}
                          fileChange={fileChange}
                          label="upload a story"
                          labelClass="pri_btn"
                      />
                  </form>
              )}
      </div>
  )
}

const mapStateToProps = state => ({
  session: state.User.session,
  postItStory: state.Story.postItStory,
})

export default connect(mapStateToProps)(PostItStoryMiddle)
export { PostItStoryMiddle as PurePostItStoryMiddle }
