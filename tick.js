const pct = document.getElementById('pct');
const f1 = document.getElementById('f1');
const f2 = document.getElementById('f2');
const f3 = document.getElementById('f3');
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const time_len = 10000;

console.assert(pct);
console.assert(f1);
console.assert(f2);
console.assert(f3);
console.assert(canvas);
console.assert(ctx);

var ticker = 0;
var is_reset = true;
var start; // t = now1000();
var istart; //  = start;
var interval;  // = setInterval(tick, 1000);
var fill_interval;


function now1000() {
    return new Date().getTime();
}


function tick() {	
    const now = now1000();
    const dt = now - start;
    const pp = new Date(dt).toISOString().substr(14, 5);
    
    const idt = now - istart;
    const ipp = new Date(idt).toISOString().substr(14+3, 5-3);

    f1.innerHTML = ticker;
    f2.innerHTML = pp;	
    f3.innerHTML = ipp;
    
    pct.value = idt;
    // console.log('pct', (idt/10000), (1000 * (idt/10000)));

    if (idt >= time_len) {
	istart = now1000();
	ticker += 1;
	ctx.fillStyle = ['black',
			 'red',
			 'blue',
			 'green',
			 'purple',
			 'white'][ticker % 6];
    }
}

function fill_tick() {
    //const size = 1;
    //const x = size * (Math.random() * (200 / size)) - size;
    //const y = size * (Math.random() * (200 / size)) - size;
    //ctx.fillRect(x, y, size, size);
    ctx.fillRect(Math.random() * 200,
		 Math.random() * 200,
		 1,
		 1);
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
    interval = setInterval(tick, 100);
    fill_interval = setInterval(fill_tick, 10);
}


function do_stop() {
    clearInterval(interval);
    clearInterval(fill_interval);    
    interval = null;
    fill_interval = null;

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
    pct.max = time_len;
    do_start();

}
