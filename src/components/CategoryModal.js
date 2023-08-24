import { FaTimes } from "react-icons/fa";
import { useFormInput } from "../utils/common";

import {
    Modal,
    Button,
    Form
} from 'react-bootstrap';
import { toast } from "react-toastify";

function CategoryModal({ showModal, setShowModal, handleAddCategory }) {
    const categoryName = useFormInput('');
    const categoryBudget = useFormInput('');
    const categoryDescription = useFormInput('');

    const categoryPayload = {
        name: categoryName.value,
        budget: categoryBudget.value,
        description: categoryDescription.value || null
    }

    const closeModal = () => {
        setShowModal(false);
    };

    const handleCategory = async (e) => {
        e.preventDefault();
        try {
            await handleAddCategory(categoryPayload);
        } catch(error) {
            toast.error("Error in adding category");
        }
        setShowModal(false);
    }


    return (
        <Modal show={showModal} onHide={closeModal}>
            <Form onSubmit={handleCategory}>
            <Modal.Header>
                <Modal.Title>Add Category</Modal.Title>
                <FaTimes className="icon-close" style={{cursor: "pointer"}} onClick={closeModal} />
            </Modal.Header>
            <Modal.Body>
                    <Form.Group className='mb-3' controlId='categoryName'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            required
                            {...categoryName}
                            // autoComplete="new-password"
                            placeholder='e.g Food'
                        />
                        {/* <Form.Text className='text-muted'>
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="categoryBudget">
                        <Form.Label>Budget</Form.Label>
                        <Form.Control
                            type="number"
                            required
                            {...categoryBudget}
                            placeholder="e.g 500"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="categoryDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            multiline
                            {...categoryDescription}
                            placeholder="e.g This category is related to food"
                        />
                    </Form.Group>

                   
            </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="success">
                        Add
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
    );
}

export default CategoryModal;