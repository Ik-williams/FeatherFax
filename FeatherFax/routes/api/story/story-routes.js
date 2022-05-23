// ALL STORY-RELATED ROUTES ARE HANDLED BY THIS FILE

const app = require('express').Router(),
  db = require('../../../config/db'),
  User = require('../../../config/User'),
  Story = require('../../../config/Story'),
  root = process.cwd(),
  upload = require('multer')({
    dest: `${root}/dist/temp/`,
  }),
  { ProcessImage, DeleteAllOfFolder } = require('handy-image-processor')


  // STORY [REQ = DESC, TYPE, IMAGE(FILE) ]
  app.post('/post-it-story', upload.single('image'), async (req, res) => {
    try {
      let { id } = req.session,
        { desc, filter, location, type } = req.body,
        filename = `featherfax_stories_${new Date().getTime()}.jpg`,
        obj = {
          srcFile: req.file.path,
          destFile: `${root}/dist/stories/${filename}`,
        },
        insert = {
          user: id,
          description: desc,
          filter,
          location,
          url: filename,
          type,
          story_time: new Date().getTime(),
        }

      await ProcessImage(obj)
      DeleteAllOfFolder(`${root}/dist/temp/`)

      let { insertId } = await db.query('INSERT INTO stories SET ?', insert),
        firstname = await User.getWhat('firstname', id),
        surname = await User.getWhat('surname', id)

      res.json({
        success: true,
        mssg: 'Story Posted!!',
        story_id: insertId,
        firstname,
        surname,
        filename,
      })
    } catch (error) {
      db.catchError(error, res)
    }
  })

// SAVED OR NOT [REQ = STORY]
app.post('/saved-or-not', async (req, res) => {
    let saved = await Story.savedOrNot(req.session.id, req.body.story)
    res.json(saved)
})

// SAVE STORY [REQ = STORY]
app.post('/save-story', async (req, res) => {
    try {
        let { story_id } = req.body,
            { id } = req.session,
            saved = await Story.savedOrNot(id, story_id),
            insert = {
                saved_by: id,
                story_id: story_id,
                saved_time: new Date().getTime(),
            }

        if (!saved) {
            await db.query('INSERT INTO saved SET ?', insert)
        }

        res.json({
            success: true,
            mssg: 'Story saved!!',
        })
    } catch (error) {
        db.catchError(error, res)
    }
})

// UNSAVE STORY [REQ = STORY, USER]
app.post('/unsave-story', async (req, res) => {
    try {
        let { story, user } = req.body
        await db.query('DELETE FROM saved WHERE story_id=? AND saved_by=?', [
            story,
            user,
        ])
        res.json({ success: true })
    } catch (error) {
        db.catchError(error, res)
    }
})

// DELETE STORY [REQ = STORY]
app.post('/delete-story', async (req, res) => {
    try {
        await Story.deleteStory({
            story: req.body.story,
            when: 'user',
        })
        res.json({
            success: true,
            mssg: 'Story deleted!!',
        })
    } catch (error) {
        db.catchError(error, res)
    }
})

module.exports = app


