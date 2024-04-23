// タブの状態を追跡するオブジェクト
let tabLoadState = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // タブが完全に読み込まれたときに実行
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('https://github.com/')) {
    // タブが以前に実行されたかどうかをチェック
    if (!tabLoadState[tabId]) {
      // タブでスクリプトを実行していない場合、実行する
      chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: ['content.js']
      });
      // タブの状態を更新
      tabLoadState[tabId] = true;
    }
  }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  // タブが閉じられたときに、そのタブの状態を削除
  delete tabLoadState[tabId];
});

chrome.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
  // タブが置き換えられた場合、古いタブの状態を削除し、新しいタブを追跡
  delete tabLoadState[removedTabId];
  tabLoadState[addedTabId] = false;
});
