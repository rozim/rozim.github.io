const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const dang = (2.0 * Math.PI) / 60.0;

var start = new Date().getTime();

var marks = [];
var last_mark = 0;

function random() {
    return Math.random();
}

function tick() {
    const now  = new Date().getTime();
    if ((now - start) > 60 * 1000) {
	console.log('reset');
	start = now;
	marks = [];
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
    // Not Movado :)
    ctx.arc(cx, cy, 20, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();    
    ctx.arc(cx, cy - 40, 14, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();    
    ctx.arc(cx, cy - 70, 10, 0, Math.PI * 2, true);
    ctx.fill();    
    //ctx.stroke();

    // 4 marks
    ctx.fillStyle = 'gray';
    ctx.beginPath();
    ctx.arc(cx + r - 14, cy, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();    
    ctx.arc(cx - r + 14, cy, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();        
    ctx.arc(cx, cy + r - 14, 10, 0, Math.PI * 2, true);
    ctx.fill();    
    ctx.beginPath();        
    ctx.arc(cx, cy - r + 14, 10, 0, Math.PI * 2, true);
    ctx.fill();
    
    // Outer border
    ctx.fillStyle = 'white';    
    ctx.strokeStyle = 'white';    
    ctx.beginPath();
    ctx.arc(cx, cy, r-1, 0, Math.PI * 2, true);
    ctx.stroke();

    // Ticking line
    ctx.fillStyle = 'white';    
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
	cx + Math.cos(ang) * (r - 1),
	cy + Math.sin(ang) * (r - 1));
    ctx.stroke();
    
    // Moving thing on ticking line.
    ctx.fillStyle = 'red';    
    ctx.beginPath();
    var mark_x = cx + Math.cos(ang) * (1 - pct) * (r - 5);
    var mark_y = cy + Math.sin(ang) * (1 - pct) * (r - 5);
    var mark_x2 = cx + Math.cos(ang) * (pct) * (r - 5);
    var mark_y2 = cy + Math.sin(ang) * (pct) * (r - 5);    
    if ((now - last_mark) >= 100) {
	marks.push([mark_x + random(), mark_y + random()]);
	marks.push([mark_x2 + 2 * random() - 1, mark_y2 + 2 * random() - 1]);	
	last_mark = now;
    }
    ctx.arc(
	mark_x,
	mark_y,
	5,
	0,
	Math.PI * 2,
	true);
    ctx.fill();

    // Spiral of marks
    ctx.fillStyle = 'silver';
    ctx.beginPath();    
    for (let mark of marks) {
	ctx.rect(mark[0], mark[1], 1, 1);
    }
    ctx.fill();

    ang += dang;
    
}

function do_onload() {
    console.log('loaded');
    tick();
    setInterval(tick, 50);
}
