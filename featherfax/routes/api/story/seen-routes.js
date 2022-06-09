// OTHER STORY INTERACTIONS SUCH AS SEEN, SAVE IS HANDLED BY THIS FILE

const app = require('express').Router(),
    db = require('../../../config/db'),
    Story = require('../../../config/Story'),
    User = require('../../../config/User')

// SEEN  STORY OR NOT [REQ = POST]
app.post('/seen-or-not', async (req, res) => {
    let seen = await Story.seenOrNot(req.session.id, req.body.story)
    res.json(seen)
})

// SEEN STORY [REQ = POST]
app.post('/seen-story', async (req, res) => {
    try {
        let { story } = req.body,
            { id } = req.session,
            seen = await Story.seenOrNot(id, story),
            insert = {
                story_id: story,
                seen_by: id,
                seen_time: new Date().getTime(),
            }

        if (!seen) {
            await db.query('INSERT INTO seen SET ?', insert)
        }
        res.json({ success: true })
    } catch (error) {
        db.catchError(error, res)
    }
})

module.exports = app


// GET POST LIKES [REQ = POST]
/*app.post('/get-post-likes', async (req, res) => {
    let { post } = req.body,
        { id } = req.session,
        likes = await db.query(
            'SELECT likes.like_id, likes.like_by, users.username, users.firstname, users.surname, likes.post_id, likes.like_time FROM likes, users WHERE likes.post_id = ? AND likes.like_by = users.id ORDER BY likes.like_time',
            [post]
        ),
        array = []

    for (let l of likes) {
        array.unshift({
            ...l,
            isFollowing: await User.isFollowing(id, l.like_by),
        })
    }

    res.json({
        likes: array,
        isPostMine: await Post.isPostMine(id, post),
    })
})*/
