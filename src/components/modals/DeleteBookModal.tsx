import { FunctionComponent } from "react";
import { Modal, Button } from "react-bootstrap";

interface DeleteModalProps {
    show: boolean;
    onHide: () => void;
    onDelete: () => void;
    bookTitle: string; // To display the name of the book being deleted
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({ show, onHide, onDelete, bookTitle }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete the book <strong>{bookTitle}</strong>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
