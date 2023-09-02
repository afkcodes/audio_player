declare global {
  var webkitAudioContext: AudioContext;
}

import { useCallback, useEffect, useState } from "react";
let audioContext: AudioContext;
const initWebAudio = () => {
  let ctx: AudioContext,
    usingWebAudio = true;

  try {
    if (typeof AudioContext !== "undefined") {
      ctx = new window.AudioContext();
      audioContext = ctx;
    } else {
      usingWebAudio = false;
    }
  } catch (e) {
    usingWebAudio = false;
  }

  // context state at this time is `undefined` in iOS8 Safari
  if (usingWebAudio && audioContext.state === "suspended") {
    var resume = function () {
      ctx.resume();
      setTimeout(function () {
        if (ctx.state === "running") {
          document.body.removeEventListener("touchend", resume, false);
        }
      }, 0);
    };

    document.body.addEventListener("touchend", resume, false);
  }
};

function convertVolumeToLinear(volume: number) {
  volume = Math.max(0.0, Math.min(1.0, volume));
  return Math.pow(volume, 2);
}

let done = false;
const bands = [
  { type: "lowshelf", frequency: 60, gain: 1 },
  { type: "peaking", frequency: 150, gain: 0.5 },
  { type: "peaking", frequency: 400, gain: 0 },
  { type: "peaking", frequency: 1000, gain: 0 },
  { type: "peaking", frequency: 2500, gain: 0 },
  { type: "peaking", frequency: 6000, gain: 0 },
  { type: "highshelf", frequency: 16000, gain: 1 },
];

const createEqualizer = (
  audioContext: AudioContext,
  instance: HTMLAudioElement
) => {
  const audioSource = audioContext.createMediaElementSource(instance);
  const equalizerBands = bands.map(({ type, frequency, gain }) => {
    const filter = audioContext.createBiquadFilter();
    filter.type = type as BiquadFilterType;
    filter.frequency.value = frequency;
    filter.gain.value = gain;
    return filter;
  });

  audioSource.connect(equalizerBands[0]);

  for (let i = 0; i < equalizerBands.length - 1; i++) {
    equalizerBands[i].connect(equalizerBands[i + 1]);
  }

  equalizerBands[equalizerBands.length - 1].connect(audioContext.destination);
  done = true;
  return equalizerBands;
};

const Equalizer = ({ instance }: any) => {
  const [vol, setVol] = useState(50);
  const [equalizerBands, setEqualizerBands] = useState<any>([]);
  const [isSetupDone, setIsSetupDone] = useState(false);

  useEffect(() => {
    if (!isSetupDone && !done) {
      initWebAudio();
      const bands = createEqualizer(audioContext, instance);
      console.log(bands);
      setEqualizerBands(bands);
      setIsSetupDone(true);
    }
  }, [instance]);

  useEffect(() => {
    if (instance) {
      instance.volume = vol / 100;
    }
  }, [vol]);

  const updateGain = useCallback(
    (index: number, value: number) => {
      const updatedBands = [...equalizerBands];
      updatedBands[index].gain.value = value;
      setEqualizerBands(updatedBands);
    },
    [equalizerBands]
  );

  return (
    <div className="flex justify-center flex-col w-full relative">
      <p>VOLUME</p>
      <input
        type="range"
        max={100}
        min={0}
        value={vol}
        onChange={(e) => setVol(Number(e.target.value))}
      />

      <div className="flex w-full h-60 gap-12 relative items-center">
        {bands.map((band, index) => (
          <div key={index} className="relative">
            <input
              className="-rotate-90 absolute"
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={equalizerBands[index]?.gain.value || 0}
              onChange={(e) => updateGain(index, parseFloat(e.target.value))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equalizer;
