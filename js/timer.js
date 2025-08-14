// タイマー関連のDOM要素
const timerEl = $('#timer');
const startBtn = $('#start');
const resetBtn = $('#reset');

// タイマー状態
let t = 25 * 60; // 25分（秒）
let iv = null; // インターバルID
let phase = 'focus'; // 'focus' または 'break'

// 時間フォーマット関数
function format(time) {
  const m = Math.floor(time / 60);
  const s = time % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// 通知機能
function notify(msg) {
  try {
    if (Notification && Notification.permission === 'granted') {
      new Notification(msg);
    }
    // 無音に近い短音を再生
    const a = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABYAAAABAA==');
    a.play().catch(() => { });
  } catch (e) { }
}

// タイマー開始
startBtn.onclick = () => {
  if (iv) return; // 既に動作中の場合は何もしない

  // 通知許可をリクエスト
  if (Notification && Notification.permission === 'default') {
    Notification.requestPermission();
  }

  iv = setInterval(() => {
    t--;
    timerEl.textContent = format(t);

    if (t <= 0) {
      clearInterval(iv);
      iv = null;

      const nextPhase = phase === 'focus' ? 'break' : 'focus';

      if (phase === 'focus') {
        t = 5 * 60; // 5分休憩
        notify('休憩！5分リラックス');
      } else {
        t = 25 * 60; // 25分集中
        notify('再開！25分集中');
      }

      phase = nextPhase;

      // 花火エフェクトを呼び出し（confetti.jsで定義）
      if (typeof pokeConfetti === 'function') {
        pokeConfetti();
      }

      timerEl.textContent = format(t);
    }
  }, 1000);
};

// タイマーリセット
resetBtn.onclick = () => {
  clearInterval(iv);
  iv = null;
  phase = 'focus';
  t = 25 * 60;
  timerEl.textContent = format(t);
};

// 初期表示
timerEl.textContent = format(t);
