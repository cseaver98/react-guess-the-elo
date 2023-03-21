import React from 'react';
import { countryAlpha } from '../countryCodes';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { parse } from '@mliebelt/pgn-parser'

var ChessWebAPI = require('chess-web-api');
var chessAPI = new ChessWebAPI({
    queue: true,
});
let countryCode = "IT";
let monthArchive = "";
let playUserName = "";
let year = "";
let month = "";
let pgn = "";
let blackElo = 0;
let whiteElo = 0;
let timeClass = "";
let game = null;
let moveList = new Array();
let moves = "";


let getRandomPlayer = async function (response, error) {
    playUserName = await response.body.players[Math.floor(Math.random() * response.body.players.length)];
    monthArchive = chessAPI.dispatch(chessAPI.getPlayerMonthlyArchives, getMonthArchive, [playUserName]);
}

let getMonthArchive = async function (response, error) {
    monthArchive = await response.body.archives[Math.floor(Math.random() * response.body.archives.length)];
    getMonthAndYear(monthArchive);
}

let getPGN = async function (response, error) {
    let res = await response.body.games[0];
    pgn = res.pgn;
    game = await parse(pgn, { startRule: "game" });
    getBlackElo(res);
    getWhiteElo(res);
    getTimeClass(res);

    moveList = pgnToArray(game);
}

function pgnToArray(game) {
    let arr = game.moves;
    for (const move of arr) {
        moveList.push(move.notation.notation);
    }
    moves = moveList.toString();
}

function getMonthAndYear(archive) {
    const arr = archive.split("/");
    year = arr[7];
    month = arr[8];
}

function getBlackElo(res) {
    blackElo = res.black.rating;
}

function getWhiteElo(res) {
    whiteElo = res.white.rating;
}

function getTimeClass(res) {
    timeClass = res.time_class;
}

const About = () => {
    return (
        <div>
            <Button onClick={() => {
                pgn = "loading";
                moveList = new Array();
                chessAPI.dispatch(chessAPI.getCountryPlayers, getRandomPlayer, [countryCode]);
                chessAPI.dispatch(chessAPI.getPlayerCompleteMonthlyArchives, getPGN, [playUserName, year, month]);

            }}>
                random
            </Button>
            {moves}

        </div>

    );
}

export default About;