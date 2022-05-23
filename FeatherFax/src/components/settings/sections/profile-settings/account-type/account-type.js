import React, { Component } from 'react'
import Notify from 'handy-notification'
import { post } from 'axios'
import { connect } from 'react-redux'

class ChangeAccountType extends Component {
  state = {
    type: 'public',
  }

  componentWillReceiveProps = ({ account_type }) =>
    this.setState({ type: account_type })

  changeType = async ({ target: { value: type } }) => {
    this.setState({ type })
    await post('/api/change-account-type', { type })
    Notify({ value: `Changed account type to ${type}` })
  }

  render() {
    let { type } = this.state

    return (
      <div className="acc_type">
        <div className="set_header acc_type_header">
          <span className="acc_type_h">Change account type</span>
          <span>
            Select your account type, currently it's{' '}
            <span className="type_indicator">{type}</span>
          </span>
        </div>
        <div className="acc_type_main">
          <select
            value={type}
            className="acc_select"
            onChange={this.changeType}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <span className="bold">Note:</span>
          <span>
            When your account is set as{' '}
            <span className="bold">
              private, only your followers can view and interact with your profile.
            </span>{' '}
            Others would have to follow you first to be able to view your full profile and interact with it. This is the{' '}
            <span className="bold">recommended</span> option, as only people you
            know would be able to view and interact with your profile.
          </span>
          <span>
            And when your account is set as public, {' '}
            <span className="bold">
              anybody can view your full profile and be able to interact with it.
            </span>
          </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  account_type: store.User.user_details.account_type,
})

export default connect(mapStateToProps)(ChangeAccountType)
export { ChangeAccountType as PureChangeAccountType }
