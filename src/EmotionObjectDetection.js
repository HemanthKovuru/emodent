import React, { useState } from "react";
// import * as tf from "@tensorflow/tfjs";
import * as faceapi from "@vladmandic/face-api";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { startVideo, prediction_string } from "./utils/utilities";

const EmotionObjectDetection = () => {
  const [emotion, setEmotion] = useState("");

  const handleClick = async () => {
    const video = document.getElementById("video");
    const text = document.getElementById("prediction");
    video.style.cssText =
      "-moz-transform: scale(-1, 1); -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); transform: scale(-1, 1); filter: FlipH;";

    const MODEL_URL = process.env.PUBLIC_URL + "/models";
    const net = await cocoSsd.load();
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ])
      .then(startVideo)
      .catch((err) => {
        console.log(err);
      });

    video.addEventListener("play", () => {
      setInterval(async () => {
        const predictions = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        const obj = await net.detect(video);
        console.log(predictions);
        console.log(obj);
        text.innerHTML = prediction_string(predictions[0], setEmotion);
      }, 100);
    });
  };

  return (
    <div>
      <button onClick={handleClick}>click</button>

      <video
        className='video'
        autoPlay
        muted
        id='video'
        width='720'
        height='420'></video>
      <div id='prediction'></div>
    </div>
  );
};

export default EmotionObjectDetection;
