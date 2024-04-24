document.addEventListener('DOMContentLoaded', function() {
  // CSSファイルを追加
  const cssLink = document.createElement("link");
  cssLink.href = chrome.runtime.getURL('css/centering.css'); 
  cssLink.type = "text/css";
  cssLink.rel = "stylesheet";
  document.head.appendChild(cssLink);

  // ビデオコンテナの作成と設定
  const videoContainer = document.createElement('div');
  videoContainer.className = 'video-container';
  document.body.insertBefore(videoContainer, document.body.firstChild); // bodyの最初にビデオコンテナを追加
  
  // 背景色ボックスの作成と設定
  const backBox = document.createElement('div');
  backBox.className = 'fullScreenBackBox';
  videoContainer.appendChild(backBox);

  // ビデオラッパーの作成と設定
  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'videoWrapper';
  videoContainer.appendChild(videoWrapper);

  // ビデオプレイヤーとソースの設定
  const videoPlayer = document.createElement('video');
  videoPlayer.id = 'videoPlayer';
  const videoSource = document.createElement('source');
  videoSource.src = chrome.runtime.getURL('images/Githubanime.mp4');
  videoSource.type = 'video/mp4';
  videoPlayer.appendChild(videoSource);
  videoWrapper.appendChild(videoPlayer);

  // 背景イメージを設定
  const backgroundImage = document.createElement('img');
  backgroundImage.src = chrome.runtime.getURL('images/background.png');
  videoWrapper.appendChild(backgroundImage);

  // プレイボタンの作成と設定
  const playButton = createPlayButton(videoPlayer);
  videoWrapper.appendChild(playButton);
  
  // ビデオ終了時のイベントリスナー
  videoPlayer.addEventListener('ended', () => videoFadeOut(videoContainer));
});

// プレイボタンを作成し、トグル機能を設定する関数
function createPlayButton(videoPlayer) {
  const playButton = document.createElement('button');
  playButton.id = 'playButton';
  const playButtonImg = document.createElement('img');
  playButtonImg.src = chrome.runtime.getURL('images/githubbutton.png');
  playButton.appendChild(playButtonImg);

  playButton.onclick = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
      playButton.style.display = 'none'; // 再生時にボタンを非表示にする
    } else {
      videoPlayer.pause();
    }
  };
  return playButton;
}

// ビデオが終了した後にフェードアウトする関数
function videoFadeOut(videoContainer) {
  videoContainer.style.opacity = '0';
  setTimeout(() => {
    videoContainer.style.display = 'none';
  }, 500); // フェードアウトの遷移時間に合わせた待機時間
}
