
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

export interface GalleryState {
  images: GaleriaItem[];
  folders: string[];
  currentFolder: string | null; // null means "All Images"
  loading: boolean;
  viewMode: ViewMode;
  selectedImageIndex: number | null;
}
