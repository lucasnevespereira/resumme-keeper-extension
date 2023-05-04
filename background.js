chrome.runtime.onInstalled.addListener(() => {
    console.log("Service Worker initialized..")
    chrome.storage.local.set({
        cvs: []
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_cvs') {
        chrome.storage.local.get('cvs', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });
                return;
            }

            sendResponse({
                message: 'success',
                payload: data.cvs
            });
        });

        return true;
    } else if (request.message === 'add_cv') {
        chrome.storage.local.get('cvs', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });
                return;
            }

            const cvsArray = data.cvs;
            cvsArray.push(request.payload);

            chrome.storage.local.set({
                cvs: cvsArray
            }, () => {
                if (chrome.runtime.lastError) {
                    sendResponse({
                        message: 'fail'
                    });
                    return;
                }

                sendResponse({
                    message: 'success'
                });
            });
        });
        return true;
    }
});
