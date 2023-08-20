import { useState } from "react";
import CategoryDropdown from "./CategoryDropdown";
import { FaTimes } from "react-icons/fa";
import { useFormInput } from "../utils/common";

import {
    Modal,
    Button,
    Form,
    Dropdown
} from 'react-bootstrap';

function TransactionModal({showModal, setShowModal}) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedType, setSelectedType] = useState(0);
    const transactionName = useFormInput('');
    const transactionAmount = useFormInput('');

    const addTransaction = () => {
        
    }

    const closeModal = () => {
        setShowModal(false);
    };

    const handleTransaction = () => {
        setShowModal(false);
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleTypeSelect = (type) => {
        setSelectedType(type);
    }

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>Add Transaction</Modal.Title>
                <FaTimes className="icon-close" style={{cursor: "pointer"}} onClick={closeModal} />
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3' controlId='transactionName'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            required
                            {...transactionName}
                            // autoComplete="new-password"
                            placeholder='e.g Buy Apples'
                        />
                        {/* <Form.Text className='text-muted'>
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    <CategoryDropdown
                        onCategorySelect={handleCategorySelect}
                    />

                    <Form.Group className="mb-3" controlId="transactionAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            required
                            {...transactionAmount}
                            placeholder="e.g 500"
                        />
                    </Form.Group>

                    <Dropdown style={{width: '100%'}}>
                        <Dropdown.Toggle
                        id="type-dropdown"
                        variant="light"
                        style={{width: '100%',
                        textAlign: 'left',
                        paddingLeft: '10px',
                        backgroundColor: '#dae0e5',
                        marginBottom: "8px",
                        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)'}}
                        >
                        {selectedType ? selectedType[1] : 'Transaction Type'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{width: '100%'}}>
                            <Dropdown.Item
                            key={0}
                            onClick={() => handleTypeSelect([0, "Expense"])}
                            >
                            Expense
                            </Dropdown.Item>
                            <Dropdown.Item
                            key={1}
                            onClick={() => handleTypeSelect([1, "Income"])}
                            >
                            Income
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Form>
            </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleTransaction}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
    );

}

export default TransactionModal;