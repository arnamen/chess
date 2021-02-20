import React, { Component, ReactElement } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import Tile from '../../components/Tile';
import ChessPiece from '../../components/ChessPiece';
import { updateChessboard, updateChessboardOneTile, createChessboard, WHITE, BLACK, ChessPieceType } from '../../redux/reducers/chessboardReducer/types';
import { RootState } from '../../redux/index';
import Chessboard from '../../components/Chessboard';
import Spinner from '../../components/Spinner';

const mapStateToProps = (state: RootState) => ({
    chessboard: state.chessboard.chessboard,
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
        let chessboard: ReactElement = <Spinner/>
        if(this.props.chessboard !== null) chessboard = <Chessboard chessboardData={this.props.chessboard}/>;
        return (
            chessboard
        )
    }
}

export default connector(GameManager)