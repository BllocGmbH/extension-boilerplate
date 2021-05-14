console.log('This is the background page.');
console.log('Put the background scripts here.');

// console.log(sessionStorage)
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

    //  let currentDate = new Date();
    //  let cDay = currentDate.getDate();
    //  let cMonth = currentDate.getMonth() + 1;
    //  let cYear = currentDate.getFullYear();
    //  let cHour = currentDate.getHours();
    //  let cMinute = currentDate.getMinutes();
    //  let cSecond = currentDate.getSeconds();

    //  console.log( cHour + ":" +cMinute+ ":"+ cSecond )

    // let currentDate = Date.now();

    // console.log(currentDate, current.id);

    // function timeStampCollector(time) {
    //   let currentDate = Date.now();
    //   let currentURL = current.url;
    //   let urlTime = [];

    //   if (currentURL.indludes('https://www.google.com/')) {
    //     urlTime.push(currentDate);
    //     console.log(urlTime);
    //   }
    //   return urlTime;
    // }
    // timeStampCollector();

  


    function timeStampCollector() {
        let currentDate = Date.now();
        let currentURL = current.url;
        let urlTime = [];
  
        if (currentURL === 'https://www.google.com/') {

        urlTime.push(currentDate);
        return urlTime

        } else {
           return"no"
        }
      
      }
      console.log(timeStampCollector())

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

chrome.tabs.onUpdated.addListener(({ tabID, changeInfo }) => {
  chrome.tabs.query(
    { active: true, currentWindow: true, status: 'complete' },
    function (tabs) {
      // Toggle the pinned status
      var current = tabs[0];
      console.log(current);
      console.log(current.url);
      //  console.log(current.windowId);
    }
  );
});

//    chrome.tabs.onChanged.addListener(({ tabID, changeInfo, }) => {
//     chrome.tabs.query({ active: true, currentWindow: true, status: "complete" }, function (tabs) {
//      // Toggle the pinned status
//      var current = tabs[0];
//      console.log(current);
//      console.log(current.url);
//     //  console.log(current.windowId);

//     });
//    });

// chrome.sessions.Session.addListener(({sessionID})=>{
// chrome.sessions.query({})
// })

// chrome.sessions.onChanged.addListener() => {}
