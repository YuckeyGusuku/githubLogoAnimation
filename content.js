function adjustImageScale() {
  const pageWidth = document.documentElement.clientWidth;

  const scaleRatio = pageWidth / 100; // originalVideoWidthは動画の元の幅
  const newScale = 0.76 * scaleRatio; // 0.76は元のスケール値、これを動的に変更します
  const positiony = 29*scaleRatio;

  const colorBoxScaleRatio = pageWidth / 100; // originalVideoWidthは動画の元の幅
  const newColorBoxScale = 0.35 * colorBoxScaleRatio; // 0.35は元のスケール値
  const colorBoxpositiony = 92*scaleRatio;

  // .video-container imgのスケールを更新
  const imgs = document.querySelectorAll('.video-container img');
  imgs.forEach(img => {
      img.style.transform = ` scale(${newScale})`;
      img.style.left = `${positiony}px`;
  });

  // .video-container .color-box imgのスケールを更新
  const colorBoxImgs = document.querySelectorAll('.video-container .color-box img');
  colorBoxImgs.forEach(img => {
      img.style.transform = `scale(${newColorBoxScale})`;
      img.style.left = `${colorBoxpositiony}px`;
  });
}

document.addEventListener('DOMContentLoaded', function() {
    
    const cssLink = document.createElement("link");
    cssLink.href = chrome.runtime.getURL('css/centering.css'); 
    cssLink.type = "text/css";
    cssLink.rel = "stylesheet";
    document.head.appendChild(cssLink);
    

    // ビデオコンテナを作成
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';
  
    // 背景色boxを作成
    const backBox = document.createElement('div');
    backBox.className = 'fullScreenBackBox';
    videoContainer.appendChild(backBox);

    // （color-box）を作成
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    const backgroundImage = document.createElement('img');
    backgroundImage.src = chrome.runtime.getURL('images/background.png');
    colorBox.appendChild(backgroundImage);
    videoContainer.appendChild(colorBox);
  
    // プレイボタンを作成
    const playButton = document.createElement('button');
    playButton.id = 'playButton';
    const playButtonImg = document.createElement('img');
    playButtonImg.src = chrome.runtime.getURL('images/githubbutton.png'); 
    playButtonImg.alt = 'Play button';
    playButton.appendChild(playButtonImg);
    videoContainer.appendChild(playButton);
  
    // ビデオ要素を作成
    const videoPlayer = document.createElement('video');
    videoPlayer.id = 'videoPlayer';
    const videoSource = document.createElement('source');
    videoSource.src = chrome.runtime.getURL('images/Githubanime.mp4');
    videoSource.type = 'video/mp4';
    videoPlayer.appendChild(videoSource);
    videoContainer.appendChild(videoPlayer);
    // ページ読み込み時に一度サイズを調整
    adjustImageScale();
    
  
    // トグルビデオ機能をプレイボタンに追加
    playButton.onclick = function() {
      if (videoPlayer.paused) {
        videoPlayer.play();
        playButton.style.display = 'none'; // 再生時にボタンを非表示にする
      } else {
        videoPlayer.pause();
      }
    };
  
    // 作成したビデオコンテナをbodyの最初に追加
    document.body.insertBefore(videoContainer, document.body.firstChild);
    videoPlayer.addEventListener('ended', function() {
      videoContainer.style.opacity = '0';
      // フェードアウト後にビデオコンテナを非表示にする
      setTimeout(() => {
          videoContainer.style.display = 'none';
      }, 500); // 1秒後（フェードアウトの遷移時間に合わせる）
    });
});
  