import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import Tile from '../../components/Tile';
import ChessPiece from '../../components/ChessPiece';
import { updateChessboard, updateChessboardOneTile, createChessboard, WHITE, BLACK } from '../../redux/reducers/chessboardReducer/types';
import { RootState } from '../../redux/index';

const mapStateToProps = (state: RootState) => ({
    chessboard: state.chessboard.chessboard
})

const mapDispatchToProps = {
    updateChessboard, updateChessboardOneTile, createChessboard
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {

}
interface State {
    currentPlayerTurn: 'white' | 'black'
}

//white - "+", black - "-"
//pawn - ±1 point
//knight - ±10 points
//bishop - ±10 points
//rook - ±10 points
//queen - ±100 points
//king - ±1000 points

class GameManager extends Component<Props, State> {

    componentDidMount() {
        this.props.createChessboard();
        this.setState({ currentPlayerTurn: 'white' });

    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default connector(GameManager)