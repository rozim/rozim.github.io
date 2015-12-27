
$(document).ready(on_ready);

var stockfish;
var board;
var game;
function on_message(event) {

  var msg = event.data;
  //console.log('msg: ', msg);
  $('#log').append(msg + '\n');
  $("#btn_setup").click(on_btn_setup);
}

function on_btn_setup() {
  console.log('setup');
  board.position('start');
}

function on_drop(source, target) {
  var move = game.move({
   from: source,
   to: target,
   promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });
  //on_change();
}

function on_change() {
  //board.position(game.fen());
  $('#log').html('');
  start_searching();
  var color = 'White';
  if (game.turn() == 'b') { color = 'Black'; }
  $('#to_move').html(color);
  $('#fen').val(game.fen());
}

function start_searching() {
  stockfish.postMessage('position fen ' + game.fen());
  stockfish.postMessage('go depth 12');  
}

function on_ready() {
  console.log('ready');
  game = new Chess();
  game.reset();
  var cfg = {
    onDrop: on_drop,
    draggable: true,
    dropOffBoard: 'trash',
    showNotation: false,
    position: 'start',
    onChange: on_change
  };
  board = new ChessBoard('board', cfg);
  stockfish = new Worker('stockfish.js');
  stockfish.onmessage = on_message;
  on_change();
}