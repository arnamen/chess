import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import { RootState } from './redux';
import GameManager from './pages/GameManager';
import { RemoveMoveFromLog } from './redux/reducers/movesLogReducer/types';
import MovesLog from './components/MovesLog';
import GameInfo from './components/GameInfo';

import './App.css';

const LineBreak = styled.div`
@media (max-width: 650px) {
    flex-basis: 100%;
    height: 0;
    order: 1;
}
`

const mapStateToProps = (state: RootState) => ({
  chessboard: state.chessboard.chessboard,
  movesLog: state.movesLog.movesLog
})

const mapDispatchToProps = {
  RemoveMoveFromLog
}
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);
interface Props extends PropsFromRedux {

}
interface State {

}

export class App extends Component<Props, State> {
  state = {}

  render() {
    return (

        <div className='App'>
          <MovesLog moves={this.props.movesLog}/>
          <GameManager />
          <LineBreak/>
          <GameInfo />
        </div>

    )
  }
}

export default connector(App)
