// HANDY METHODS FOR STORY ROUTES

const db = require('./db'),
  { unlink } = require('fs'),
  { promisify } = require('util'),
  root = process.cwd()


/**
 * Returns wether user has seen the story
 * @param {Number} user User ID
 * @param {Number} story Story ID
 * @returns {Boolean} Boolean
 */
const seenOrNot = async (user, story) => {
    let st = await db.query(
        'SELECT COUNT(story_id) AS s FROM seen WHERE seen_by=? AND story_id=?',
        [user, story]
    )
    return db.tf(st[0].s)
}

/**
 * Returns whether user saved the story
 * @param {Number} user User ID
 * @param {Number} story Story ID
 * @returns {Boolean} Boolean
 */
const savedOrNot = async (user, story) => {
    let s = await db.query(
        'SELECT COUNT(saved_id) AS sv FROM saved WHERE saved_by=? AND story_id=?',
        [user, story]
    )
    return db.tf(s[0].sv)
}

/**
 * Returns whether session is the owner of story
 * @param {Number} session Session ID
 * @param {Number} story Story ID
 * @returns {Boolean} Boolean
 */
const isStoryMine = async (session, story) => {
  let s = await db.query('SELECT user FROM stories WHERE story_id=?', [story])
  return s[0].user == session ? true : false
}

/** Deletes a story */
const deleteStory = async ({ story, when }) => {
    await db.query('DELETE FROM seen WHERE story_id=?', [story])
    await db.query('DELETE FROM saved WHERE story_id=?', [story])
    await db.query('DELETE FROM notifications WHERE story_id=?', [story])

    let [{ url }] = await db.query(
        'SELECT url FROM stories WHERE story_id=?',
        [story]
        ),
        deleteFile = promisify(unlink)

    await deleteFile(`${root}/dist/stories/${url}`)

    if (when == 'user') {
        await db.query('DELETE FROM stories WHERE story_id=?', [story])
    } else {
        await db.query('DELETE FROM stories WHERE story_id=?', [story])
    }
}



module.exports = {
  seenOrNot,
  isStoryMine,
  savedOrNot,
  deleteStory,
}
