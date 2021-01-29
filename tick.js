f1 = document.getElementById('f1');
f1.innerHTML = 'yes'

var ticker = 0;
var start = new Date().getTime();

function tick() {
  console.log('tick');
  var now = new Date().getTime();
  var dt = now - start;
  var pp = new Date(dt).toISOString().substr(14, 5)
  ticker += 1;
  f1 = document.getElementById('f1');
	f1.innerHTML = ticker + ' ' + pp;
}

var interval = setInterval(tick, 1000);

function do_start() {
  if (interval == null) {
    do_stop();
  }
  console.log('really starting');
  nterval = setInterval(tick, 1000)
}

function do_stop() {
  console.log('stopping');
  clearInterval(interval);
  interval = null;
}
  
