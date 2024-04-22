
window.addEventListener('DOMContentLoaded', function(){
    fetch('popup.html') //ロード元URL
    .then(data => data.text())
    .then(html => document.getElementById('playButton').innerHTML = html) //ロード先ID指定
    .then(() => {
            //ロード後の処理を記述    
            function toggleVideo() {
                var video = document.getElementById("videoPlayer");
                var button = document.getElementById("playButton");
          
                if (video.paused) {
                  video.play();
                  button.style.display = "none"; // 再生時にボタンを非表示にする
                } else {
                  video.pause();
                }
              }             
        });
});