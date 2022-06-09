import React, { Component } from 'react';
import StoryModalS from './story_modal-s'
import ModalS from './modal-s'
import StoryS from './story-s'
import { connect } from 'react-redux'
import { toggleModal } from '../../../actions/story'
import * as StoryUtils from '../../../utils/story-utils'


// Components

const StoryViewerS = props => {
    //let isShowing = false

    /*const openModalHandler = () => {
        let { dispatch } = props
        dispatch(toggleModal(true))
    }*/

    const closeModalHandler = () => {
        let { dispatch } = props
        dispatch(toggleModal(false))
    }

    //story needs to listen and get the user id so it can query
    //the database and return all the user stories
    //use classnames module
        let { userStories } = props //userStories = makeStoryList(stories)
        //const storyM = getStory(userStories)
        let isShowing = props.modalHandler
        return (
            <div className="story-viewerS">
                { isShowing && <ModalS
                    show={isShowing}
                    close={ closeModalHandler }>
                    <StoryModalS stories={ userStories }/>
                </ModalS> }
                <div className="columnS" >
                    {/*<StoryS open={ openModalHandler } storyImage={props.story.header.profileImage} story={props.story} />*/}
                    <StoryS storyImage={props.story.header.profileImage} story={props.story} />
                </div>
            </div>
        )

}

const mapStateToProps = state => ({
    modalHandler: state.Story.modalHandler,
})

export default connect(mapStateToProps)(StoryViewerS);

//export default StoryViewerS;
//const stories = [{ url: 'https://picsum.photos/1080/1920', header: { heading: 'Mohit Karekar', subheading: 'Posted 5h ago', profileImage: 'https://picsum.photos/1000/1000' } }, { url: 'https://fsa.zobj.net/crop.php?r=dyJ08vhfPsUL3UkJ2aFaLo1LK5lhjA_5o6qEmWe7CW6P4bdk5Se2tYqxc8M3tcgYCwKp0IAyf0cmw9yCmOviFYb5JteeZgYClrug_bvSGgQxKGEUjH9H3s7PS9fQa3rpK3DN3nx-qA-mf6XN', header: { heading: 'Mohit Karekar', subheading: 'Posted 32m ago', profileImage: 'https://picsum.photos/1080/1920' } }, { url: 'https://media.idownloadblog.com/wp-content/uploads/2016/04/iPhone-wallpaper-abstract-portrait-stars-macinmac.jpg', header: { heading: 'mohitk05/react-insta-stories', subheading: 'Posted 32m ago', profileImage: 'https://avatars0.githubusercontent.com/u/24852829?s=400&v=4' } }, { url: 'https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4', type: 'video', duration: 1000 }, 'https://images.unsplash.com/photo-1534856966153-c86d43d53fe0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80', 'https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'https://images.unsplash.com/photo-1499202189329-5d76e29aa2b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1482&q=80']
