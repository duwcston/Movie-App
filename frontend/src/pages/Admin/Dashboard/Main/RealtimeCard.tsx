import { useGetUsersQuery } from "../../../../redux/api/users";
import PrimaryCard from "./PrimaryCard";

const RealtimeCard = () => {
    const { data: visitors } = useGetUsersQuery({});

    return (
        <div className="w-full sm:w-[90%] md:w-[22rem] mt-5 sm:mt-8 md:mt-10 bg-[#282828] text-[#fff] rounded-lg shadow-lg p-3 sm:p-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Realtime</h2>
            <p className="text-sm sm:text-base text-gray-500 mb-2 sm:mb-4">Update Live</p>
            <div className="border-t border-[#666] my-3 sm:my-6"></div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{visitors?.length}</h2>
            <p className="text-sm sm:text-base text-gray-500 mb-2">Subscribe</p>
            <hr />

            <PrimaryCard />
        </div>
    );
};

export default RealtimeCard;
