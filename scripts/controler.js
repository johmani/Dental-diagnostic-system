var predictions = [];
var teethPredictions;
var fixedPredictions;

detection.addEventListener("click", () => {
  console.log("detect...");
  predictions = [];
  sendImage = canvas.toDataURL("image/jpeg", 1.0);
  teethDetection(sendImage);
  fixedTeethDetection(sendImage);
});

function teethDetection(img) {
  axios({
    method: "POST",
    url: "https://detect.roboflow.com/teeth-detection-and-numbering-agi2i/10",
    params: {
      api_key: "NvTvcum4o3Uys68hJOQu",
    },
    data: img,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (response) {
      teethPredictions = response.data["predictions"];
      predictions = predictions.concat(teethPredictions);
    })
    .catch(function (error) {
      console.log(error.message);
    });
}
function fixedTeethDetection(img) {
  axios({
    method: "POST",
    url: "https://detect.roboflow.com/mergedata-gkvhk/1",
    params: {
      api_key: "NvTvcum4o3Uys68hJOQu",
    },
    data: img,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (response) {
      fixedPredictions = response.data["predictions"];
      predictions = predictions.concat(fixedPredictions);
      // animate();
      showlist();
      console.log("done");

    })
    .catch(function (error) {
      console.log(error.message);
    });
}

teethToggle.addEventListener("click", () => {
  if (teethToggle.checked) {
    console.log("teethToggle true");
  } else {
    console.log("teethToggle false");
  }
});


const colors = ["#8ECAE6", "#219EBC", "#FFB703", "#f72585", "#7400b8", "#ff6700", "#0496ff", "#a5be00"]
var teeth = " "
var fixed = " "

function showlist() {
  for (let p of predictions) {
    var classType = p["class"];
    var confidence = p["confidence"];
    var c = "#8ECAE6";

    if (classType[1] == "1" || classType[1] == "2") {
      c = incisorColor;
      teeth += '<li class="item-list"><i class="bx bxs-circle icon" style="color:' + c + '"></i><p>' + classType + '</p></li>';
    } else if (classType[1] == "3") {
      c = caninieColor;
      teeth += '<li class="item-list"><i class="bx bxs-circle icon" style="color:' + c + '"></i><p>' + classType + '</p></li>';

    } else if (classType[1] == "4" || classType[1] == "5") {
      c = premolorColor;
      teeth += '<li class="item-list"><i class="bx bxs-circle icon" style="color:' + c + '"></i><p>' + classType + '</p></li>';
    } else if (classType[1] == "6" || classType[1] == "7" || classType[1] == "8") {
      c = molarColor;
      teeth += '<li class="item-list"><i class="bx bxs-circle icon" style="color:' + c + '"></i><p>' + classType + '</p></li>';
    }

    else if (classType == "Crown - bridge") {
      c = crownBridge;
      fixed += '<li class="item-list"><i class="bx bxs-circle icon" style="color:' + c + '"></i><p>' + classType + '</p></li>';

    } else if (classType == "Filling") {
      c = filling;
      fixed += '<li class="item-list"><i class="bx bxs-circle icon" style="color:' + c + '"></i><p>' + classType + '</p></li>';

    } else if (classType == "Implant") {
      c = implant;
      fixed += '<li class="item-list"><i class="bx bxs-circle icon" style="color:' + c + '"></i><p>' + classType + '</p></li>';

    } else if (classType == "Root Canal Obturation") {
      c = rootCanalObturation;
      fixed += '<li class="item-list"><i class="bx bxs-circle icon" style="color:' + c + '"></i><p>' + classType + '</p></li>';

    }
  }
  fixedTeethDetectionList.innerHTML = fixed;
  teethDetectionList.innerHTML = teeth;
}



