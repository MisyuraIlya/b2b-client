export interface IImage {
  id: number;
  defaultImage: boolean;
  position: number;
  originPath: string;
  thumbnailLargePath: string;
  thumbnailMediumPath: string;
  thumbnailSmallPath: string;
}

export type MediaObject = {
  mediaObject: {
    pathToAsset: string;
  } | null
}