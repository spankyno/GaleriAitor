
export interface GaleriaItem {
  id: number;
  carpeta: string;
  url: string;
}

export enum ViewMode {
  NORMAL = 'normal',
  MINIATURE = 'miniature',
  LIST = 'list'
}

export enum ImageFitMode {
  COVER = 'cover',
  CONTAIN = 'contain'
}

export interface GalleryState {
  images: GaleriaItem[];
  folders: string[];
  currentFolder: string | null;
  loading: boolean;
  viewMode: ViewMode;
  imageFit: ImageFitMode;
  selectedImageIndex: number | null;
}
