import React from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import { startVideo } from "./../utils/utilities";
import "./object.css";

const ObjectDetection = () => {
  const handleClick = async () => {
    const video = document.getElementById("video");
    video.style.cssText =
      "-moz-transform: scale(-1, 1); -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); transform: scale(-1, 1); filter: FlipH;";

    await cocossd
      .load()
      .then((model) => {
        video.addEventListener("play", () => {
          setInterval(() => {
            detect(model, video);
          }, 100);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    startVideo();
  };

  const detect = async (net, video) => {
    const obj = await net.detect(video);
    console.log(obj);
  };

  return (
    <div>
      <video
        style={{ visibility: "hidden", display: "none" }}
        className='video'
        autoPlay
        muted
        id='video'
        width='720'
        height='420'></video>

      <button onClick={handleClick}>click</button>
    </div>
  );
};

export default ObjectDetection;
