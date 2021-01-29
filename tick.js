var pct = document.getElementById('pct');

var ticker = 0;


function now1000() {
  return new Date().getTime();
}

var start = now1000();
var istart = start;

function tick() {
  console.log('tick');
	
  var now = now1000();
  var dt = now - start;
  var pp = new Date(dt).toISOString().substr(14, 5);
	
  var idt = now - istart;
  var ipp = new Date(idt).toISOString().substr(14, 5);
	
  ticker += 1;
  var f1 = document.getElementById('f1');
  f1.innerHTML = ticker + ' ' + pp;
	
  var f2 = document.getElementById('f2');
  f2.innerHTML = ipp;
	
  console.log('idt', idt, ' ', istart);
	
  if (idt >= 10000) {
    istart = now1000();
  }
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
  
