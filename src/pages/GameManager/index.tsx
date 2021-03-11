import { Component, ReactElement } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import equal from 'deep-equal';

import { TileIndex } from '../../components/Tile';
import { updateChessboard, updateChessboardOneTile, createChessboard, WHITE, BLACK, SelectedPiece, chessboardMakeMove } from '../../redux/reducers/chessboardReducer/types';
import  { Move, addMoveToLog, RemoveMoveFromLog, updateMoveInLog } from '../../redux/reducers/movesLogReducer/types';
import { makeTempMove } from '../../utils/moves-test-move';
import { RootState } from '../../redux/index';
import Chessboard from '../../components/Chessboard';
import Spinner from '../../components/Spinner';
import OrangeButton from '../../components/Chessboard/ChessboardModal/OrangeButton';

import { findPieceOnBoard } from '../../utils/find-piece-on-board';
import { getPossibleMoves } from '../../utils/moves-logic-helper';
import { isCheck, CheckInfo, isCheckmate, CheckmateInfo } from '../../utils/checkmate-helper';
const mapStateToProps = (state: RootState) => ({
    chessboard: state.chessboard.chessboard,
    movesLog: state.movesLog.movesLog
})

const mapDispatchToProps = {
    updateChessboard, updateChessboardOneTile, createChessboard, chessboardMakeMove, addMoveToLog, RemoveMoveFromLog,  updateMoveInLog
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
interface Props extends PropsFromRedux {
    moveReset?: boolean
}
interface State {
    currentPlayerTurn: 'WHITE' | 'BLACK',
    selectedPiece: SelectedPiece,
    possibleMoves: TileIndex[],
    checkInfo: CheckInfo | null,
    message?: string,
    gameStarted: boolean,
    gameFinished: boolean,
    isFirstMoveMade: boolean, //for log purposes
    showWinner: boolean
}

//white - "+", black - "-"
//pawn - ±1 point
//knight - ±10 points
//bishop - ±10 points
//rook - ±10 points
//queen - ±100 points
//king - ±1000 points

class GameManager extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            currentPlayerTurn: 'WHITE',
            selectedPiece: null,
            possibleMoves: [],
            checkInfo: null,
            gameStarted: false,
            gameFinished: false,
            isFirstMoveMade: false,
            showWinner: false
        };
    }

    componentDidMount() {
        this.props.createChessboard();
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (this.props.chessboard) {

            if(prevProps.movesLog.length > this.props.movesLog.length) {
                this.setState({
                    possibleMoves: [],
                    selectedPiece: null,
                    checkInfo: null,
                })
            }

            if (this.state.gameFinished && this.state.showWinner) {
                this.setState({
                    message: `Game over. Winner is ${this.state.currentPlayerTurn === 'BLACK' ? 'white' : 'black'}`,
                    showWinner: false,
                })
            }
        }

    }

    setSelectedPiece(selectedPiece: SelectedPiece) {

        if (selectedPiece) {
            const piece = selectedPiece.piece;
            const tileIndex = selectedPiece.tileIndex;
            const chessboard = this.props.chessboard;
            let possibleMoves: TileIndex[] = [];
            if (chessboard)
                possibleMoves = getPossibleMoves(chessboard, selectedPiece, this.state.currentPlayerTurn)

            this.setState({
                selectedPiece: {
                    piece, tileIndex
                },
                possibleMoves
            });
        }

    }

    onMovePiece(tileIndex: TileIndex) {
        if(!this.state.selectedPiece) return;
        if (this.state.selectedPiece.tileIndex && this.props.chessboard) {
            //if there is check to the king. 
            //Will return null if there is no check, else will return detailed data
            const checkInfo = isCheck(this.props.chessboard, this.state.currentPlayerTurn);
            const tempChessboard = makeTempMove(this.props.chessboard, this.state.selectedPiece?.tileIndex, tileIndex);
            if (checkInfo) {  
                //check if check remains after palyer makes move
                const tempCheckInfo = isCheck(tempChessboard, this.state.currentPlayerTurn);
                //if check remains notify player about check
                if (tempCheckInfo !== null) {
                    this.setState({
                        checkInfo: checkInfo
                    })
                    return;
                }
            }

            const enemyKing = this.state.currentPlayerTurn === 'BLACK' ? WHITE.KING : BLACK.KING;
            const [enemyKingData] = findPieceOnBoard(this.props.chessboard, enemyKing);
            const checkmateInfo: CheckmateInfo | null = isCheckmate(tempChessboard, enemyKingData);
            this.props.chessboardMakeMove(this.state.selectedPiece?.tileIndex, tileIndex);
            //get previous player color if possible
            const currentPlayerTurn = this.props.movesLog.length > 0 
            ? (this.props.movesLog[this.props.movesLog.length-1].currentPlayer === 'WHITE' ? 'BLACK' : 'WHITE') 
            : this.state.currentPlayerTurn === 'WHITE' ? 'WHITE' : 'BLACK';
            
            this.props.addMoveToLog({
                gameStart: !this.state.isFirstMoveMade,
                gameEnd: !!checkmateInfo,
                oldPos: this.state.selectedPiece?.tileIndex,
                newPos: tileIndex,
                chessboard: tempChessboard, //save chessboard state after move was made
                currentPlayer: currentPlayerTurn,
            })
            this.setState({
                selectedPiece: null,
                possibleMoves: [],
                currentPlayerTurn: currentPlayerTurn === 'WHITE' ? 'BLACK' : 'WHITE',
                checkInfo: null,
                isFirstMoveMade: true,
                gameFinished: !!checkmateInfo,
                showWinner: !!checkmateInfo
            })

        }
    }

    onClearMessage() {

        if(this.state.gameFinished) {
            this.props.createChessboard();
            return this.setState({
                gameFinished: false,
                message: undefined,
                isFirstMoveMade: false
            })
        }
        return this.setState({message: undefined});
    }

    render() {

        let chessboard: ReactElement = <Spinner />
        if (this.props.chessboard !== null) chessboard = <Chessboard
            chessboardData={this.props.chessboard} //current state of chessboard
            currentPlayerTurn={this.state.currentPlayerTurn}
            onSelectPiece={this.setSelectedPiece.bind(this)} //when player clicked on piece
            selectedPiece={this.state.selectedPiece} //Piece, selected py player
            highlightedTiles={this.state.possibleMoves} //tiles on which player able to move piece (calculated after piece is selected)
            checkInfo={this.state.checkInfo} //pass info about if there is check to the king
            onMovePiece={this.onMovePiece.bind(this)}
            message={this.state.message}
            onClearMessage={this.onClearMessage.bind(this)}
            isGameFinished={this.state.gameFinished}>
            {!this.state.gameStarted && <OrangeButton onClick={() => this.setState({gameStarted: true})}>
                <span>Player VS Player</span>
             </OrangeButton>}
             {!this.state.gameStarted && <OrangeButton onClick={() => this.setState({message: 'This mode currently unavailable'})}>
                <span>Player VS AI</span>
             </OrangeButton>}
        </Chessboard>;

        return (
            chessboard
        )
    }
}

export default connector(GameManager)