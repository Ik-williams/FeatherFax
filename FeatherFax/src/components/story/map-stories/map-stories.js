import React, { Fragment } from 'react'
import Nothing from '../../others/nothing'
import { FadeIn } from 'animate-components'
import PropTypes from 'prop-types'

const MapStories = ({ stories, nothingMssg }) => {
    let len = stories.length

    return (
        <Fragment>
            {len == 0 ? (
                <Nothing mssg={nothingMssg} />
            ) : (
                <FadeIn duration="500ms">{stories}</FadeIn>
            )}
        </Fragment>
    )
}

MapStories.propTypes = {
    stories: PropTypes.arrayOf(PropTypes.node).isRequired,
    nothingMssg: PropTypes.string.isRequired,
}

export default MapStories
