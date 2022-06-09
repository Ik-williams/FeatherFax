import React, { Component } from 'react';
import StoryViewer from './story_viewer'
//import '../assets/styles/StoryList.scss';


// Components


class StoryList extends Component {

	render() {
		return (
				<div className="row">
					{ this.props.stories.map(story => <StoryViewer key={story.id}
							story={story} userStories ={this.props.userStories}/>)}
				</div>

		)
	}
}

export default StoryList;
