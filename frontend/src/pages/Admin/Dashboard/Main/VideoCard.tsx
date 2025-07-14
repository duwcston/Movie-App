interface VideoCardProps {
    image: string;
    title: string;
    date: string;
    commentsNumber: number;
    rating: number;
}

const VideoCard = ({ image, title, date, commentsNumber }: VideoCardProps) => {
    return (
        <>
            <div className="flex items-center w-full sm:w-[95%] md:w-[90%] mt-3 md:mt-5 p-2 sm:p-0">
                <div className="flex-shrink-0">
                    <img src={image} alt="Card Image" className="h-[2.5rem] sm:h-[3rem]" />
                </div>

                <div className="ml-2 sm:ml-4 flex-grow overflow-hidden">
                    <h2 className="text-sm sm:text-base md:text-lg text-white truncate">{title}</h2>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-3">{date}</p>
                </div>

                <div className="flex items-center justify-end pl-1">
                    <div className="text-white text-sm sm:text-base md:text-lg">
                        {commentsNumber}
                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoCard;
