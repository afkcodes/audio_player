import { useCallback, useEffect, useState } from "react";
const audioContext = new AudioContext();

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

  useEffect(() => {
    console.log(instance);
    if (audioContext && instance && !done) {
      const bands = createEqualizer(audioContext, instance);
      console.log(bands);
      setEqualizerBands(bands);
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
    <div>
      <input
        type="range"
        max={100}
        min={0}
        value={vol}
        onChange={(e) => setVol(Number(e.target.value))}
      />

      <div>Equalizer Sliders</div>
      <div>
        {bands.map((band, index) => (
          <div key={index}>
            <p>Band {index + 1}</p>
            <input
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
