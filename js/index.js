console.log("%cTiendatmagic", "color: deeppink; font-size: x-large");

function getId(id) {
  return document.getElementById(id);
}

function getClass(clss) {
  return document.getElementsByClassName(clss);
}

function getQuery(query) {
  return document.querySelector(query);
}

function getQueryAll(query) {
  return document.querySelectorAll(query);
}

var openmenu = false;
var cansound = JSON.parse(localStorage.getItem("cansound"));
if (cansound == null || cansound == "") {
  cansound = true;
  localStorage.setItem("cansound", JSON.stringify(cansound));
}
var candarkmode = JSON.parse(localStorage.getItem("candarkmode"));
if (candarkmode == null || candarkmode == "") {
  candarkmode = false;
  localStorage.setItem("candarkmode", JSON.stringify(candarkmode));
}

var admobid = {
  interstitial: "ca-app-pub-2636216160874899/8129796215",
};
document.addEventListener("deviceready", function () {
  onDeviceReady();
});

var nrRam = getRAMInfo();
function getUnit(n) {
  ram = n;
  if (ram < 1000) {
    return "MB";
  }
  else {
    return "GB";
  }
}

function getRAMInfo() {
  try {
    var ram = parseFloat(cordova.plugins['extended-device-information'].memory);
    var unit = "";
    unit = (
      getUnit(ram)
    );
    getClass("unit")[0].innerText = unit;
    if (ram < 1000) {
      return Math.round(ram * 100) / 100;
    }
    else {
      return Math.round(ram / 1024 * 100) / 100;
    }
  }
  catch {
    return '?';
  }
}

document.getElementsByClassName("nr-ram")[0].innerText = nrRam;

getId("downloadram").onclick = function () {
  getClass("contentapp")[0].innerHTML = '';
}

window.onload = function () {
  cansound = JSON.parse(localStorage.getItem("cansound"));
  candarkmode = JSON.parse(localStorage.getItem("candarkmode"));

  if (candarkmode == false) {
    getClass("contentapp")[0].classList.remove("dark");
    getClass("list-group")[0].classList.remove("dark");
  } else {
    getClass("contentapp")[0].classList.add("dark");
    getClass("list-group")[0].classList.add("dark");
  }

  setTimeout(function () {
    getQueryAll("body")[0].classList.add("show");
  }, 100);
  // alert(
  //   "Memory:" + cordova.plugins['extended-device-information'].memory +
  //   "CPU:" + cordova.plugins['extended-device-information'].cpumhz +
  //   "totalstorage:" + cordova.plugins['extended-device-information'].totalstorage +
  //   "freestorage:" + cordova.plugins['extended-device-information'].freestorage
  // )
  // alert(cordova.plugins['extended-device-information'].memory);
}
getClass("love")[0].onclick = function () {
  cordova.plugins.market.open("com.tiendatmagic.tapcounter");
}
getClass("bar")[0].onclick = function () {
  openmenu = true;
  if (openmenu) {
    getClass("list-group")[0].classList.toggle("show");
  } else {
    getClass("list-group")[0].classList.remove("show");
  }

  if (cansound == false) {
    getClass("checkbox4")[0].checked = false;
  } else {
    getClass("checkbox4")[0].checked = true;
  }
  if (candarkmode == false) {
    getClass("checkbox5")[0].checked = false;
  } else {
    getClass("checkbox5")[0].checked = true;
  }
}
getClass("contentapp")[0].onclick = function () {
  openmenu = false;
  checkOpenMenu();
}

getId("list1").onclick = function () {

}
getId("list3").onclick = function () {

}
getId("list4").onclick = function () {
  if (cansound == false) {
    cansound = true;
    getClass("checkbox4")[0].checked = true;
    localStorage.setItem("cansound", JSON.stringify(cansound));
  } else {
    cansound = false;
    getClass("checkbox4")[0].checked = false;
    localStorage.setItem("cansound", JSON.stringify(cansound));
  }
}
getId("list5").onclick = function () {
  if (candarkmode == false) {
    candarkmode = true;
    getClass("checkbox5")[0].checked = true;
    localStorage.setItem("candarkmode", JSON.stringify(candarkmode));
    getClass("contentapp")[0].classList.add("dark");
    getClass("list-group")[0].classList.add("dark");
  } else {
    candarkmode = false;
    getClass("checkbox5")[0].checked = false;
    localStorage.setItem("candarkmode", JSON.stringify(candarkmode));
    getClass("contentapp")[0].classList.remove("dark");
    getClass("list-group")[0].classList.remove("dark");
  }
  AdMob.prepareInterstitial({
    adId: admobid.interstitial,
    isTesting: true,
    autoShow: true,
  });
}
getId("list2").onclick = function () {
  cordova.plugins.market.open("com.tiendatmagic.tapcounter");
}
getId("list6").onclick = function () {
  cordova.plugins.codeplay_shareapk.openShare("Tap Counter");
}

function checkOpenMenu() {
  if (openmenu) {
    getClass("list-group")[0].classList.toggle("show");
  } else {
    getClass("list-group")[0].classList.remove("show");
  }
}