import React, { Component } from 'react';
import StoryViewerS from './story_viewer-s'
//import '../assets/styles/StoryList.scss';


// Components


class StoryListS extends Component {

    render() {
        return (
            <div className="rowS">
                { this.props.stories.map(story => <StoryViewerS key={story.id}
                                                               story={story}
                                                                userStories={this.props.stories}/>)}
            </div>

        )
    }
}

export default StoryListS;
