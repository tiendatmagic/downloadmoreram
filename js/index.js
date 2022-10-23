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
      runDownloadRam();
    }
  }, 300);
}
var loadram = 0;

function runDownloadRam() {

  var run = setInterval(function () {
    if (loadram <= 100) {
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
      loadram++;
      getId("cancelram").onclick = function () {
        location.reload();
      }
    }
    else {
      clearInterval(run);
      getId("cancelram").classList.remove("bg-danger");
      getId("cancelram").classList.add("bg-success");
      getId("cancelram").innerHTML = `<button onclick="cancelRam();"> Success</button>`;
      getId("cancelram").onclick = function () {
        location.reload();
      }
    }
  }, 200);

}

getId("downloadram").onclick = function () {
  getClass("contentapp")[0].innerHTML = setList;
}

getId("blur").onclick = function () {
  this.classList.remove("show");
  getClass("box-start")[0].remove(); getClass("contentapp")[0].innerHTML = setList;
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

  //
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