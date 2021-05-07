export interface ResponseBody {
    programid: string;
    programcd: string;
    vodid: string;
    category: string;
    broaddate: string;
    production: string;
    copyright: string;
    layers?: (LayersEntity)[] | null;
}

export interface LayersEntity {
    type?: string | null;
    layer: string;
    link_url: string;
    target: string;
    isuse: boolean;
    color: string;
    israndom: boolean;
    items?: (LayerItemsEntity | null)[] | null;
    title?: string | null;
    description?: string | null;
    weeks?: (WeeksEntity)[] | null;
}


export interface LayerItemsEntity {
    image_url: string;
    image_alt: string;
    link_url: string;
    mediaid: string;
    target: string;
    title: string;
    description: string;
    conttype?: string | null;
    color: string;
    targetage?: number | null;
    imagetype?: string | null;
    titlebold?: boolean | null;
    download_url?: string | null;
    date?: string | null;
  }
  export interface WeeksEntity {
    title: string;
    titlebold: boolean;
    guest: string;
    isviewradio: boolean;
    isviewradio_past: boolean;
    isonair: boolean;
    day: number;
    items?: (WeekItemsEntity)[] | null;
  }
  export interface WeekItemsEntity {
    link_url: string;
    mediaid: string;
    target: string;
    title: string;
  }