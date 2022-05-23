import React, { Component, Fragment } from 'react'
import * as StoryUtils from '../../../../../utils/story-utils'
import { post } from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MaterialIcon from '../../../../others/icons/material-icon'

import { Me } from '../../../../../utils/utils'
import { isAdmin } from '../../../../../utils/admin-utils'

class StorySave extends Component {
    state = {
        saved: false,
    }

    componentDidMount = async () => {
        let {
                storyDetails: { story_id },
            } = this.props,
            { data: saved } = await post('/api/saved-or-not', {
                story: story_id,
            })
        this.setState({ saved })
    }

    save = async () => {
        let {
            storyDetails: { story_id },
        } = this.props
        StoryUtils.save({
            story_id,
            done: () => this.setState({ saved: true }),
        })
    }

    unsave = async () => {
        let {
            storyDetails: { story_id, when },
            dispatch,
            ud: { id },
        } = this.props
        StoryUtils.unsave({
            story_id,
            when,
            user: id,
            dispatch,
            done: () => this.setState({ saved: false }),
        })
    }

    render() {
        let { saved } = this.state
        let { storyDetails: { user } } = this.props

        return (
            <Fragment>
                {(Me(user) || isAdmin()) && (<div className="p_bmrk_wra">
                    {saved ? (
                        <span
                            className="p_bookmark undo_bookmark"
                            data-tip="Undo save"
                            onClick={this.unsave}
                        >
              <MaterialIcon icon="bookmark" />
            </span>
                    ) : (
                        <span
                            className="p_bookmark"
                            data-tip="Save story"
                            onClick={this.save}
                        >
              <MaterialIcon icon="bookmark_border" />
            </span>
                    )}
                </div>)}
            </Fragment>
        )
    }
}

StorySave.propTypes = {
    storyDetails: PropTypes.shape({
        story_id: PropTypes.number.isRequired,
        when: PropTypes.string.isRequired,
    }).isRequired,
}

const mapStateToProps = store => ({
    ud: store.User.user_details,
})

export default connect(mapStateToProps)(StorySave)
export { StorySave as PureStorySave }
