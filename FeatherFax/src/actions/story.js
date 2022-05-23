import { dispatchHelper } from '../utils/utils'

export const addUserStory = story => {
    return {
        type: 'ADD_USER_STORY',
        payload: story,
    }
}

export const getUserStories = username =>
    dispatchHelper('GET_USER_STORIES', 'get-user-stories', { username })

export const getStoryFeed = () => dispatchHelper('GET_STORY_FEED', 'get-story-feed')


export const deleteStory = story => {
    return {
        type: 'DELETE_STORY',
        payload: story,
    }
}

export const toggleModal = handler => {
    return {
        type: 'TOGGLE_MODAL',
        payload: handler,
    }
}

/*
export const getStoryAllSeen = post =>
    dispatchHelper('GET_STORY_ALL_SEEN', 'get-story-all-seen', { story })
*/

// CHANGE POST IT STORY PROPERTIES
export const CPS = (what, value) => {
  return {
    type: 'CHANGE_POSTITSTORY_PROPS',
    payload: { what, value },
  }
}

export const resetPostItStory = () => {
  return {
    type: 'RESET_POSTITSTORY',
  }
}
