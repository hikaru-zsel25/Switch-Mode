// ユーティリティ関数
const $ = s => document.querySelector(s);

// DOM要素の取得
const hello = $('#hello');
const nameInput = $('#name');
const saveName = $('#saveName');
const nextBtn = $('#next');
const quoteEl = $('#quote');
const clearBtn = $('#clear');

// ランダム一言データ
const quotes = [
  "今日は「できたこと」だけ見よ。",
  "焦らない。積み上げは逃げない。",
  "深呼吸1回でリセット完了。",
  "小さく始めて、大きく続ける。",
  "他人の速度は他人のもの。",
  "5分やったら勝ち。"
];

// 挨拶機能
function greet() {
  const n = localStorage.getItem('name');
  if (n) {
    hello.textContent = `ようこそ、${n}。`;
    nameInput.value = n;
  } else {
    hello.textContent = "ようこそ。";
  }
}

// 名前保存機能
saveName.onclick = () => {
  localStorage.setItem('name', nameInput.value.trim());
  greet();
  // 花火エフェクトを呼び出し（confetti.jsで定義）
  if (typeof pokeConfetti === 'function') {
    pokeConfetti();
  }
};

// ランダム一言機能
nextBtn.onclick = () => {
  quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
};

// データクリア機能
clearBtn.onclick = (e) => {
  e.preventDefault();
  localStorage.clear();
  nameInput.value = '';
  greet();
};

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  greet();
});
