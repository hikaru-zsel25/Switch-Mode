// テーマ切り替え関連のDOM要素
const themeToggle = $('#themeToggle');

// テーマ切り替え機能
themeToggle.onclick = () => {
  const dark = document.documentElement.classList.toggle('light-off');
  // 必要に応じてここに追加の処理を記述
};
