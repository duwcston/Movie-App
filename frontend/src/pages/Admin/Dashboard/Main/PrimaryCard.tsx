import { useGetUsersQuery } from "../../../../redux/api/users";

const PrimaryCard = () => {
    const { data: visitors } = useGetUsersQuery({});

    return (
        <div className="w-full h-auto bg-[#282828] text-white rounded-lg py-4 sm:py-6 mt-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4">
                Congratulations!
            </h2>
            <p className="text-sm sm:text-base">You have {visitors?.length} new users.</p>
        </div>
    );
};

export default PrimaryCard;
