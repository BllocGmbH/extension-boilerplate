console.log('This is the background page.');
console.log('Put the background scripts here.');

// console.log(sessionStorage)
// var currentTimestamp = date.getTime();
// console.log(currentTimestamp);

// ->>>>>>>>>>>>>>>>>>>>> chrome.sessions.Session.addListener.lastModified

var allTimeStamps = [];
var tabMatrix = [];
var domainTimes = {}
var domain
var newElapsedTime

chrome.tabs.onActivated.addListener(({ tabId, windowId }) => {

// 1. Push every new date ingo global variable
    var date = Date.now();
    allTimeStamps.push(date);

// 2. Perform subtraction - elapsed time spend on the latest tab
    var latestTimestamp = allTimeStamps[allTimeStamps.length-1]
    var secondLatestTimestamp = allTimeStamps[allTimeStamps.length-2]
    var newElapsedTime =  latestTimestamp - secondLatestTimestamp
    console.log(newElapsedTime);

//3. Query tab data
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    var current = tabs[0];
    console.log('-------------> this is an open tab', current.url);

    var currentURL = current.url;
    
    var domain = currentURL
        .replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .split(/[/?#]/)[0];

    

    function timeStampCollector() {

        var domainTimes = {
        homeDomain: domain,
        timeStamps: [] 
        
    };  

    // TO DO: 
   // 4.1 Create array for all visited sites (home domains)
   // 4.2 Check if domain key already exists. If not, push domain key/value and after that push elapsed time under the domain
          

      if (currentURL.includes(domain)) {


        domainTimes.timeStamps.push(newElapsedTime);

        return domainTimes


        // domainTimes.timeStamps.push(newElapsedTime); //returns undefined for now
        // tabMatrix.push(domainTimes)
        
      } else {
        // 
      }

      return tabMatrix; 
    }
    
    console.log(timeStampCollector());
  });
  
});


console.log('this is tab matrix', tabMatrix);




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

// chrome.tabs.onUpdated.addListener(({ tabID, changeInfo }) => {
//   chrome.tabs.query(
//     { active: true, currentWindow: true, status: 'complete' },
//     function (tabs) {
//       // Toggle the pinned status
//       let dateInactive = Date.now();
//       var current = tabs[0];
//       console.log(current.id);
//       console.log(current.url);
//       console.log(dateInactive);
//       //  console.log(current.windowId);
//     }
//   );
// });

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
    chrome.storage.local.set({

    });
});

chrome.storage.local.get("name", data => {
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