import { useGetUsersQuery } from "../../../../redux/api/users";
import PrimaryCard from "./PrimaryCard";

const RealtimeCard = () => {
    const { data: visitors } = useGetUsersQuery({});

    return (
        <div className="w-[22rem] mt-10 bg-[#282828] text-[#fff] rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-2">Realtime</h2>
            <p className="text-gray-500 mb-4">Update Live</p>
            <div className="border-t border-[#666] my-6"></div>
            <h2 className="text-2xl font-bold mb-2">{visitors?.length}</h2>
            <p className="text-gray-500 mb-2">Subscribe</p>
            <hr />

            <PrimaryCard />
        </div>
    );
};

export default RealtimeCard;
