import React, { Component } from 'react'
//import PostItStoryTeaser from '../post-it-story/post-it-story-teaser'
//import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'
//import { getSuggestedUsers } from '../../../actions/explore'
//import SuggestedList from './suggested-list'
import PropTypes from 'prop-types'
import IsLoading from '../../others/isLoading'
import { cLoading } from '../../../utils/utils'
import FAIcon from '../../others/icons/font-awesome-icon'
//import AppLink from '../../others/link/link'
import TimeAgo from 'handy-timeago'
import Nothing from '../../others/nothing'
// Helpers
//import classNames from 'classnames';
//import { getStoryFeed } from '../../../actions/story'
// Components
import StoryList from './story_list-s'
//import data from '../utils/data.js'
import { v4 } from 'uuid'
import { getUserStories} from '../../../actions/story'
import { toggleModal } from '../../../actions/story'
import { FadeIn } from 'animate-components'

// Styles
//import '../assets/styles/App.scss';
//import styles from '../assets/styles/style.css'; // eslint-disable-line no-unused-vars

class StoryAppS extends Component {
    /*state = {
        loading: this.props.loading
    }*/


    componentDidMount = () => {
        // params: if user is on a profile of eg. noddy, then noddy won't appear on suggestions
        let { dispatch, username} = this.props
        dispatch(getUserStories(username))
        //this.setState({ loading: false }
    }
    //componentWillReceiveProps = () => this.setState({ loading: false })

    openModalHandler = () => {
        let { dispatch } = this.props
        dispatch(toggleModal(true))
    }


    make_story_list = stories => {
        let story_list = []
        const duration = 1000
        story_list = stories.map(story => {
            let {
                story_id,firstname,surname,username,description,url,type,story_time,user
            } = story

            let header = {
                heading: firstname+" "+surname,
                subheading: TimeAgo(story_time).replace(/\s ago/, '') ,
                profileImage: `/users/${user}/avatar.jpg`
            }
            return {
                id: story_id,
                username,
                user,
                url: `/stories/${url}`,
                type: type,
                duration: 5200,
                header: header
            }
        })
        return story_list
    }


    render() {

        let { loading } = this.props
        const { stories } = this.props
        //const storyFilter = this.one_user_story(storyFeed)
        const userStories = this.make_story_list(stories)
        let len = stories.length
        //const userStories = this.make_story_list(storyFeed)

        return (
            <div className="williams">
                <FadeIn duration="300ms">
                    <div className={cLoading(loading)}>
                        {len != 0 ? (<div> <div
                            className="view-stories-s"
                            data-tip="view stories"
                            onClick={this.openModalHandler}
                        >
                            view
                        </div><StoryList stories = {userStories}/> </div>) : ''}
                    </div>
                </FadeIn>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    stories: state.Story.stories,
})

export default connect(mapStateToProps)(StoryAppS);
