/* Copyright (c) 2017-2018 Sienori All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

function returnReplaceParameter(url) {
    let parameter = {};
    if (url.indexOf(Browser.api.runtime.getURL("replaced/replaced.html")) === 0) {
        parameter.isReplaced = true;
        let paras = url.split('?')[1].split('&');
        for (let p of paras) {
            parameter[p.split('=')[0]] = decodeURIComponent(p.split('=')[1]);
        }
    } else {
        parameter.isReplaced = false;
    }

    return parameter;
}

function returnReplaceURL(state, title, url, favIconUrl) {

    let retUrl = "replaced/replaced.html" +
        "?state=" + encodeURIComponent(state) +
        "&title=" + encodeURIComponent(title) +
        "&url=" + encodeURIComponent(url) +
        "&favIconUrl=" + encodeURIComponent(favIconUrl);

    //Reader mode
    if (url.substr(0, 17) == 'about:reader?url=') {
        retUrl = "replaced/replaced.html" +
            "?state=" + encodeURIComponent(state) +
            "&title=" + encodeURIComponent(title) +
            "&url=" + url.substr(17) +
            "&favIconUrl=" + encodeURIComponent(favIconUrl) +
            "&openInReaderMode=true";
    }

    return retUrl;
}

async function replacePage() {
    if (IsOpeningSession) return;

    const info = await Browser.api.tabs.query({
        active: true,
        currentWindow: true
    });
    if (info[0] == undefined) return;

    if (info[0].status != "complete") {
        setTimeout(replacePage, 500);
        return;
    }

    const parameter = returnReplaceParameter(info[0].url);

    if (parameter.isReplaced && parameter.state == "redirect") {
        let updateProperties = {};
        updateProperties.url = parameter.url;
        if (BrowserVersion >= 57) updateProperties.loadReplace = true;

//??
        Browser.api.tabs.update(info[0].id, updateProperties).then(() => {
            if (parameter.openInReaderMode == "true") {
                toggleReaderMode(info[0].id);
            }
        }).catch(() => {
            updateProperties.url = returnReplaceURL('open_faild', parameter.title, parameter.url, parameter.favIconUrl);
//??
            Browser.api.tabs.update(info[0].id, updateProperties);
        })
    }
}

function toggleReaderMode(id) {
//??
    Browser.api.tabs.get(id).then((info) => {
        if (info.status != 'complete') {
            setTimeout(() => {
                toggleReaderMode(id);
            }, 500);
            return;
        }
//??
        if (info.isArticle) Browser.api.tabs.toggleReaderMode(id);
    })
}
