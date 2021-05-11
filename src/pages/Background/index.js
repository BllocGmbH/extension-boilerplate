console.log('This is the background page.');
console.log('Put the background scripts here.');
console.log('RUTA');
console.log("build 1");
// var currentTimestamp = date.getTime();
// console.log(currentTimestamp);


chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
     // Toggle the pinned status
     var current = tabs[0];
     console.log(current);
     console.log(current.status);
     console.log(current.url || current.pendingUrl);
     console.log(current.windowId);

    });


   });


//    chrome.tabs.onAttached.addListener(({ tabId, attachInfo }) => {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//      // Toggle the pinned status
//      var current = tabs[0];
//      console.log(current);
//      console.log(current.status);
//      console.log(current.url || current.pendingUrl);
//      console.log(current.windowId);

//     });
//    });



//    chrome.tabs.onRemoved.addListener(({ tabId, removeInfo }) => {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//      // Toggle the pinned status
//      var current = tabs[0];
//      console.log(current);
//      console.log(current.status);
//      console.log(current.url || current.pendingUrl);
//      console.log(current.windowId);

//     });
//    });


//    chrome.tabs.onCreated.addListener(({ tab }) => {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//      // Toggle the pinned status
//      var current = tabs[0];
//      console.log(current);
//      console.log(current.status);
//      console.log(current.url || current.pendingUrl);
//      console.log(current.windowId);

//     });
//    });


   chrome.tabs.onUpdated.addListener(({ tabID, changeInfo, }) => {
    chrome.tabs.query({ active: true, currentWindow: true, status: "complete" }, function (tabs) {
     // Toggle the pinned status
     var current = tabs[0];
     console.log(current);
     console.log(current.url);
    //  console.log(current.windowId);

    });
   });


