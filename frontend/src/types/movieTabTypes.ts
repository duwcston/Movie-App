interface Review {
    _id: string;
    name: string;
    comment: string;
    createdAt: string;
}

interface Movie {
    reviews: Review[];
}

export interface MovieTabsProps {
    loadingMovieReview: boolean;
    userInfo: string;
    submitHandler: (e: React.FormEvent) => Promise<void>;
    comment: string;
    setComment: (comment: string) => void;
    rating?: number;
    setRating?: (rating: number) => void;
    movie: Movie;
}