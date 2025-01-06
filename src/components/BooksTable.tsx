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
    const [showModal, setShowModal] = useState(false); // Controls modal visibility
    const [selectedBook, setSelectedBook] = useState<Book | null>(null); // Tracks the book to delete

    // Fetch books on component mount
    useEffect(() => {
        getAllBooks()
            .then((res: any) => {
                setBooks(res.data); // Update state with fetched books
            })
            .catch((err: any) => {
                console.error("Error fetching books:", err);
            });
    }, []);

    // Handle delete confirmation
    const handleDelete = () => {
        if (selectedBook) {
            deleteBook(selectedBook.id) // Ensure you're passing the correct ID
                .then((res) => {
                    console.log("Delete response:", res.data); // Log the API response
                    successMsg("Book deleted successfully!");
                    // Update the state by filtering out the deleted book
                    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== selectedBook.id));
                    setShowModal(false); // Close the modal
                    setSelectedBook(null); // Clear the selected book
                })
                .catch((err) => {
                    errorMsg("Failed to delete the book.");
                    console.error("Error deleting book:", err);
                });
        }
    };

    return (
        <>
            <div className="">
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
                                            setSelectedBook(book); // Set the selected book
                                            setShowModal(true); // Show the modal
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
                    onHide={() => setShowModal(false)} // Close modal
                    onDelete={handleDelete} // Call delete handler
                    bookTitle={selectedBook.title} // Pass book title to display in the modal
                />
            )}
        </>
    );
};

export default BooksTable;
