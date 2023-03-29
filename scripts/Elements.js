var body = document.querySelector("body");
var sidebar = body.querySelector("nav");
var leftSidebarToggle = body.querySelector(".toggle");
var searchButton = body.querySelector(".search-box");
var modeToggle = body.querySelector(".toggle-switch");
var modeText = body.querySelector(".mode-text");
var detection = document.getElementById("detection");
var canvas = document.querySelector("canvas");
var contaner = document.getElementById("image-drag-area");
var upload = document.getElementById("upload");

var popup = document.getElementById("popup");
var imagePopup = document.getElementById("image-popup");
var topPopup = document.getElementById("top-popup");
var classTypePopup = document.getElementById("class-popup");
var confidencePopup = document.getElementById("confidence-popup");

var teethToggle = document.getElementById("teeth-Toggle");
var implantToggle = document.getElementById("implant-Toggle");
var fillingToggle = document.getElementById("filling-Toggle");
var rootCanalObturationToggle = document.getElementById(
  "root-Canal-Obturation-Toggle"
);
var crownBridgeToggle = document.getElementById("Crown-bridge-Toggle");

var teethDetectionList = document.getElementById("teeth-detection-list");
var fixedTeethDetectionList = document.getElementById("fixed-teeth-detection-list");