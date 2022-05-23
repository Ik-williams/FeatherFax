/* eslint indent:0 */
/* eslint no-unreachable:0 */

import initialState from './initialState'
import * as methods from './methods'

export default (state = initialState, action) => {
  let py = action.payload

  switch (action.type) {

      case 'ADD_USER_STORY':
          return {
              ...state,
              storyFeed: methods.addStory(state.storyFeed, py),
          }
          break

      case 'GET_STORY_FEED':
          return { ...state, storyFeed: py }
          break

      case 'GET_USER_STORIES':
          return { ...state, stories: py }
          break

      case 'DELETE_STORY':
          return {
              ...state,
              stories: methods.deleteStory(state.stories, py),
              storyFeed: methods.deleteStory(state.storyFeed, py),
          }
          break

      case 'TOGGLE_MODAL':
          return {
              ...state,
              modalHandler: methods.toggleModal(state.modalHandler, py)
          }
          break

      // Post It Story
    case 'CHANGE_POSTITSTORY_PROPS':
      return {
        ...state,
        postItStory: methods.changePostItStory(state.postItStory, py),
      }

    case 'RESET_POSTITSTORY':
      return {
        ...state,
        postItStory: methods.resetPostItStoryProperties(),
      }
  }

  return state
}
