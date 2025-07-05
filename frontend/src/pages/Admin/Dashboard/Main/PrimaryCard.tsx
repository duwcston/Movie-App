import { useGetUsersQuery } from "../../../../redux/api/users";

const PrimaryCard = () => {
    const { data: visitors } = useGetUsersQuery({});

    return (
        <div className="w-[100%] h-[10%] bg-[#282828] text-white rounded-lg py-6">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p>You have {visitors?.length} new users.</p>
        </div>
    );
};

export default PrimaryCard;
