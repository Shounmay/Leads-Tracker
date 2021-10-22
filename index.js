myleads = []; //storing the leads in this array

const inputel = document.getElementById("input-el"); // targetting input-tab element

const inputbtn = document.getElementById("input-btn"); // targetting save-input button

const ulEL = document.getElementById("ul-el"); // targetting UL for displaying leads

const deleteEL = document.getElementById("delete-btn"); // trargetting delete btn

const savetabEL = document.getElementById("save-btn"); // targetting save Tab btn

let leadsfromlocalstorage = JSON.parse(localStorage.getItem("myleads")); // getting previously stored leads from local storage

if (leadsfromlocalstorage) {
  // rendering leads from local storage
  myleads = leadsfromlocalstorage;
  render(myleads);
}

deleteEL.addEventListener("dblclick", function () {
  //delete-btn function
  localStorage.clear();
  myleads = [];
  render(myleads);
});

inputbtn.addEventListener("click", function () {
  // function of save-input btn

  myleads.push(inputel.value);

  inputel.value = ""; // to clear the input field

  localStorage.setItem("myleads", JSON.stringify(myleads)); //storing leads to local storage
  render(myleads);
});

savetabEL.addEventListener("click", function () {
  // save-tab functioning
  //chrome-API to get current tab url

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myleads.push(tabs[0].url);
    localStorage.setItem("myleads", JSON.stringify(myleads));
    render(myleads);
  });
  //chrome.tabs.query...> It's querying in chrome tabs about the active tab and the current window
  // the url of that get stored in an object tabs
  // we are accesing the url by tabs[0].url
});

function render(leads) {
  // functioning of rendering
  let listitems = "";

  for (let i = 0; i < leads.length; i++) {
    listitems += `<li>
                       <a href='${leads[i]}' target='_blank'>
                             ${leads[i]}
                       </a>
                    </li>`;
  }
  ulEL.innerHTML = listitems;
}
// hi
