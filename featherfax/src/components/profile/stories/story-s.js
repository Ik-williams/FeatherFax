import React, { Component } from 'react'
import * as StoryUtils from '../../../utils/story-utils'
import { post } from 'axios'
import StorySave from './options/story-save/story-save'
import DeleteStory from './options/story-delete/delete-story'
//import '../assets/styles/Story.scss';



//class story
class StoryS extends Component {

    render() {
        const styles={
            header:{
                background: 'rgba(0, 0, 0, 0.5)',
                backgroundImage:`url(${this.props.story.url})`,
                //opacity: 0.2,
                backgroundPosition:'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }
        }
        const when = 'user'
        let story_id = this.props.story.id
        let { user } = this.props.story
        return (
            <div className="wrapperS" style={styles.header}>
                <div className="profileS">
                    {/*Save story Icon */}
                    <div className="saveS">
                        <StorySave storyDetails={{ story_id, user, when }}  />
                    </div>

                    <div className="deleteS" data-tip="Delete story" >
                        <DeleteStory
                            storyDetails={{ story_id, user, when }}
                        />
                    </div>
                    {/* <div className="viewS" data-tip="View story" onClick={ this.props.open }>view story</div>*/}
                </div>
            </div>
        )

    }
}


export default StoryS
