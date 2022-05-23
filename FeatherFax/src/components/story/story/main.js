import React, { Component } from 'react'
import PostItStoryTeaser from '../post-it-story/post-it-story-teaser'
//import ToolTip from 'react-tooltip'
import { connect } from 'react-redux'
//import { getSuggestedUsers } from '../../../actions/explore'
//import SuggestedList from './suggested-list'
import PropTypes from 'prop-types'
import IsLoading from '../../others/isLoading'
import { cLoading } from '../../../utils/utils'
import FAIcon from '../../others/icons/font-awesome-icon'
import AppLink from '../../others/link/link'
import TimeAgo from 'handy-timeago'
import Nothing from '../../others/nothing'
// Helpers
//import classNames from 'classnames';
import { getStoryFeed } from '../../../actions/story'
// Components
import StoryList from './story_list'
//import data from '../utils/data.js'
import { v4 } from 'uuid'

// Styles
//import '../assets/styles/App.scss';
//import styles from '../assets/styles/style.css'; // eslint-disable-line no-unused-vars

class StoryApp extends Component {
    state = {
        loading: this.props.disabled
    }

    componentDidMount = () => {
        // params: if user is on a profile of eg. noddy, then noddy won't appear on suggestions
        let { dispatch,} = this.props
        dispatch(getStoryFeed())
    }
    componentWillReceiveProps = () => this.setState({ loading: false })
    updateStories = e => {
        e.preventDefault()
        let { dispatch } = this.props
        dispatch(getStoryFeed())
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

    one_user_story = stories => {
        let storyUsers = [], storyFilters = [], len, storyList = [], storyCheck = []

        storyList = stories.map(story => story.user)
        storyUsers = [...new Set(storyList)]
        len = storyUsers.length
        let flags = new Array(len)
        flags.fill(false)
        for(var u = 0; u < storyUsers.length; u++){
            let temp = []
            for(var s = 0; s < stories.length; s++){
                if(stories[s].user == storyUsers[u] && flags[u] == false){
                    temp.push(stories[s])
                    flags[u] = true
                }
            }
            storyFilters = [...storyFilters,...temp]
        }

        return storyFilters
    }

	render() {

        let loading = this.props.disabled
        const { storyFeed } = this.props
        const storyFilter = this.one_user_story(storyFeed)
        const stories = this.make_story_list(storyFilter).slice(0,4)
        let len = stories.length
        const userStories = this.make_story_list(storyFeed)

        let nothingMssg =
            "Looks like you're new, start following to fill up your story feed."

		return (
			<div className="williams">
				<div className="recomm_story">
					<div className="recomm_story_top">
						<span>Stories</span>
						<a
							href="#"
							className="recomm_story_refresh"
							data-tip="refresh"
							onClick={this.updateStories}
						>
							<FAIcon icon="sync-alt" /> {/*`debugger >${this.props}`*/}
						</a>
                        {/*<AppLink url="/explore" className="recomm_story_all" data-tip="view all">
							<FAIcon icon="chevron-right" />
						</AppLink>*/}
						{/*<div className="add_story"><span onClick={this.addStory}>Add new story</span></div>*/}
                        <div className="story_teaser">
						    <PostItStoryTeaser type="storyImage" disabled={loading} />
                        </div>
					</div>
					<div
						className="recomm_story_main"
						style={{ height: loading ? 100 : 'inherit' }}
					>
						<IsLoading loading={loading} />

						<div className={cLoading(loading)}>
							{len != 0 ? <StoryList stories = {stories}  userStories = { userStories }/> : <Nothing mssg={nothingMssg} />}
						</div>

					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
    storyFeed: state.Story.storyFeed,
    suggestedStories: state.Explore.suggestsedStories
})

export default connect(mapStateToProps)(StoryApp);
