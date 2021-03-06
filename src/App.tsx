import React, { Component } from 'react';
import { connect } from 'react-redux'
import { RootState } from './redux';
import { updateChessboard, updateChessboardOneTile } from './redux/reducers/chessboardReducer/types';
import GameManager from './pages/GameManager';
import MovesLog from './components/MovesLog';
import GameInfo from './components/GameInfo';

import './App.css';

interface Props {

}
interface State {

}

export class App extends Component<Props, State> {
  state = {}

  render() {
    return (

        <div className='App'>
          <MovesLog />
          <GameManager />
          <GameInfo />
        </div>

    )
  }
}

const mapStateToProps = (state: RootState) => ({
  chessboard: state.chessboard.chessboard,
  movesLog: state.movesLog.movesLog
})

const mapDispatchToProps = {
  updateChessboard, updateChessboardOneTile
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
