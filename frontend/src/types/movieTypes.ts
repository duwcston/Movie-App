interface ReviewProps {
    _id: string;
    movieId: string;
    userId: string;
    rating: number;
    comment: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface MovieProps {
    _id: string;
    name: string;
    detail: string;
    year: string;
    genre: [];
    rating: number;
    image: string;
    reviews: ReviewProps[];
    numReviews: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}