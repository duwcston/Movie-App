import React, { useState } from "react";
import {
    useCreateGenreMutation,
    useDeleteGenreMutation,
    useUpdateGenreMutation,
    useGetGenresQuery,
} from "../../redux/api/genre";
import { toast } from "react-toastify";
import GenreForm from "../../components/GenreForm";
import Modal from "../../components/Modal";
import { GenreProps } from "../../types/genreTypes";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const GenreList = () => {
    const { data: genres, refetch } = useGetGenresQuery({});
    const [name, setName] = useState("");
    const [selectedGenre, setSelectedGenre] = useState(null as string | null);
    const [updatingName, setUpdatingName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const [createGenre] = useCreateGenreMutation();
    const [updateGenre] = useUpdateGenreMutation();
    const [deleteGenre] = useDeleteGenreMutation();

    const handleCreateGenre = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) {
            toast.error("Genre name is required");
            return;
        }
        try {
            await createGenre({ name }).unwrap();
            toast.success("Genre created successfully");
            setName("");
            refetch();
        } catch (error) {
            console.error("Error creating genre:", error);
            toast.error("Failed to create genre");
        }
    };

    const handleUpdateGenre = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!updatingName) {
            toast.error("Genre name is required");
            return;
        }
        try {
            await updateGenre({
                id: selectedGenre,
                updatedGenre: { name: updatingName },
            }).unwrap();
            toast.success("Genre updated successfully");
            setModalVisible(false);
            setUpdatingName("");
            refetch();
        } catch (error) {
            console.error("Error updating genre:", error);
            toast.error("Failed to update genre");
        }
    };

    const handleDeleteGenre = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedGenre) {
            toast.error("No genre selected for deletion");
            return;
        }
        try {
            await deleteGenre(selectedGenre).unwrap();
            toast.success("Genre deleted successfully");
            setModalVisible(false);
            setSelectedGenre(null);
            refetch();
        } catch (error) {
            console.error("Error deleting genre:", error);
            toast.error("Failed to delete genre");
        }
    };

    return (
        <>
            <Sidebar />
            <div className="ml-[10rem] flex flex-col items-center justify-center md:flex-row pt-12">
                <div className="md:w-3/4 p-3">
                    <h1 className="h-12">Manage Genres</h1>
                    <GenreForm value={name} setValue={setName} handleSubmit={handleCreateGenre} />
                    <br />
                    <div className="flex flex-wrap">
                        {genres &&
                            genres.map((genre: GenreProps) => (
                                <div key={genre._id}>
                                    <button
                                        className="bg-gray-200 text-black py-2 px-4 rounded-lg m-2 hover:bg-gray-300 transition-colors"
                                        onClick={() => {
                                            setModalVisible(true);
                                            setSelectedGenre(genre._id);
                                            setUpdatingName(genre.name);
                                        }}
                                    >
                                        {genre.name}
                                    </button>
                                </div>
                            ))}
                        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                            <GenreForm
                                value={updatingName}
                                setValue={(value) => setUpdatingName(value)}
                                handleSubmit={handleUpdateGenre}
                                buttonText="Update"
                                handleDelete={handleDeleteGenre}
                            ></GenreForm>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GenreList;
