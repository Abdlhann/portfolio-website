import { useEffect, useRef } from 'react';

const CITIES = [
  { lon: -74.0, lat:  40.7, color: '#6366f1' },
  { lon:  -0.1, lat:  51.5, color: '#8b5cf6' },
  { lon:   2.3, lat:  48.9, color: '#06b6d4' },
  { lon: 139.7, lat:  35.7, color: '#a855f7' },
  { lon: 114.2, lat:  22.3, color: '#6366f1' },
  { lon: 151.2, lat: -33.9, color: '#06b6d4' },
  { lon: 103.8, lat:   1.3, color: '#8b5cf6' },
  { lon:  77.2, lat:  28.6, color: '#6366f1' },
  { lon: -46.6, lat: -23.5, color: '#06b6d4' },
  { lon:  31.2, lat:  30.0, color: '#8b5cf6' },
  { lon: -99.1, lat:  19.4, color: '#a855f7' },
  { lon: 106.8, lat:  -6.2, color: '#8b5cf6' },
  { lon:  37.6, lat:  55.8, color: '#a855f7' },
  { lon: 121.5, lat:  31.2, color: '#6366f1' },
];

const ARC_PAIRS = [
  [0,1],[1,2],[3,4],[4,6],[6,11],[7,11],[8,0],
  [9,1],[10,0],[12,1],[13,3],[5,3],[2,12],
];

// Continent polygons [lon, lat]
const CONTINENTS = [
  // North America
  [[-168,72],[-140,70],[-120,74],[-85,75],[-65,83],[-20,83],[-15,70],
   [-55,50],[-52,47],[-68,44],[-70,42],[-75,35],[-80,25],[-87,15],
   [-92,15],[-105,20],[-110,23],[-118,32],[-125,38],[-130,55],
   [-140,58],[-155,60],[-165,65],[-168,72]],
  // South America
  [[-80,12],[-65,12],[-60,5],[-50,0],[-35,-5],[-35,-10],[-38,-15],
   [-40,-22],[-44,-23],[-48,-28],[-52,-33],[-58,-38],[-62,-45],
   [-65,-55],[-70,-55],[-75,-50],[-80,-40],[-80,-30],[-78,-10],[-80,0],[-80,12]],
  // Europe
  [[-10,36],[0,36],[10,38],[18,40],[28,42],[32,46],[30,50],[22,54],
   [15,58],[10,58],[5,62],[0,62],[-5,58],[-8,54],[-10,44],[-8,38],[-10,36]],
  // Africa
  [[-18,15],[-15,12],[-10,5],[0,5],[10,5],[20,12],[30,12],[42,12],
   [50,12],[52,8],[44,0],[40,-10],[35,-18],[32,-25],[28,-35],[18,-35],
   [14,-28],[12,-18],[10,-5],[8,5],[0,5],[-5,5],[-15,12],[-18,15]],
  // Asia
  [[28,42],[35,36],[40,36],[55,22],[60,20],[70,22],[80,28],[88,22],
   [100,5],[105,10],[110,0],[120,0],[130,0],[140,35],[145,44],[138,46],
   [130,50],[120,55],[100,55],[80,55],[60,55],[45,50],[35,50],[28,42]],
  // Australia
  [[114,-22],[118,-20],[122,-18],[130,-12],[136,-12],[138,-15],[142,-10],
   [148,-18],[152,-24],[152,-28],[148,-38],[144,-38],[138,-36],[132,-32],
   [124,-34],[118,-32],[114,-28],[114,-22]],
  // Greenland
  [[-70,76],[-50,83],[-20,83],[-15,76],[-25,70],[-45,60],[-55,60],[-65,65],[-70,76]],
];

function toXY(lon, lat, W, H) {
  return {
    x: ((lon + 180) / 360) * W,
    y: ((90 - lat) / 180) * H,
  };
}

export default function Globe3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // ── Background ──
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0,   '#eef2ff');
      bg.addColorStop(0.35,'#f5f3ff');
      bg.addColorStop(0.7, '#ecfeff');
      bg.addColorStop(1,   '#ede9fe');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Grid ──
      ctx.setLineDash([3, 8]);
      ctx.lineWidth = 0.7;
      ctx.strokeStyle = 'rgba(99,102,241,0.15)';
      for (let lon = -180; lon <= 180; lon += 30) {
        const { x } = toXY(lon, 0, W, H);
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let lat = -90; lat <= 90; lat += 30) {
        const { y } = toXY(0, lat, W, H);
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.setLineDash([]);

      // ── Equator & meridian ──
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(99,102,241,0.22)';
      ctx.beginPath(); ctx.moveTo(0, H/2); ctx.lineTo(W, H/2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H); ctx.stroke();

      // ── Continents ──
      CONTINENTS.forEach(coords => {
        ctx.beginPath();
        coords.forEach(([lon, lat], i) => {
          const { x, y } = toXY(lon, lat, W, H);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle   = 'rgba(165,180,252,0.40)';
        ctx.strokeStyle = 'rgba(99,102,241,0.40)';
        ctx.lineWidth   = 1;
        ctx.fill();
        ctx.stroke();
      });

      // ── Arcs ──
      ARC_PAIRS.forEach(([a, b], idx) => {
        const pa = toXY(CITIES[a].lon, CITIES[a].lat, W, H);
        const pb = toXY(CITIES[b].lon, CITIES[b].lat, W, H);
        const mx = (pa.x + pb.x) / 2;
        const my = (pa.y + pb.y) / 2 - H * 0.06;
        ctx.setLineDash([8, 7]);
        ctx.lineDashOffset = -((t * 40 + idx * 30) % 80);
        ctx.strokeStyle    = CITIES[a].color + '70';
        ctx.lineWidth      = 1.5;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.quadraticCurveTo(mx, my, pb.x, pb.y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.lineDashOffset = 0;
      });

      // ── City dots ──
      CITIES.forEach((city, i) => {
        const { x, y } = toXY(city.lon, city.lat, W, H);
        const pulse = 0.5 + 0.5 * Math.sin(t * 2.0 + i * 0.9);

        // glow
        const grd = ctx.createRadialGradient(x, y, 0, x, y, W * 0.012);
        grd.addColorStop(0, city.color + '50');
        grd.addColorStop(1, city.color + '00');
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(x, y, W * 0.012, 0, Math.PI * 2); ctx.fill();

        // pulse ring
        ctx.beginPath();
        ctx.arc(x, y, W * 0.005 + W * 0.004 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = city.color + '60';
        ctx.lineWidth   = 1.2;
        ctx.stroke();

        // core
        ctx.beginPath();
        ctx.arc(x, y, W * 0.003, 0, Math.PI * 2);
        ctx.fillStyle  = city.color;
        ctx.shadowColor = city.color;
        ctx.shadowBlur  = 10;
        ctx.fill();
        ctx.shadowBlur  = 0;
      });

      // ── Floating particles ──
      for (let i = 0; i < 55; i++) {
        const px = ((Math.sin(i * 127.1 + t * 0.22) + 1) / 2) * W;
        const py = ((Math.sin(i * 311.7 + t * 0.16) + 1) / 2) * H;
        const alpha = 0.10 + 0.12 * Math.sin(t + i);
        const r     = 1 + Math.abs(Math.sin(i * 53.3));
        const cols  = ['rgba(99,102,241,','rgba(139,92,246,','rgba(6,182,212,'];
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = cols[i % 3] + alpha + ')';
        ctx.fill();
      }

      t += 0.016;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
