import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealtimeCard from "./RealtimeCard";

import { useGetTopMoviesQuery, useGetAllMoviesQuery } from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";
import { MovieProps } from "../../../../types/movieTypes";

const Main = () => {
    const { data: topMovies } = useGetTopMoviesQuery({});
    const { data: visitors } = useGetUsersQuery({});
    const { data: allMovies } = useGetAllMoviesQuery({});

    const totalCommentsLength = allMovies?.map((movie: MovieProps) => movie.numReviews);
    const sumOfCommentsLength = totalCommentsLength?.reduce(
        (acc: number, length: number) => acc + length,
        0
    );

    return (
        <div>
            <section className="flex justify-around">
                <div className="ml-[16rem] mt-10">
                    <div className="-translate-x-4 flex">
                        <SecondaryCard
                            pill="Users"
                            content={visitors?.length}
                            info=""
                            gradient="from-blue-500 to-purple-600"
                        />
                        <SecondaryCard
                            pill="Comments"
                            content={sumOfCommentsLength}
                            info=""
                            gradient="from-pink-500 to-rose-400"
                        />
                        <SecondaryCard
                            pill="Movies"
                            content={allMovies?.length}
                            info=""
                            gradient="from-orange-500 to-red-400"
                        />
                    </div>
                    <div className="flex justify-between w-[90%] text-white mt-10 font-bold">
                        <h3 className="text-bold">Top Content</h3>
                        <h3 className="text-bold">Comments</h3>
                    </div>

                    {topMovies?.map((movie: MovieProps) => (
                        <VideoCard
                            key={movie._id}
                            image={movie.image}
                            title={movie.name}
                            rating={movie.rating}
                            date={movie.year}
                            commentsNumber={movie.numReviews}
                        />
                    ))}
                </div>

                <div>
                    <RealtimeCard />
                </div>
            </section>
        </div>
    );
};

export default Main;
