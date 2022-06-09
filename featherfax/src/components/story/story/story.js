import React, { Component } from 'react'
import * as StoryUtils from '../../../utils/story-utils'
import { post } from 'axios'
//import '../assets/styles/Story.scss';



//class story
class Story extends Component {
    state = {
        seen: false,
    }

    componentDidMount = async () => {
        let { id } = this.props.story, story_id = id,
            { data: seen } = await post('/api/seen-or-not', { story: story_id })

        await this.setState({ seen })

    }

    seeStory = async () => {
        let {
            id, user
        } = this.props.story, story_id = id
        StoryUtils.seen({
            story_id,
            user,
            done: () => {
                this.setState({ seen: true })
            },
        })
    }

    onMult = () => {
        this.props.open()
        this.seeStory()
    }
    render() {
        let seen = this.state
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
        return (
            <div className="wrapper" onClick={ this.onMult } style={styles.header}>
                <div className="profile">
                    <img src={this.props.storyImage} className="thumbnail"/>
                    <h3 className="name">{this.props.story.header.heading}</h3>
                    <p className="description">{this.props.story.header.subheading}</p>
                </div>
            </div>
        )

    }
}


export default Story
