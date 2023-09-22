export interface IPokemonListResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  BasicInfo[];
}

export interface BasicInfo {
    name: string;
    url:  string;
}
