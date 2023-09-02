const Tile = ({ artwork, title, artist, album }: any) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <img src={artwork} alt="" className="h-40 w-40" />
      <div className="mt-4 flex justify-center items-center flex-col">
        <p className="text-xl">{title}</p>
        <p className="text-base">{album}</p>
        <p className="text-sm">{artist}</p>
      </div>
    </div>
  );
};

export default Tile;
