var pct = document.getElementById('pct');
var f1 = document.getElementById('f1');
var f2 = document.getElementById('f2');
var f3 = document.getElementById('f3');

console.assert(pct);
console.assert(f1);
console.assert(f2);
console.assert(f3);

var ticker = 0;
var is_reset = true;
var start; // t = now1000();
var istart; //  = start;
var interval;  // = setInterval(tick, 1000);

function now1000() {
    return new Date().getTime();
}


function tick() {	
    var now = now1000();
    var dt = now - start;
    var pp = new Date(dt).toISOString().substr(14, 5);
    
    var idt = now - istart;
    var ipp = new Date(idt).toISOString().substr(14+3, 5-3);

    f1.innerHTML = ticker;
    f2.innerHTML = pp;	
    f3.innerHTML = ipp;
    
    pct.value = 100 * (idt / 10000);
    // console.log('pct', (idt/10000), (1000 * (idt/10000)));

    if (idt >= 10000) {
	istart = now1000();
	ticker += 1;
    }
}


function do_start() {
    if (interval == null) {
	do_stop();
    }
    if (is_reset) {
	is_reset = false;
	start = now1000();
	istart = start;
    }
    for (const el of [f1, f2, f3]) {
	el.style.backgroundColor = 'white';
    }
    interval = setInterval(tick, 1000)
}


function do_stop() {
    clearInterval(interval);
    interval = null;

    for (const el of [f1, f2, f3]) {
	el.style.backgroundColor = '#EEE';
    }
}


function do_reset() {
    for (const el of [f1, f2, f3]) {    
	el.innerHTML = '0';
    }
    ticker = 0;    
    pct.value = 0;
    is_reset = true;
}


function do_onload() {
    do_start();
}
