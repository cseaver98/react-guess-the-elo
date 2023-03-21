import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Chessboard } from "react-chessboard";
import Chess from "chess.js";
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

export default function Play() {
    const [game, setGame] = useState(new Chess());

    function safeGameMutate(modify) {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    }

    function makeAMove(move) {
        const gameCopy = { ...game };
        const result = gameCopy.move(move);
        setGame(gameCopy);
        return result; // null if the move was illegal, the move object if the move was legal
    }

    function makeRandomMove() {
        const possibleMoves = game.moves();
        if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return; // exit if the game is over
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeAMove(possibleMoves[randomIndex]);
    }

    function onDrop(sourceSquare, targetSquare) {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return false;
        setTimeout(makeRandomMove, 200);
        return true;
    }

    return (
        <div>
            <div style={{ width: "50%", margin: "auto" }}>
                <Chessboard
                    id="StyledBoard"
                    position={game.fen()}
                    onPieceDrop={onDrop}
                    customBoardStyle={{
                        borderRadius: "4px",
                        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                    }}
                    customDarkSquareStyle={{ backgroundColor: "#779952" }}
                    customLightSquareStyle={{ backgroundColor: "#edeed1" }}
                />;
            </div>
            <div>

                <IconButton
                    onClick={() => {
                        safeGameMutate((game) => {
                            game.undo();
                        });
                    }}>
                    <KeyboardDoubleArrowLeftIcon />
                </IconButton>

                <IconButton
                    onClick={() => {
                        makeRandomMove();
                    }}>
                    <KeyboardDoubleArrowRightIcon />
                </IconButton>
            </div>
        </div>
    );
}