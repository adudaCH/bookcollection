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
    const [books, setBooks] = useState<Book[]>([]); // State for books
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [selectedBook, setSelectedBook] = useState<Book | null>(null); // Selected book for deletion

    // Fetch books on component mount
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await getAllBooks(); // Call to service
                console.log("Fetched books:", res.data); // Debug the response
                setBooks(res.data); // Set the books to state
            } catch (err) {
                console.error("Error fetching books:", err);
                errorMsg("Failed to fetch books. Please try again.");
            }
        };

        fetchBooks();
    }, []);

    // Handle book deletion
    const handleDelete = async () => {
        if (selectedBook && selectedBook.id) {
            try {
                console.log("Deleting book:", selectedBook); // Debug selected book
                await deleteBook(selectedBook.id); // Call delete API
                successMsg("Book deleted successfully!");

                // Update state to remove the deleted book
                setBooks((prevBooks) =>
                    prevBooks.filter((book) => book.id !== selectedBook.id)
                );

                // Reset modal and selected book state
                setShowModal(false);
                setSelectedBook(null);
            } catch (err) {
                console.error("Failed to delete book:", err);
                errorMsg("Failed to delete the book. Please try again.");
            }
        } else {
            console.error("Selected book or book ID is undefined");
        }
    };

    return (
        <>
            <div>
                <h2 className="text-center my-4">Books List</h2>
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
                        {books.length > 0 ? (
                            books.map((book, index) => (
                                <tr key={book.id || index}> {/* Ensure `key` is unique */}
                                    <td>{index + 1}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre}</td>
                                    <td>₪{book.price}</td>
                                    <td className="text-warning">
                                        <button className="btn btn-link">
                                            {EditIcon}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setSelectedBook(book); // Set selected book
                                                setShowModal(true); // Show modal
                                            }}
                                            className="btn text-danger"
                                        >
                                            {DeleteIcon}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center">
                                    No books available. Please add some books.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Delete Modal */}
            {showModal && selectedBook && (
                <DeleteModal
                    show={showModal}
                    onHide={() => {
                        setShowModal(false); // Hide modal
                        setSelectedBook(null); // Clear selected book
                    }}
                    onDelete={handleDelete} // Delete handler
                    bookTitle={selectedBook.title} // Pass book title
                />
            )}
        </>
    );
};

export default BooksTable;
