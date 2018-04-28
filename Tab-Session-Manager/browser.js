
var Browser = {
    isChromeExt: true,
    isFirefoxExt: false,
    isEdgeExt: false,

    api: null,


/***
    tabs_query: function(query) {
      if (Browser.isChromeExt) {
        return new Promise(function (resolve, reject) {
          chrome.tabs.query(query, function(tabs) {
            resolve(tabs);
          })
        })
      } else {
        return browser.tabs.query(query);
      }
    },
***/
/****
    runtime_sendMessage: function(extensionId, message, options) {
      if (Browser.isChromeExt) {
        return new Promise(function (resolve, reject) {
          if (message === undefined) {
            message = extensionId 
//??alert("sendMessage= "+ message+"|"+JSON.stringify(extensionId))
            chrome.runtime.sendMessage(message, function(resp) {
//??alert("sendMessage_resp="+JSON.stringify(message)+"||"+JSON.stringify(resp))
                resolve(resp)
            })
          } else if (options===undefined) {
            chrome.runtime.sendMessage(extensionId, message, function(resp) {
                resolve(resp)
            })
          } else {
            chrome.runtime.sendMessage(extensionId, message, options,
              function(resp) {
                resolve(resp)
            })
          }
        })
      } else {
        return browser.runtime.sendMessage(extensionId, message, options)
      }
    },
***/
/****
    windows_get: function(windowId, getInfo) {
      if (Browser.isChromeExt) {
        return new Promise(function (resolve, reject) {
          if (getInfo === undefined) {
            chrome.windows.get(windowId, function(win) {
                resolve(win)
            })
          } else {
            chrome.windows.get(windowId, getInfo,
              function(win) {
                resolve(win)
            })
          }
        })
      } else {
        return browser.windows.get(windowId, getInfo)
      }
    },
*****/
/***
    windows_getCurrent: function(getInfo) {
      if (Browser.isChromeExt) {
        return new Promise(function (resolve, reject) {
          chrome.windows.getCurrent(getInfo,
            function(win) {
              resolve(win)
          })
        })
      } else {
        return browser.windows.getCurrent(getInfo)
      }
    },
***/
/****
    windows_getAll: function(getInfo) {
      if (Browser.isChromeExt) {
        return new Promise(function (resolve, reject) {
          chrome.windows.getAll(getInfo,
            function(win) {
              resolve(win)
          })
        })
      } else {
        return browser.windows.getAll(getInfo)
      }
    },
****/
/***
    windows_create: function(createData) {
      if (Browser.isChromeExt) {
        return new Promise(function (resolve, reject) {
          chrome.windows.create(createData,
            function(win) {
              resolve(win)
          })
        })
      } else {
        return browser.windows.create(createData)
      }
    }
****/

}

try {
  Browser.api = (Browser.isChromeExt) ? chrome : browser;
} catch(e) {}
