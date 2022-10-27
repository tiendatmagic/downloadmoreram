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

var candarkmode = JSON.parse(localStorage.getItem("candarkmode"));
if (candarkmode == null || candarkmode == "") {
  candarkmode = false;
  localStorage.setItem("candarkmode", JSON.stringify(candarkmode));
}

var admobid = {
  interstitial: "",
  banner: ""
};

var setList = `
<div class="list-ram">
  <div class="ram waves-effect" id="ram-1" onclick="openram(1)";>1GB</div>
  <div class="ram waves-effect" id="ram-2" onclick="openram(2)";>2GB</div>
  <div class="ram waves-effect" id="ram-4" onclick="openram(4)";>4GB</div>
  <div class="ram waves-effect" id="ram-8" onclick="openram(8)";>8GB</div>
  <div class="ram waves-effect" id="ram-16" onclick="openram(16)";>16GB</div>
  <div class="ram waves-effect" id="ram-32" onclick="openram(32)";>32GB</div>
</div>
`;
document.addEventListener("deviceready", function () {
  onDeviceReady();
});
function onDeviceReady() {
  document.addEventListener("backbutton", onBackButton, false);
}
function onBackButton() {
  location.reload();
}
function openram(ram) {
  setTimeout(function () {

    getClass("contentapp")[0].innerHTML += `
<div class="box-start show">
    <h2>Download ${ram}GB RAM?</h2>
    <div class="question">
      <p> The higher the ram, the longer it will take to load </p>
      <p> Continue? </p>
    </div>
    <div class="box-btn-group">
      <button id="closebox" class="btn waves-effect">No</button>
      <button id="playbox" class="btn waves-effect">Yes</button>
    </div>
  </div>`;

    getId("blur").classList.add("show");
    getId("closebox").onclick = function () {
      getId("blur").classList.remove("show");
      getClass("box-start")[0].remove(); getClass("contentapp")[0].innerHTML = setList;
    }
    getId("playbox").onclick = function () {
      getId("blur").classList.remove("show");
      getClass("box-start")[0].remove(); getClass("contentapp")[0].innerHTML = setList;
      try {
        watchAdMob();
      } catch (error) {

      }
      runDownloadRam(ram);
    }
  }, 350);
}
var loadram = 0;

function runDownloadRam(ram) {
  var getRam = ram;
  getClass("contentapp")[0].innerHTML = `
  <div class="information">
  <div class="ramInfo">
    <span> ${loadram}% </span>
  </div>
</div>
<div class="btn waves-effect bg-danger" id="cancelram">
  <button>Cancel</button>
</div>
  `;
  var run = setInterval(function () {
    if (loadram < 100) {
      loadram++;
      getClass("ramInfo")[0].innerHTML = `<span> ${loadram}% </span>`;
    }
    else {
      clearInterval(run);
      getId("cancelram").classList.remove("bg-danger");
      getId("cancelram").classList.add("bg-success");
      getId("cancelram").innerHTML = `<button> Success</button>`;
      totalram = getRam;
      function totalRam() {
        try {
          return getRAMInfo();
        } catch (error) {
          return getRam;
        }
      }

      localStorage.setItem("totalram", JSON.stringify(Number(JSON.parse(localStorage.getItem("totalram")) + totalram)));
    }
    getId("cancelram").onclick = function () {
      location.reload();
    }
  }, (getRam * 30) / 1.3);
  // AdMob.createBanner({
  //   adId: admobid.banner,
  //   position: AdMob.AD_POSITION.BOTTOM_CENTER,
  //   isTesting: true,
  //   overlap: false,
  //   offsetTopBar: false,
  //   bgColor: 'black'
  // });
}

getId("downloadram").onclick = function () {
  getClass("contentapp")[0].innerHTML = setList;
}

getId("blur").onclick = function () {
  this.classList.remove("show");
  getClass("box-start")[0].remove(); getClass("contentapp")[0].innerHTML = setList;
}

window.onload = function () {
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

  //

  var nrRam = JSON.parse(localStorage.getItem("totalram"));
  if (nrRam == null || nrRam == "") {
    nrRam = getRAMInfo();
    localStorage.setItem("totalram", JSON.stringify(nrRam));
  }

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
  AdMob.removeBanner();
}
getClass("love")[0].onclick = function () {
  cordova.plugins.market.open("com.tiendatmagic.downloadmoreram");
}
getClass("bar")[0].onclick = function () {
  openmenu = true;
  if (openmenu) {
    getClass("list-group")[0].classList.toggle("show");
  } else {
    getClass("list-group")[0].classList.remove("show");
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
  watchAdMob();
}
getId("list1").onclick = function () {
  getClass("contentapp")[0].innerHTML = `
  <div class="text-desc">
  <p> Why is the application not working? </p>
  <p> As said in the description, this is a prank app for you to prank others. The app doesn't really work </p>
  <div class="box-btn-group text-center">
  <button id="closebox" class="btn waves-effect">Back</button>
  </div>
  </div>
  `;
  getId("closebox").onclick = function () {
    location.reload();
  }
  openmenu = false;
  checkOpenMenu();
}
getId("list2").onclick = function () {
  cordova.plugins.market.open("com.tiendatmagic.downloadmoreram");
}
getId("list6").onclick = function () {
  cordova.plugins.codeplay_shareapk.openShare("Download More Ram");
}

function checkOpenMenu() {
  if (openmenu) {
    getClass("list-group")[0].classList.toggle("show");
  } else {
    getClass("list-group")[0].classList.remove("show");
  }
}
function watchAdMob() {
  // AdMob.prepareInterstitial({
  //   adId: admobid.interstitial,
  //   isTesting: true,
  //   autoShow: true,
  // });
}