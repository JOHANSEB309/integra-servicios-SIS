export interface estampaResponse{
    data:Array<any>
}

export interface LogResponse{
    rol: number
    message:string
    codigo:number
}

export interface categoriaSeleccionadaResponse{
    data:Array<any>
    recursos_disponibles:Array<any>
}

export interface reservaActivaResponse{
    data:Array<any>
}

export interface historialReservaResponse{
    data:Array<any>
}

export interface reservaSeleccionadaResponse{
    data:Array<any>
}

export interface ApiResponseV2 {
    status: boolean;
    message: string;
    data: {
      recursos_disponibles: Array<any>;
    };
  }