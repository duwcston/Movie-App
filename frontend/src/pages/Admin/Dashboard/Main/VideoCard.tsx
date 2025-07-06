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
            <div className="flex items-center w-[90%] mt-5">
                <div>
                    <img src={image} alt="Card Image" className="h-[3rem]" />
                </div>

                <div className="ml-4">
                    <h2 className="text-lg text-white">
                        {title}
                    </h2>
                    <p className="text-gray-500 mb-3">{date}</p>
                </div>

                <div className="flex-grow mb-5 flex items-center justify-end">
                    <div className="text-white text-lg">{commentsNumber}</div>
                </div>
            </div>
        </>
    );
};

export default VideoCard;
