// semicircles.js

// ===== 定数・変数定義 =====
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let scale = 1;              // #この行を追加: ズーム倍率
let lastN = 3;              // #この行を追加: 最後に描画した n を保持

// ===== 初期化処理 =====
window.addEventListener('DOMContentLoaded', () => {
  const drawBtn = document.getElementById('drawBtn');
  drawBtn.addEventListener('click', handleDraw);
  
  canvas.addEventListener('wheel', handleWheel);  // #この行を追加: ホイールイベント登録
  
  console.log('初期化完了: ボタンクリック＆ホイール待ち');  // デバッグ用
});

/**
 * handleDraw: 「描画」ボタン押下時のハンドラ
 */
function handleDraw() {
  lastN = parseInt(document.getElementById('countInput').value, 10);  // #この行を変更: lastN に保存
  console.log(`描画開始: n = ${lastN}`);  // デバッグ用
  redraw();
}

/**
 * handleWheel: マウスホイールでズームイン／ズームアウト
 * @param {WheelEvent} event 
 */
function handleWheel(event) {  // #この関数を追加
  event.preventDefault();
  const zoomFactor = 1.1;
  if (event.deltaY < 0) {
    scale *= zoomFactor;
  } else {
    scale /= zoomFactor;
  }
  console.log(`ズーム: scale = ${scale.toFixed(2)}`);  // デバッグ用
  redraw();
}

/**
 * redraw: Canvas 全体を再描画（ズーム・クリア・半円描画）
 */
function redraw() {  // #この関数を追加
  clearCanvas();
  
  ctx.save();  // 変換状態を保存
  // 底辺を固定してズームするための変換: scale、Yオフセットを調整
  ctx.setTransform(scale, 0, 0, scale, 0, canvas.height * (1 - scale));  // #この行を追加
  
  drawLargeSemiCircle();
  drawSmallSemiCircles(lastN);
  
  ctx.restore();  // 変換状態を復元
}

/**
 * clearCanvas: Canvas 全体をクリアする
 */
function clearCanvas() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);  // #この行を追加: クリア前に変換をリセット
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log('Canvas をクリア');  // デバッグ用
}

/**
 * drawLargeSemiCircle: 青い大きな半円を描画
 */
function drawLargeSemiCircle() {
  const radius = canvas.width / 2;
  const centerX = canvas.width / 2;
  const centerY = canvas.height;
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  ctx.stroke();
  console.log('大きな半円（青）を描画');  // デバッグ用
}

/**
 * drawSmallSemiCircles: 赤い小さな半円を n 個描画
 * @param {number} n
 */
function drawSmallSemiCircles(n) {
  const diameter = canvas.width;
  const cellWidth = diameter / n;
  const r = cellWidth / 2;
  const baseY = canvas.height;
  
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 1.5;
  
  for (let i = 0; i < n; i++) {
    const cx = r + cellWidth * i;
    ctx.beginPath();
    ctx.arc(cx, baseY, r, Math.PI, 0, false);
    ctx.stroke();
    console.log(`小さな半円 ${i+1}/${n} を描画 (中心: ${cx.toFixed(1)}, 半径: ${r.toFixed(1)})`);  // デバッグ用
  }
}
