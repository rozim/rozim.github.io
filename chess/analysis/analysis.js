
$(document).ready(on_ready);

var stockfish;
var board;
var wtm = true;

function on_ready() {
  console.log('ready');

  var cfg = {
    draggable: true,
    dropOffBoard: 'trash',
    showNotation: false,
    sparePieces: true,
    position: 'start',
  };
  board = new ChessBoard('board', cfg);
  stockfish = new Worker('stockfish.js');
  stockfish.onmessage = on_message;

  $('#btn_setup').click(function() { board.start(); });
  $('#btn_clear').click(function() { board.clear(); });
  $('#btn_wtm').click(function() { wtm = true; });
  $('#btn_btm').click(function() { wtm = false; });
  $('#btn_go').click(on_btn_start);
}

function on_message(event) {
  var msg = event.data;
  console.log('message: ', msg);
  $('#log').append(msg + '\n');

}

function on_btn_start() {
  console.log('on_btn_start');
  $('#log').html('');
  stockfish.postMessage('position fen ' + board.fen() + ' ' + (wtm ? 'w' : 'b'));
  stockfish.postMessage('go depth ' + $('#depth').val());
}



