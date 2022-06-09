import { post } from 'axios'
import Notify from 'handy-notification'
import { addUserStory } from '../actions/story'
import { imageCompressor, insta_notify, Me, uData, wait } from './utils'
import * as StoryActions from '../actions/story'
import d from './API/DOM'
import Action from './API/Action'

export const addStory = async options => {
    let {
          dispatch,
          desc,
          targetFile,
          filter,
          location,
          type,
        } = options,
        user = Number(uData('session')),
        username = uData('username'),
        form = new FormData(),
        file = await imageCompressor(targetFile),
        action = new Action('.p_story')

    action.start()
    wait()

    form.append('desc', desc)
    form.append('image', file)
    form.append('filter', filter)
    form.append('location', location)
    form.append('type', type)

    let {
        data: { success, mssg, story_id, firstname, surname, filename },
    } = await post('/api/post-it-story', form)

    if (success) {
        let newStory = {
            key: story_id,
            user,
            username,
            firstname,
            surname,
            description: desc,
            filter,
            url: filename,
            location,
            story_time: `${new Date().getTime()}`,
            story_id,
            type: 'storyImage',
        }

        type == 'storyImage'
            ? dispatch(
            addUserStory({
                ...newStory,
                when: 'feed'
            })
            )
            : dispatch(
            addUserStory({
                ...newStory,
                type: 'storyVideo',
                when: 'feed'
            })
            )
    }

    action.end()
    Notify({ value: mssg })
}

/**
 * seen story
 * @param {Object} options
 * @param {Number} options.story_id
 * @param {Number} options.user
 * @param {Function} options.done
 */
export const seen = async options => {
    let { story_id, user, done } = options
    let {
        data: { success, mssg },
    } = await post('/api/seen-story', { story: story_id })

    if (success) {
        !Me(user)
            ? insta_notify({
                to: user,
                type: 'seen',
                story_id,
            })
            : null

        done()
    } else {
        Notify({ value: mssg })
    }
}

/**
 * Saves a story
 * @param {Object} options
 * @param {Number} options.story_id
 * @param {Function} options.done
 */
export const save = async options => {
    let { story_id, done } = options
    let {
        data: { success, mssg },
    } = await post('/api/save-story', { story_id })

    success ? done() : null
    Notify({ value: mssg })
}

/**
 * Unsave story
 * @param {Object} options
 * @param {Number} options.story_id
 * @param {String} options.when
 * @param {Number} options.user
 * @param {Function} options.dispatch
 * @param {Function} options.done
 */
//key + saved == bookmarks
export const unsave = async options => {
    let { story_id, when, user, dispatch, done } = options
    let session = uData('session')

    let {
        data: { success, mssg },
    } = await post('/api/unsave-story', { story: story_id, user: session })

    if (success) {
        if (when == 'saved' && Me(user)) {
            dispatch(StoryActions.unsave(story_id))
            Notify({ value: 'Story unsaved!!' })
        }
        done()
    } else {
        Notify({ value: mssg })
    }
}


/**
 * Deletes a story
 * @param {Object} options
 * @param {Number} options.story_id
 * @param {String} options.when
 * @param {Function} options.dispatch
 * @param {Function} options.redirect
 */
export const deleteStory = async options => {
    let { story_id, when, dispatch, redirect } = options

    wait()

    let {
        data: { success, mssg },
    } = await post('/api/delete-story', { story: story_id })

    if (success) {
        dispatch(StoryActions.deleteStory(story_id))
        when == 'user' ? redirect() : null
    }

    Notify({ value: mssg })
}
