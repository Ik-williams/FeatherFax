import React from 'react'
import { geolocation, getAddress } from '../../../utils/location-utils'
import MaterialIcon from '../../others/icons/material-icon'
import { connect } from 'react-redux'
import { CPS } from '../../../actions/story'
import classNames from 'classnames'

const GetLocation = ({ postItStory, dispatch }) => {
  let { location } = postItStory

  let dp = (...args) => dispatch(CPS(...args))

  let getLocation = async () => {
    let geolocationSuccess = async pos => {
      dp('fetchingLocation', true)
      let address = await getAddress(pos)
      dp('location', address)
      dp('fetchingLocation', false)
    }
    geolocation(geolocationSuccess)
  }

  return (
    <span
      className={classNames('loc_add', { p_span_toggle: location })}
      data-tip="Add location"
      onClick={getLocation}
    >
      <MaterialIcon icon="location_on" />
    </span>
  )
}

const mapStateToProps = state => ({
  postItStory: state.Story.postItStory,
})

export default connect(mapStateToProps)(GetLocation)
export { GetLocation as PureGetStoryLocation }
