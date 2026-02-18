var isNewTabUrl = function (url) {
  if (!url) return false;
  return url === 'chrome://newtab/' ||
         url === 'chrome://newtab' ||
         url === 'chrome://new-tab-page/' ||
         url === 'chrome://new-tab-page';
};

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  var url = changeInfo.url || tab.url;
  if (!isNewTabUrl(url)) return;

  chrome.storage.sync.get('url', function (items) {
    if (chrome.runtime.lastError) {
      console.log('[Pimp New Tab] storage error:', chrome.runtime.lastError.message);
      return;
    }
    if (!items.url) {
      console.log('[Pimp New Tab] no URL saved in storage');
      return;
    }
    console.log('[Pimp New Tab] redirecting to', items.url);
    chrome.tabs.update(tabId, { url: items.url });
  });
});
