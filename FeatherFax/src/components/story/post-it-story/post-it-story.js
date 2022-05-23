import React, { Component } from 'react'
import { FadeIn } from 'animate-components'
import Overlay from '../../others/overlay'
import ToolTip from 'react-tooltip'
import StoryFilters from './filters/filters'
import GetLocation from './getLocation'
import PostItStoryHeader from './header'
//import AddTags from './add-tags'
import Middle from './middle'
//import ToggleAddTags from './toggleAddTags'
import PostItStoryActions from './actions'
import { func, oneOf } from 'prop-types'
import AddEmojis from '../../others/emojis/add-emojis'
import { CPS } from '../../../actions/story'
import { disableFeed } from '../../../actions/post'
import { connect } from 'react-redux'

@connect(store => ({
    postItStory: store.Story.postItStory,
}))
export default class PostItStory extends Component {
    componentDidMount = () => {
        let { type, dispatch } = this.props
        dispatch(CPS('type', type))
        dispatch(disableFeed())
    }

    render() {
        let {
            postItStory: { fileChanged, showOverlay },
            dispatch,
            back,
        } = this.props

        return (
            <div>
                <Overlay />

                <div className="post_story" style={{ left: fileChanged ? '41%' : '50%' }}>
                    <FadeIn duration="300ms">
                        {fileChanged && <StoryFilters />}

                        <PostItStoryHeader />
                        <Middle />
                        {/*<AddTags />*/}

                        <div className="t_p_bottom p_bottom">
                            <div
                                className="t_p_tag p_tag"
                                style={{ visibility: !fileChanged && 'hidden' }}
                            >
                                <AddEmojis
                                    position={{ top: 104, left: -215 }}
                                    textArea=".t_p_ta"
                                    updateTextArea={value => dispatch(CPS('desc', value))}
                                    addClassOnClicked
                                    className="p_span_toggle"
                                />

                                {/*<ToggleAddTags />*/}
                                <GetLocation />
                            </div>

                            <PostItStoryActions back={back} />
                        </div>
                    </FadeIn>
                </div>

                {showOverlay && <Overlay type="white" />}

                <ToolTip />
            </div>
        )
    }
}

PostItStory.propTypes = {
    back: func.isRequired,
    type: oneOf(['storyImage', 'storyVideo']).isRequired
}
