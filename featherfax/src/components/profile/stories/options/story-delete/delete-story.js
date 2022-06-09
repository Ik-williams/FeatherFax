import React, { Component, Fragment } from 'react'
import { Me } from '../../../../../utils/utils'
import { isAdmin } from '../../../../../utils/admin-utils'
import { deleteStory } from '../../../../../utils/story-utils'
import Prompt from '../../../../others/prompt'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MaterialIcon from '../../../../others/icons/material-icon'

//import { getUserStories} from '../../../../../actions/story'

class DeleteStory extends Component {

    state = {
        deleteStory: false,
        redirect: false,
    }

    showDeleteStory = e => {
        e ? e.preventDefault() : null
        this.setState({ deleteStory: !this.state.deleteStory })
    }

    delete = e => {
        e.preventDefault()
        let {
            storyDetails: { story_id, when },
            dispatch,
        } = this.props
        deleteStory({
            story_id,
            when,
            dispatch,
            redirect: () => this.setState({ redirect: true }),
        })
        //_mounted = false
    }

    modalBack = () => {
        //this.props.toggleOptions()
         this.setState({ deleteStory: false })
        //this.updateStories()
    }

    render() {

        let {
            storyDetails: { user },
        } = this.props

        let { deleteStory, redirect } = this.state


        return (
            <Fragment>
                {(Me(user) || isAdmin()) && (
                    <li>
                        <a href="#" className="delete_story" onClick={ this.showDeleteStory }>
                            <MaterialIcon icon="delete" /> {/*isAdmin() ? 'as admin' : null*/}
                        </a>
                    </li>
                )}

                {deleteStory && (
                    <Prompt
                        title="Delete story"
                        content="This story will be deleted. There's no undo, so you won't be able to find it later."
                        actionText="Delete"
                        action={this.delete}
                        back={this.modalBack}
                    />
                )}
            </Fragment>
        )
    }
}

DeleteStory.propTypes = {
    storyDetails: PropTypes.shape({
        user: PropTypes.number.isRequired,
        story_id: PropTypes.number.isRequired,
        when: PropTypes.string.isRequired,
    }).isRequired,
}

export default connect()(DeleteStory)
export { DeleteStory as PureDeleteStory }
