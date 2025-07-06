interface GenreFormProps {
    value: string;
    setValue: (value: string) => void;
    handleSubmit?: (e: React.FormEvent) => void;
    buttonText?: string;
    handleDelete?: (e: React.FormEvent) => void;
}

const GenreForm = ({
    value,
    setValue,
    handleSubmit,
    buttonText = "Create",
    handleDelete,
}: GenreFormProps) => {
    return (
        <div className="p-3">
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    className="py-3 px-4 border rounded-lg"
                    placeholder="Enter genre name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <div className="flex justify-between">
                    <button className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors">
                        {buttonText}
                    </button>

                    {handleDelete && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default GenreForm;
