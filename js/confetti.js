// 花火エフェクト関連のDOM要素
const canvas = $('#conf');
const ctx = canvas.getContext('2d');
const boomBtn = $('#boom');

// キャンバスサイズ
let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;

// リサイズ対応
addEventListener('resize', () => {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
});

// パーティクル配列
let particles = [];

// 花火エフェクト生成
function pokeConfetti(x = W / 2, y = H / 2) {
  for (let i = 0; i < 120; i++) {
    particles.push({
      x, y,
      vx: (Math.random() * 2 - 1) * (4 + Math.random() * 3),
      vy: (Math.random() * -1) * (5 + Math.random() * 4) - 2,
      g: 0.15 + Math.random() * 0.1,
      life: 60 + Math.random() * 30,
      c: `hsl(${Math.random() * 360}, 90%, 60%)`
    });
  }
}

// アニメーションループ
function step() {
  ctx.clearRect(0, 0, W, H);
  particles = particles.filter(p => p.life > 0);

  for (const p of particles) {
    p.life--;
    p.vy += p.g;
    p.x += p.vx;
    p.y += p.vy;

    ctx.fillStyle = p.c;
    ctx.globalAlpha = Math.max(0, p.life / 90);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(step);
}

// ボタンクリックで花火
boomBtn.onclick = () => pokeConfetti();

// 画面クリックで花火（ボタンやカード以外）
document.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON' && !e.target.closest('.card')) {
    pokeConfetti(e.clientX, e.clientY);
  }
});

// アニメーション開始
step();
