import { faPenFancy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useEffect, useState } from "react";
import { Book } from "../interfaces/Interfaces";
import DeleteModal from "./modals/DeleteBookModal";
import { deleteBook, getAllBooks } from "../sevices/bookService";
import { errorMsg, successMsg } from "../sevices/toastify";

const BooksTable: FunctionComponent = () => {
    const DeleteIcon = <FontAwesomeIcon icon={faTrash} />;
    const EditIcon = <FontAwesomeIcon icon={faPenFancy} />;
    const [books, setBooks] = useState<Book[]>([]);
    const [showModal, setShowModal] = useState(false); 
    const [selectedBook, setSelectedBook] = useState<Book | null>(null); 

    // Fetch books on component mount
    useEffect(() => {
        getAllBooks()
            .then((res: any) => {
                console.log("Fetched books:", res.data); // Debug
                setBooks(res.data); 
            })
            .catch((err: any) => {
                console.error("Error fetching books:", err);
            });
    }, []);

    // Handle book deletion
    const handleDelete = () => {
        if (selectedBook && selectedBook.id) {
            console.log("Deleting book:", selectedBook); // Debug
            deleteBook(selectedBook.id)
                .then((res) => {
                    console.log("Delete response:", res.data);
                    successMsg("Book deleted successfully!");

                    // Update state to remove the deleted book
                    setBooks((prevBooks) => {
                        const updatedBooks = prevBooks.filter(
                            (book) => book.id !== selectedBook.id
                        );
                        console.log("Updated books:", updatedBooks); // Debug
                        return updatedBooks;
                    });

                    // Reset modal and selected book state
                    setShowModal(false);
                    setSelectedBook(null);
                })
                .catch((err) => {
                    console.error("Failed to delete book:", err);
                });
        } else {
            console.error("Selected book or book ID is undefined");
        }
    };

    return (
        <>
            <div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Price</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>${book.price}</td>
                                <td className="text-warning">{EditIcon}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setSelectedBook(book); 
                                            setShowModal(true); 
                                        }}
                                        className="btn text-danger"
                                    >
                                        {DeleteIcon}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Modal */}
            {showModal && selectedBook && (
                <DeleteModal
                    show={showModal}
                    onHide={() => {
                        setShowModal(false); 
                        setSelectedBook(null);
                    }} 
                    onDelete={handleDelete} 
                    bookTitle={selectedBook.title} 
                />
            )}
        </>
    );
};

export default BooksTable;
