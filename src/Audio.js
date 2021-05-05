import React from "react";

const Audio = () => {
  const handleClick = async () => {
    if (navigator.getUserMedia) {
      const audio = await getAudio();
      var audiocontext = new AudioContext();
      const analizerNode = new AnalyserNode(audiocontext, { fftSize: 256 });
      audiocontext.createAnalyser();
      const source = audiocontext.createMediaStreamSource(audio);
      source.connect(analizerNode).connect(audiocontext.destination);

      const bufferLength = analizerNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analizerNode.getByteFrequencyData(dataArray);

      function getAudio() {
        return navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: false,
          },
        });
      }
    } else {
      document.body.innerText = "getUserMedia not supported";
      console.log("getUserMedia not supported");
    }
  };

  return (
    <div>
      <audio controls></audio>
      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default Audio;
