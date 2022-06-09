import React from 'react'
import { c_first } from '../../../../utils/utils'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CPS } from '../../../../actions/story'
import d from '../../../../utils/API/DOM'
import classNames from 'classnames'

const StoryFilter = ({ filter, previewImg, dispatch }) => {
  let f = filter.replace('filter-', '')

  let select = () => {
    new d('.filter_div').removeClass('select_receiver_toggle')
    new d(`.fp_${filter}`).addClass('select_receiver_toggle')
    dispatch(CPS('filter', filter))
  }

  return (
    <div className={classNames('filter_div', `fp_${filter}`)} onClick={select}>
      <img className={filter} src={previewImg} />
      <span>{c_first(f)}</span>
    </div>
  )
}

StoryFilter.propTypes = {
  filter: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  previewImg: state.Story.postItStory.previewImg,
})

export default connect(mapStateToProps)(StoryFilter)
export { StoryFilter as PureStoryFilter }
