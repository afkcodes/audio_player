import { MediaTrackType } from "../modules/audio/types";

export const secondsToTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0'),
    m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');

  return h == '00' ? `${m}:${s}` : `${h}:${m}:${s}`;
};

export const metaDataCreator = (mediaTrack: MediaTrackType) => {
  const { title, album, artist, artwork } = mediaTrack;
  const artworkUrl = artwork[0]?.src
  const sizes = ['96x96', '128x128', '192x192', '256x256', '384x384', '512x512']
  const artworkMap = sizes.map((el) => { return { src: artworkUrl, sizes: el, type: "image/png" } })
  const metaData = {
    title, album, artist, artwork: artworkMap
  }
  return metaData;
}