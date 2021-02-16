import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RootState } from './redux';
import { actionSetStatus, actionResetStatus } from './redux/reducers/actionReducer/types';

interface Props extends RootState {
  
}
interface State {
  
}

export class App extends Component<Props, State> {
  state = {}

  render() {
    console.log(this.props);
    return (
      <div>
          <h2>{'' + this.props.synteticAction.actionStatus}</h2>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  synteticAction: state.synteticAction
})

const mapDispatchToProps = {
  actionSetStatus, actionResetStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
