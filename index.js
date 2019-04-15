const brain = require("brain.js");
let data = [{"input":[0,0,0],"color":"black"},{"input":[255,0,0],"color":"red"},{"input":[0,255,0],"color":"green"},{"input":[0,0,255],"color":"blue"},{"input":[33,100,26],"color":"green"},{"input":[205,29,29],"color":"red"},{"input":[234,70,0],"color":"red"},{"input":[251,255,70],"color":"yellow"},{"input":[57,220,39],"color":"green"},{"input":[60,47,213],"color":"blue"},{"input":[240,14,245],"color":"pink"},{"input":[209,50,205],"color":"pink"},{"input":[205,54,175],"color":"pink"},{"input":[215,17,215],"color":"pink"},{"input":[115,115,115],"color":"grey"},{"input":[114,114,114],"color":"grey"},{"input":[113,113,113],"color":"grey"},{"input":[117,115,108],"color":"grey"},{"input":[107,118,114],"color":"grey"},{"input":[118,106,119],"color":"grey"},{"input":[218,223,2],"color":"yellow"},{"input":[202,206,19],"color":"yellow"},{"input":[219,224,1],"color":"yellow"},{"input":[250,254,63],"color":"yellow"},{"input":[230,222,87],"color":"yellow"},{"input":[205,203,112],"color":"yellow"},{"input":[193,190,123],"color":"yellow"},{"input":[234,185,83],"color":"yellow"},{"input":[226,162,90],"color":"yellow"},{"input":[38,200,15],"color":"green"},{"input":[65,213,2],"color":"green"},{"input":[177,37,40],"color":"red"},{"input":[194,210,4],"color":"yellow"},{"input":[157,133,57],"color":"yellow"},{"input":[37,0,215],"color":"blue"},{"input":[56,56,158],"color":"blue"},{"input":[60,155,67],"color":"green"},{"input":[88,135,80],"color":"green"},{"input":[65,60,155],"color":"blue"},{"input":[218,69,69],"color":"red"},{"input":[190,97,97],"color":"pink"},{"input":[138,244,43],"color":"green"},{"input":[53,234,99],"color":"green"},{"input":[135,202,85],"color":"green"},{"input":[88,79,208],"color":"blue"},{"input":[207,58,228],"color":"pink"},{"input":[200,78,209],"color":"pink"},{"input":[175,104,183],"color":"pink"},{"input":[175,104,183],"color":"pink"},{"input":[176,111,122],"color":"pink"},{"input":[218,77,69],"color":"red"},{"input":[231,139,56],"color":"yellow"},{"input":[214,179,73],"color":"yellow"},{"input":[223,227,60],"color":"yellow"},{"input":[51,236,226],"color":"blue"},{"input":[99,188,186],"color":"blue"},{"input":[142,145,142],"color":"grey"},{"input":[147,140,143],"color":"grey"},{"input":[151,138,136],"color":"grey"},{"input":[120,167,136],"color":"green"},{"input":[114,121,173],"color":"blue"},{"input":[114,204,83],"color":"green"},{"input":[62,225,103],"color":"green"}]

const network = new brain.recurrent.LSTM();

let trainingData = data.map(item => ({
  input: item.input,
  output: item.color
}));

document.getElementById("teach").addEventListener("click", addTrainingData);
document.getElementById("train").addEventListener("click", train);
document.getElementById("getResult").addEventListener("click", getResult);
document.getElementById("trainingData").innerHTML =
  "Training data: <br>" + JSON.stringify(data);

function hexToRgb(hex) {
  var bigint = parseInt(hex.substr(1), 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return r + "," + g + "," + b;
}

function addTrainingData() {
  let rgb = hexToRgb(document.getElementById("input").value)
    .split(",")
    .map(Number);

  data.push({
    input: rgb,
    color: document.getElementById("colorType").value
  });

  trainingData = data.map(item => ({
    input: item.input,
    output: item.color
  }));

  document.getElementById("trainingData").innerHTML =
    "Training data: <br>" + JSON.stringify(data);
}

function getResult() {
  console.log(
    network.run(
      hexToRgb(document.getElementById("input").value)
        .split(",")
        .map(Number)
    )
  );
}

function train() {
  network.train(trainingData, {
    iterations: document.getElementById("iterations").value
  });
}
