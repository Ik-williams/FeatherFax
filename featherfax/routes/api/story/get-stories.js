const app = require('express').Router(),
  db = require('../../../config/db'),
  Post = require('../../../config/Post'),
  User = require('../../../config/User')

//GET USER STORIES [REQ = USERNAME]
app.post('/get-user-stories', async (req, res) => {
    let id = await User.getId(req.body.username),
        _stories = await db.query(
            'SELECT stories.story_id, stories.user, users.username, users.firstname, users.surname, stories.description, stories.url, stories.filter, stories.location, stories.type, stories.story_time FROM stories, users WHERE stories.user=? AND stories.user = users.id AND stories.type=? ORDER BY stories.story_time DESC',
            [id, 'storyImage']
        ),
        stories = []

    for (let s of _stories) {
        //Get seen count and any other values that would
        //be outputed while viewing the story
        /*let {
            tags_count,
            likes_count,
            shares_count,
            comments_count,
        } = await Post.getCounts(p.post_id)*/

        stories.push({
            ...s,
        })
    }

    res.json(stories)
})

  // GET STORY FEED
  app.post('/get-story-feed', async (req, res) => {
    let  _stories = await db.query(
        'SELECT stories.story_id,stories.user, users.username, users.firstname, users.surname, stories.description, stories.url, stories.type, stories.story_time FROM stories, users, follow_system WHERE follow_system.follow_by = ? AND follow_system.follow_to = stories.user AND stories.user = users.id ORDER BY RAND(),stories.story_time DESC LIMIT 8',
        [req.session.id]
      ), _seen = await db.query('SELECT seen.story_id FROM seen WHERE seen.seen_by = ? ',
            [req.session.id]
        )
      stories = []
      seen = []


    for (let s of _stories) {
        stories.push({
            ...s
        })
    }
    if(_seen.length != 0){
          //Create an object with seen items in seen array
          for (let sn of _seen) {
              seen.push({
                  ...sn
              })
          }
          //Remove all stories that the current user has seen
          for(let sn = 0; sn < seen.length; sn++){
              for(let s = 0; s < stories.length; s++){
                  if(seen[sn].story_id == stories[s].story_id){
                      stories.splice(s,1)
                  }
              }
          }
      }


    res.json(stories)
  })

module.exports = app
