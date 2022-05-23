import React, { Component } from 'react';
import StoryModal from './story_modal'
import Modal from './modal'
import Story from './story'
import { connect } from 'react-redux'
//import { getUserStories} from '../../../actions/story'
import * as StoryUtils from '../../../utils/story-utils'


// Components

class StoryViewer extends Component {

	constructor(props){
		super(props);
		this.state = {
			isShowing: false
		}
		this.openModalHandler = this.openModalHandler.bind(this)
		this.closeModalHandler = this.closeModalHandler.bind(this)
	}

    /*componentWillMount = () => {
        // params: if user is on a profile of eg. noddy, then noddy won't appear on suggestions
        let { dispatch,} = this.props
        dispatch(getUserStories(this.props.story.username))
    }*/

	openModalHandler(){
		this.setState({
			isShowing: true
		});
	}

	closeModalHandler(){
		this.setState({
			isShowing: false
		});
	}

	getUserStories = (stories) => {
	    let userStories = []
        //Get all user stroies
	    userStories =  stories.filter(story => story.user == this.props.story.user)
        return userStories
	}

    seeAllUserStories = async () => {
        let userStories = []
        //remove the first story that will be seen in story component
        //after onclick function is called
	    userStories = this.getUserStories(this.props.userStories.filter(story => story.id != this.props.story.id))
	    for(let us of userStories){
            let {
                id, user
            } = us, story_id = id
            StoryUtils.seen({
                story_id,
                user,
                done: () => {
                    return true
                },
            })
        }

    }
    //Function foro handling multipe function calls
    onMult = () => {
        this.closeModalHandler()
        this.seeAllUserStories()
    }
	//story needs to listen and get the user id so it can query
	//the database and return all the user stories
	//use classnames module
	render() {
	    let userStories = this.getUserStories(this.props.userStories)//userStories = makeStoryList(stories)

		return (
			<div className="story-viewer">
				{ this.state.isShowing && <Modal
					show={this.state.isShowing}
					close={this.onMult}>
						<StoryModal stories={ userStories }/>
				</Modal> }
				<div className="column">
 				    <Story open={this.openModalHandler} storyImage={this.props.story.header.profileImage} story={this.props.story} />
                </div>
			</div>
		)
	}
}

/*const mapStateToProps = state => ({
    stories: state.Story.stories,
})
*/
//export default connect(mapStateToProps)(StoryViewer);

export default StoryViewer;
//const stories = [{ url: 'https://picsum.photos/1080/1920', header: { heading: 'Mohit Karekar', subheading: 'Posted 5h ago', profileImage: 'https://picsum.photos/1000/1000' } }, { url: 'https://fsa.zobj.net/crop.php?r=dyJ08vhfPsUL3UkJ2aFaLo1LK5lhjA_5o6qEmWe7CW6P4bdk5Se2tYqxc8M3tcgYCwKp0IAyf0cmw9yCmOviFYb5JteeZgYClrug_bvSGgQxKGEUjH9H3s7PS9fQa3rpK3DN3nx-qA-mf6XN', header: { heading: 'Mohit Karekar', subheading: 'Posted 32m ago', profileImage: 'https://picsum.photos/1080/1920' } }, { url: 'https://media.idownloadblog.com/wp-content/uploads/2016/04/iPhone-wallpaper-abstract-portrait-stars-macinmac.jpg', header: { heading: 'mohitk05/react-insta-stories', subheading: 'Posted 32m ago', profileImage: 'https://avatars0.githubusercontent.com/u/24852829?s=400&v=4' } }, { url: 'https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4', type: 'video', duration: 1000 }, 'https://images.unsplash.com/photo-1534856966153-c86d43d53fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80', 'https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'https://images.unsplash.com/photo-1499202189329-5d76e29aa2b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1482&q=80']
