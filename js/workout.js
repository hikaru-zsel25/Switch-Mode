// DOM要素の取得（$関数はmain.jsで既に定義済み）
const logWorkoutBtn = document.querySelector('#logWorkout');
const workoutLogContainer = document.querySelector('#workoutLog');

// 筋トレログのデータ管理
function getWorkoutLogs() {
  const logs = localStorage.getItem('workoutLogs');
  return logs ? JSON.parse(logs) : [];
}

function saveWorkoutLogs(logs) {
  localStorage.setItem('workoutLogs', JSON.stringify(logs));
}

// ログを追加する機能
function addWorkoutLog() {
  console.log('🏋️‍♂️ ログ追加ボタンがクリックされました');
  
  const exercise = prompt('筋トレの種類を入力してください（例：腕立て伏せ、スクワット）');
  if (!exercise) {
    console.log('❌ 筋トレの種類が入力されませんでした');
    return;
  }
  
  const reps = prompt('回数を入力してください（例：20）');
  if (!reps) {
    console.log('❌ 回数が入力されませんでした');
    return;
  }
  
  const sets = prompt('セット数を入力してください（例：3）');
  if (!sets) {
    console.log('❌ セット数が入力されませんでした');
    return;
  }

  const newLog = {
    id: Date.now(),
    exercise: exercise.trim(),
    reps: reps.trim(),
    sets: sets.trim(),
    date: new Date().toLocaleString('ja-JP')
  };

  console.log('📝 新しいログ:', newLog);

  const logs = getWorkoutLogs();
  logs.unshift(newLog); // 最新のログを先頭に追加
  saveWorkoutLogs(logs);
  displayWorkoutLogs();
  
  console.log('✅ ログが保存されました');
  
  // 花火エフェクトを呼び出し（confetti.jsで定義）
  if (typeof pokeConfetti === 'function') {
    pokeConfetti();
  }
}

// ログを削除する機能
function deleteWorkoutLog(id) {
  const logs = getWorkoutLogs();
  const updatedLogs = logs.filter(log => log.id !== id);
  saveWorkoutLogs(updatedLogs);
  displayWorkoutLogs();
}

// 画面表示を更新する機能
function displayWorkoutLogs() {
  const logs = getWorkoutLogs();
  
  if (logs.length === 0) {
    workoutLogContainer.innerHTML = '<p style="color: var(--muted); font-style: italic;">まだログがありません。頑張って記録しよう！</p>';
    return;
  }

  const logsHtml = logs.map(log => `
    <div class="workout-item" onclick="deleteWorkoutLog(${log.id})" style="
      background: rgba(255,255,255,0.05);
      border-radius: 8px;
      padding: 10px;
      margin: 8px 0;
      cursor: pointer;
      transition: background 0.2s;
      border-left: 3px solid var(--acc);
    " onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <strong style="color: var(--acc);">${log.exercise}</strong>
        <small style="color: var(--muted);">${log.date}</small>
      </div>
      <div style="margin-top: 4px; color: var(--fg);">
        ${log.reps}回 × ${log.sets}セット
      </div>
    </div>
  `).join('');

  workoutLogContainer.innerHTML = logsHtml;
}

// ログ削除をグローバル関数として定義（HTML onclick用）
window.deleteWorkoutLog = deleteWorkoutLog;

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏋️‍♂️ workout.js が読み込まれました');
  
  // ボタンイベントの設定
  if (logWorkoutBtn) {
    console.log('✅ ログボタンが見つかりました');
    logWorkoutBtn.onclick = addWorkoutLog;
  } else {
    console.error('❌ ログボタンが見つかりません。HTMLのIDを確認してください。');
  }
  
  // ログコンテナの確認
  if (workoutLogContainer) {
    console.log('✅ ログコンテナが見つかりました');
  } else {
    console.error('❌ ログコンテナが見つかりません。HTMLのIDを確認してください。');
  }
  
  // 初期表示
  displayWorkoutLogs();
});