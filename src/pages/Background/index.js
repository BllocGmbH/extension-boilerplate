console.log('This is the background page.');
console.log('Put the background scripts here.');

// console.log(sessionStorage)
// var currentTimestamp = date.getTime();
// console.log(currentTimestamp);

// ->>>>>>>>>>>>>>>>>>>>> chrome.sessions.Session.addListener.lastModified

const allTimeStamps = [Date.now()];
const domainTimes = {};
const tabMatrix = [];
var domain = location.host;
const allDomains = [`${domain}`];
var newElapsedTime;

function tabsQuery(tabs) {
  var date = [Date.now()];

  allTimeStamps.push(date);

  // Perform subtraction - elapsed time spent on the latest tab
  var latestTimestamp = allTimeStamps[allTimeStamps.length - 1];
  var secondLatestTimestamp = allTimeStamps[allTimeStamps.length - 2];
  //var newElapsedTime = latestTimestamp - secondLatestTimestamp;
  var newElapsedTime = (((latestTimestamp - secondLatestTimestamp) % 60000) / 1000).toFixed(0);
  console.log(newElapsedTime);  
  


  var current = tabs[0];
  console.log('this is current.url ------------->', current.url);
  

  var currentURL = current.url;

  var domain = currentURL
    .replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .split(/[/?#]/)[0]
    // .split('.').slice(1).join('.');
    // .substring(0, currentURL.indexOf(".")+1);

console.log('this is domain ------------->', domain)

  // Assign time to previous domain (when new tab is accessed)
  var previousDomain = allDomains[allDomains.length - 1];
  allDomains.push(domain);
  var tabMatrix = [];

  function timeStampCollector() {
    domainTimes[previousDomain] = domainTimes[previousDomain] || {
      timeStamps: [],
    };
    const thisDomainTimes = domainTimes[previousDomain];

    if (allDomains.includes(previousDomain) && currentURL.includes(domain)) {
      // if this domain is included in domain list, push it to tab Matrix
      thisDomainTimes.timeStamps.push(newElapsedTime);

      // let sum = thisDomainTimes.timeStamps.reduce((accumulator, currentValue) => {
      //   return accumulator + currentValue;
      // });

      // console.log("this domain times summed up" + thisDomainTimes.timeStamps)

      
      
      return [domainTimes];
      

    }


      // then sum up the time for each domain each time the time is updated
    // let sum = thisDomainTimes.timeStamps.reduce((accumulator, currentValue) => {

    //   return accumulator + currentValue;
    // });
   

   
  }

  console.log(timeStampCollector());
  
}

// When tab is activated/selected. SetTimeout required for updated ChomeV to avoid runtime bug.

// chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
//   chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabsQuery);
// });


chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
  setTimeout(() => { 
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabsQuery);
  }, 500); 
});


// When tab is updated, eg: new link.
chrome.tabs.onUpdated.addListener(({ tabID, changeInfo, tab }, tabs) => {
  if (tabs.status === 'complete') {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabsQuery);
  }
});

// When tab is detached or moved between windows
chrome.tabs.onAttached.addListener(({ tabId, detachInfo }) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabsQuery);
  console.log("this is DETACHED window")
});


// When tab is attached to another window
chrome.tabs.onAttached.addListener(({ tabId, attachInfo }) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabsQuery);
  console.log("this is ATTACHED window")

});

// When tab is moved WITHIN a window. Pushes time into array spent in tab before and after the move, ance the tab is not active anymore.
chrome.tabs.onMoved.addListener(({ tabId, moveInfo, tab }, tabs) => {

 setTimeout(() => { 
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabsQuery);
  }, 500); 

  console.log("this is MOVED window")

});


// highlighted tab
// chrome.tabs.onHighlighted.addListener(({ tabId, highlightInfo }) => {
//   chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabsQuery);
//   console.log("this is Highlighted window")

// });



// ------------------> When tab gets is removed
// -----------> Currently returns any inactive tab (figure out how to return the last activated tab)

// chrome.tabs.onRemoved.addListener(({ tabId, removeInfo }) => {
//   chrome.tabs.query({ active: false, currentWindow: false }, function (tabs) {
//     // Toggle the pinned status
//     var current = tabs[0];
//     let dateClosed = Date.now();

//     console.log('->>>>>>>>>>>>> this is closed tab');
//     console.log(current.url);
//     console.log(current.id);
//     console.log(dateClosed);
//   });
// });

// ------------------> When tab gets updated: new url

// chrome.tabs.onHighlighted.addListener(({ tabIds, windowId }) => {
//   chrome.tabs.query(
//     { active: true, currentWindow: true },

//     function (tabs) {
//       var current = tabs[0];
//       console.log('this is highlighted tab');
//       console.log(current.url);
//       console.log(Date.now());

//       tabMatrix.push(date);
//     }
//   );
// });

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

//    chrome.tabs.onChanged.addListener(({ tabID, changeInfo, }) => {
//     chrome.tabs.query({ active: true, currentWindow: true, status: "complete" }, function (tabs) {
//      // Toggle the pinned status
//      var current = tabs[0];
//      console.log(current);
//      console.log(current.url);
//      console.log(current.windowId);

//     });
//    });

// chrome.sessions.Session.addListener(({sessionID})=>{
// chrome.sessions.query({})
// })

// chrome.sessions.onChanged.addListener() => {}

// function that : 1) creates obj 2) pushes domain and timestamp to the domain's object
// function that pushes session into domain

// need to create arrays of elapesd time

chrome.tabs.query({ active: false });

// ------- >
chrome.runtime.onInstalled.addListener(() => {
  // default state of chrome extensiton, runs once and every time extension is installed
  chrome.storage.local.set({});
});

chrome.storage.local.get('name', (data) => {
  // retrieves stored data
});

// ------------------------------- archive ----------------------------------

// function timeStampCollector() {

//   chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {
//   chrome.tabs.query({ active : true, lastFocusedWindow: true }, function (tabs) {
//   var current = tabs[0];
//    console.log('-------------> this is an open tab')
//    console.log(current.url)

//   var date = Date.now();
//   //   let dateChanged = "date has changed";
//   var currentURL = current.url;
//   var urlTime = [];

//   var domain = currentURL
//     .replace('https://', '')
//     .replace('http://', '')
//     .replace('www.', '')
//     .split(/[/?#]/)[0];

//   var newObjectDomain = {
//     tabId: current.id,
//     homeDomain: domain,
//     URL: currentURL,
//     timeStamps: [],
//   };

//   if (currentURL.includes(domain)) {
//    tabMatrix.push(domain);
//     //   tabMatrix.push(date)

//     newObjectDomain.timeStamps.push(date);
//     return tabMatrix;

//   } else if ((current.highlighted = false)) {
//     newObjectDomain.timeStamps.push(date + 'changed date');
//     return newObjectDomain;

// }
// console.log(timeStampCollector());
