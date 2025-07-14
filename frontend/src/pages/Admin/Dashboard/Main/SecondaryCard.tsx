interface SecondaryCardProps {
    pill: string;
    content: string | number;
    info: string;
    gradient: string;
}

const SecondaryCard = ({ pill, content, info, gradient }: SecondaryCardProps) => {
    return (
        <div
            className={`w-[140px] sm:w-[160px] md:w-[180px] lg:w-[12rem] h-[90px] sm:h-[120px] md:h-[10rem] relative mt-5 md:mt-10 bg-gradient-to-b ${gradient} rounded-lg shadow-lg mx-auto sm:mx-1 md:ml-5`}
        >
            <div
                className={`absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 border bg-gradient-to-b ${gradient} rounded-full py-1 sm:py-1.5 md:py-2 px-3 sm:px-4 md:px-5 text-xs sm:text-sm text-gray-800 font-semibold`}
            >
                {pill}
            </div>

            <div className="flex items-center justify-center h-full">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{content}</h2>
            </div>

            {info && (
                <div className="absolute bottom-2 md:bottom-4 left-0 right-0 text-center text-xs sm:text-sm text-white">
                    {info}
                </div>
            )}
        </div>
    );
};

export default SecondaryCard;
