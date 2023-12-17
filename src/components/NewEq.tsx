import { useEffect, useState } from "react";

const NewEq = ({ bands, instance, audio }: any) => {
  const [vol, setVol] = useState(50);
  const [equalizerBands, setEqualizerBands] = useState<any>(bands);

  useEffect(() => {
    if (instance) {
      instance.volume = vol / 100;
    }
  }, [vol]);

  // const updateGain = useCallback(
  //   (index: number, value: number) => {
  //     const updatedBands = [...equalizerBands];
  //     updatedBands[index].gain.value = value;
  //     setEqualizerBands(updatedBands);
  //   },
  //   [equalizerBands]
  // );

  // console.log(bands);

  const band = audio.getPreset();
  console.log(band);

  return (
    <div className="flex justify-center items-center flex-col w-full relative gap-8">
      <p>VOLUME</p>
      <input
        type="range"
        max={100}
        min={0}
        value={vol}
        onChange={(e) => setVol(Number(e.target.value))}
      />

      <input
        type="button"
        value="SET EQ"
        onClick={() => {
          audio.setPreset([
            0.0, 0.0, 1.0, -1.0, -2.0, -1.5, -0.5, 1.0, 10.0, 10.0,
          ]);
        }}
        className="bg-slate-700 px-4 py-2 text-white rounded-md cursor-pointer mt-10 w-40"
      />

      {/* <div className="flex w-full h-60 gap-8 relative items-center">
        {equalizerBands.map((band: any, index: any) => (
          <div key={index} className="relative">
            <input
              className="-rotate-90 absolute h-10"
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={equalizerBands[index]?.gain.value || 0}
              onChange={(e) => updateGain(index, parseFloat(e.target.value))}
            />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default NewEq;
