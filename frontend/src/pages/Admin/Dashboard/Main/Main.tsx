import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealtimeCard from "./RealtimeCard";

import { useGetTopMoviesQuery, useGetAllMoviesQuery } from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";
import { useGetAllRequestsQuery } from "../../../../redux/api/requests";
import { MovieProps } from "../../../../types/movieTypes";

const Main = () => {
    const { data: topMovies } = useGetTopMoviesQuery({});
    const { data: visitors } = useGetUsersQuery({});
    const { data: allMovies } = useGetAllMoviesQuery({});
    const { data: allRequests } = useGetAllRequestsQuery({});

    const totalCommentsLength = allMovies?.map((movie: MovieProps) => movie.numReviews);
    const sumOfCommentsLength = totalCommentsLength?.reduce(
        (acc: number, length: number) => acc + length,
        0
    );

    return (
        <div className="min-h-screen bg-gray-900">
            <section className="flex flex-col md:flex-row">
                <div className="w-full md:ml-[16rem] p-4 md:pt-6 lg:pt-8">
                    <div className="flex flex-wrap gap-3 md:gap-4">
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
                        <SecondaryCard
                            pill="Requests"
                            content={allRequests?.length}
                            info=""
                            gradient="from-green-500 to-teal-400"
                        />
                    </div>
                    <div className="flex justify-between w-full md:w-[90%] text-white mt-6 md:mt-8 lg:mt-10 font-bold px-2">
                        <h3 className="text-base md:text-lg">Top Content</h3>
                        <h3 className="text-base md:text-lg">Comments</h3>
                    </div>

                    <div className="mt-4">
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
                </div>

                <div className="w-full md:w-auto mt-6 md:mt-0 p-4 md:p-6">
                    <RealtimeCard />
                </div>
            </section>
        </div>
    );
};

export default Main;
