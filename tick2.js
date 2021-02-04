const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');


var dang = (2.0 * Math.PI) / 60.0;

var start = new Date().getTime();

function tick() {
    const now  = new Date().getTime();
    if ((now - start) > 60 * 1000) {
	console.log('reset');
	start = now;
    }
    var pct = (now - start) / (60 * 1000);
    var ang = -Math.PI / 2 + (pct * Math.PI * 2);
    
    const w = ctx.canvas.clientWidth;
    const h = ctx.canvas.clientHeight;
    const cx = w / 2;
    const cy = h / 2;
    const r = w / 2;
    
    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, w, h);
    

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2.0;
    // Enlarging inner
    ctx.fillStyle = 'rgb(64, 64, 64)';
    ctx.beginPath();
    ctx.arc(cx, cy, r * pct, 0, Math.PI * 2, true);
    ctx.fill();    
    // Inner
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    // Outer
    ctx.fillStyle = 'white';    
    ctx.strokeStyle = 'white';    
    ctx.beginPath();
    ctx.arc(cx, cy, r-1, 0, Math.PI * 2, true);
    ctx.stroke();

    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
	cx + Math.cos(ang) * (r - 1),
	cy + Math.sin(ang) * (r - 1));
    ctx.stroke();

    ang += dang;
    
}

function do_onload() {
    console.log('loaded');
    tick();
    setInterval(tick, 50);
}
