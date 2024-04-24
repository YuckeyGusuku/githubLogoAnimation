
document.addEventListener('DOMContentLoaded', function() {
  console :"hello";
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
    

    // ビデオコンテナを作成
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'videoWrapper ';
    videoContainer.appendChild(videoWrapper);
  
    // （color-box）を作成
    /*const colorBox = document.createElement('div');
    colorBox.className = 'colorBox';
    colorBox.id = 'colorBox';
    const backgroundImage = document.createElement('img');
    backgroundImage.src = chrome.runtime.getURL('images/background.png');
    colorBox.appendChild(backgroundImage)
    videoWrapper.appendChild(colorBox);*/
  
    // プレイボタンを作成
    const playButton = document.createElement('button');
    playButton.id = 'playButton';
    const playButtonImg = document.createElement('img');
    playButtonImg.src = chrome.runtime.getURL('images/githubbutton.png'); 
    playButton.appendChild(playButtonImg);
    videoWrapper.appendChild(playButton);
  
    // ビデオ要素を作成
    const videoPlayer = document.createElement('video');
    const videoSource = document.createElement('source');
    videoSource.src = chrome.runtime.getURL('images/Githubanime.mp4');
    videoSource.type = 'video/mp4';
    videoPlayer.appendChild(videoSource);
    videoWrapper.appendChild(videoPlayer);
    
  
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
  