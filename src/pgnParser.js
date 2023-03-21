
function getBlackElo(pgn) {
    const regex = /\[BlackElo "(\d+)"\]/;
    const match = pgn.match(regex);
    return match ? parseInt(match[1]) : null;
}

function getWhiteElo(pgn) {
    const regex = /\[WhiteElo "(\d+)"\]/;
    const match = pgn.match(regex);
    if (match) {
        return parseInt(match[1]);
    } else {
        return null;
    }
}

function getTimeControl(str) {
    const regex = /TimeControl\s+"(\d+)"/;
    const match = str.match(regex);
    return match ? match[1] : null;
}


export { getBlackElo, getWhiteElo, getTimeControl };