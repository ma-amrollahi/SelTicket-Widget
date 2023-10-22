export interface ShowI {
    id: number,
    kind: string,
    title: string,
    time: number | null,
    age_category: null,
    release_year: number | null,
    genres: ShowGenreI[],
    image_url: string,
    description: string | null,
    cast_description: string | null,
    distribution_title: string | null,
    movie_review: string | null,
    about_show: string | null,
    duration: number | null,
    age_range: null,
    production_date: number | null,
    release_at: string | null,
    rate: null,
    faqs: [],
    galleries: [],
    banner: string | null,
    actors: ShowActorI[],
    directors: ShowDirectorI[],
    producers: ShowProducerI[],
    others: [],
    assets: ShowAssetsI,
    trailer_url: null,
    categories: ShowCategoryI[],
    screening_id: number,
    data_metas: null
}

export interface ShowGenreI {
    id: number,
    title: string,
}

export interface ShowActorI {
    id: number,
    name: string,
    image_url: string,
}

export interface ShowDirectorI {
    id: number,
    name: string,
    image_url: string,
}

export interface ShowProducerI {
    id: number,
    name: string,
    image_url: string,
}

export interface ShowAssetsI {
    valueKind: string,
}

export interface ShowCategoryI {
    id: number,
    title: string,
}
