let current_search_engine = '';

const search_engines = {
    google: 'https://www.google.com/search?q=',
    startpage: 'https://www.startpage.com/do/dsearch?query=',
    duckduckgo: 'https://duckduckgo.com/?q=',
    ecoasia: 'https://www.ecosia.org/search?q=',
    bing: 'https://www.bing.com/search?q=',
    dictionary: 'https://www.google.com/search?q=google+dictionary&rlz=1C1GIGM_enIN819IN819&sxsrf=AOaemvIYVsXVi0uqB8s2olWfHXYJ5K2edQ%3A1637229972289&ei=lCWWYbDjEI_b9QPa_pSgBw&oq=google+dictionar&gs_lcp=Cgdnd3Mtd2l6EAMYADIKCAAQgAQQhwIQFDIFCAAQgAQyBQgAEIAEMggIABCABBCxAzIKCAAQgAQQhwIQFDILCAAQgAQQsQMQgwEyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgcIIxCwAxAnOgcIABBHELADOgcIABCwAxBDOgQIIxAnOggIABCxAxCRAjoHCCMQ6gIQJzoKCAAQsQMQgwEQQzoNCC4QsQMQxwEQ0QMQQzoKCC4QxwEQ0QMQQzoHCAAQsQMQQzoTCAAQgAQQhwIQsQMQgwEQyQMQFDoFCAAQkgM6BAgAEEM6CwguEIAEELEDEIMBOgUIABCRAjoICC4QgAQQsQM6BwgAEIAEEApKBAhBGABQzQRY1C1g3zhoAnACeASAAYACiAHoGpIBBjAuMjAuMpgBAKABAbABCsgBCsABAQ&sclient=gws-wiz#dobs=',
    translate: 'https://translate.google.co.in/?sl=auto&tl=hi&text=',
    login: 'https://www.google.com/search?q='
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (/^http/.test(tab.url) && changeInfo.status === 'complete') {
        chrome.tabs.executeScript(tabId, { file: './scripts/foreground.js' }, () => {
            console.log('The foreground script has been injected.');
        });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'save_search_engine') {
        current_search_engine = request.payload;
        sendResponse({ message: 'success' });
    } else if (request.message === 'get_current_search_engine') {
        sendResponse({ payload: current_search_engine });
    } else if (request.message === 'search') {
        chrome.tabs.create({
            active: true,
            url: `${search_engines[current_search_engine]}${request.payload}`
        });
    }
});
chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
  
      chrome.tabs.sendMessage(tab.id, {"message": "clicked_browser_action"});
  
  });
/* chrome.browserAction.onClicked.addListener (function() {
    chrome.tabs.create({'url':"chrome://newtab"})
   }); */