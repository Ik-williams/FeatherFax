import PostItStoryIntialState from './postitstory-initial-state'

export const addStory = (stories, story) => {
    stories = [story, ...stories]
    return stories
}

export const unsave = (saved, story) =>
    saved.filter(sv => sv.story_id != story)

export const deleteStory = (stories, story) =>
    stories.filter(s => s.story_id != parseInt(story))

export const toggleModal = (modalHandler, handler) => {
    modalHandler = handler
    return modalHandler
}


export const changePostItStory = (postItStory, pyOptions) => {
    let { what, value } = pyOptions
    let updated = {
        ...postItStory,
        [what]: value,
    }
    return updated
}

export const resetPostItStoryProperties = () => {
    let reset = PostItStoryIntialState
    return reset
}
