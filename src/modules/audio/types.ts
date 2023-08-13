export interface MediaArtworkType {
  src: string;
  name?: string;
  sizes?: string;
}
export interface MediaTrackType {
  title: string;
  source: string;
  artwork: MediaArtworkType[];
  duration?: number;
  genre?: string;
  album?: string;
  comment?: string;
  year?: number;
  artist?: string;
}
