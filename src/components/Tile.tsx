const Tile = ({ artwork, title, artist, album }: any) => {
  return (
    <div className="flex justify-center items-center flex-col mt-2">
      <img src={artwork} alt="" className="h-32 w-32 " />
      <div className="mt-4 flex justify-center items-center flex-col">
        <p className="text-xl">{title}</p>
        <p className="text-base">{album}</p>
        <p className="text-sm">{artist}</p>
      </div>
    </div>
  );
};

export default Tile;
