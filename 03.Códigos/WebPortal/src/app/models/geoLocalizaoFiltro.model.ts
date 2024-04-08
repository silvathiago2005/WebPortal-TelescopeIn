export class GeoLocalizaoFiltro {
    constructor(
        public latitude: number = 0,
        public longitude: number = 0,
        public raio: number = 0
    ) { }
}

export interface GeoLocalizaoFiltroInt{
    latitude: number,
    longitude: number,
    raio: number 
}
