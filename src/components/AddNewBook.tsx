import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik, FormikValues } from "formik";
import { FunctionComponent, useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Book } from "../interfaces/Interfaces";
import { postBook } from "../sevices/bookService";
import { errorMsg, successMsg } from "../sevices/toastify";

const AddNewBook: FunctionComponent = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik: FormikValues = useFormik<Book>({
        initialValues: {
            title: "",
            author: "",
            genre: "",
            price: 0,
            id: "", // If `id` is generated by the backend, it may not need to be here.
        },
        validationSchema: yup.object({
            title: yup
                .string()
                .required("Title is required")
                .min(2, "Title must be at least 2 characters"),
            author: yup
                .string()
                .required("Author is required")
                .min(2, "Author must be at least 2 characters"),
            genre: yup.string().required("Genre is required"),
            price: yup
                .number()
                .required("Price is required")
                .moreThan(0, "Price must be greater than 0"),
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                const bookPayload = { ...values, available: true }; // Include additional fields
                console.log("Submitting book:", bookPayload); // Log the payload
                await postBook(bookPayload); // Call the API
                successMsg("Book added successfully! 😊");
                formik.resetForm(); // Clear the form
                navigate("/books"); // Navigate to books list
            } catch (err) {
                console.error("Error adding book:", err); // Log error
                errorMsg("Failed to add the book. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="mx-auto mt-3"
            style={{ maxWidth: "25rem" }}
        >
            <h1 className="text-center carter-one-regular">Add New Book</h1>


            <div className="mb-3">
                <input
                    id="title"
                    name="title"
                    type="text"
                    className={`form-control ${
                        formik.touched.title && formik.errors.title ? "is-invalid" : ""
                    }`}
                    placeholder="Enter book title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                    <div className="invalid-feedback">{formik.errors.title}</div>
                )}
            </div>


            <div className="mb-3">
                <input
                    id="author"
                    name="author"
                    type="text"
                    className={`form-control ${
                        formik.touched.author && formik.errors.author ? "is-invalid" : ""
                    }`}
                    placeholder="Enter author name"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.author && formik.errors.author && (
                    <div className="invalid-feedback">{formik.errors.author}</div>
                )}
            </div>

            {/* Genre */}
            <div className="mb-3">
                <select
                    id="genre"
                    name="genre"
                    className={`form-control ${
                        formik.touched.genre && formik.errors.genre ? "is-invalid" : ""
                    }`}
                    value={formik.values.genre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="" label="Select genre" />
                    <option value="fantasy" label="Fantasy" />
                    <option value="adventure" label="Adventure" />
                    <option value="thriller" label="Thriller" />
                    <option value="crime" label="Crime" />
                </select>
                {formik.touched.genre && formik.errors.genre && (
                    <div className="invalid-feedback">{formik.errors.genre}</div>
                )}
            </div>

            {/* Price */}
            <div className="mb-3">
                <input
                    id="price"
                    name="price"
                    type="number"
                    className={`form-control ${
                        formik.touched.price && formik.errors.price ? "is-invalid" : ""
                    }`}
                    placeholder="Enter book price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price && (
                    <div className="invalid-feedback">{formik.errors.price}</div>
                )}
            </div>

            <button
                type="submit"
                className="btn btn-success w-100 d-flex align-items-center justify-content-center"
                disabled={isSubmitting}
            >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                {isSubmitting ? "Adding..." : "Add"}
            </button>
        </form>
    );
};

export default AddNewBook;
