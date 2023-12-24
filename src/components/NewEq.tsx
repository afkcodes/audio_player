import { AudioX, Preset } from "audio_x";
import { useEffect, useState } from "react";

const NewEq = ({
  bands,
  instance,
  audio,
}: {
  bands: any;
  instance: any;
  audio: AudioX;
}) => {
  const presets: Preset[] = audio.getPresets();

  const [vol, setVol] = useState(50);
  const [currentPreset, setCurrentPreset] = useState<number[]>(
    presets[0].gains
  );

  useEffect(() => {
    if (instance) {
      audio.setVolume(vol);
    }
  }, [vol]);

  const updateGain = (index: number, value: number) => {
    const updatedBands: number[] = [...currentPreset];
    updatedBands[index] = value;
    setCurrentPreset(updatedBands);
    audio.setCustomEQ(updatedBands);
  };

  return (
    <div className="flex justify-center items-center flex-col w-full relative gap-">
      <div className="flex flex-col justify-center items-center py-4 gap-4">
        <p>VOLUME</p>
        <input
          type="range"
          max={100}
          min={0}
          value={vol}
          onChange={(e) => setVol(Number(e.target.value))}
        />
      </div>

      <div>
        <p className="text-lg font-semibold underline mb-4">
          Select Presets Below
        </p>
        <select
          className="bg-black border px-3 py-2"
          onChange={(e) => {
            audio.setPreset(e.target.value as keyof Preset);
            setCurrentPreset(
              presets.find((preset) => preset.id === e.target.value)
                ?.gains as number[]
            );
          }}
        >
          {presets.map((preset: Preset) => (
            <option value={preset.id} key={preset.id}>
              {preset.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex w-full gap-8  relative justify-center items-center mt-0 mr-32 h-60">
        {currentPreset.map((gain: any, index: any) => (
          <div key={index} className="relative">
            <input
              className="-rotate-90 absolute h-10"
              type="range"
              min={-10}
              max={10}
              step="0.1"
              value={gain}
              onChange={(e) => updateGain(index, parseFloat(e.target.value))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewEq;
