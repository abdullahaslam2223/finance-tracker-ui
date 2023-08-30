import { useState, useContext } from "react";
import CategoryDropdown from "./CategoryDropdown";
import { FaTimes } from "react-icons/fa";
import { useFormInput } from "../utils/common";
import axios from "axios";
import { API_BASE_URL } from '../utils/config';
import { toast } from "react-toastify";
import { AuthContext } from "../App";
import { getTokenHeader } from "../utils/common";

import {
    Modal,
    Button,
    Form,
    Dropdown
} from 'react-bootstrap';

function TransactionModal({showModal, setShowModal, dispatch}) {
    const { token } = useContext(AuthContext);
    const headers = getTokenHeader(token);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedType, setSelectedType] = useState(0);
    const transactionName = useFormInput('');
    const transactionAmount = useFormInput('');

    const postData = {
        name: transactionName.value,
        category_id: selectedCategory?.id,
        amount: transactionAmount.value,
        is_income: selectedType[0]
    }

    const addTransaction = () => {
        axios.post(API_BASE_URL + "transaction", postData, { headers: headers }).then(response => {
            const res = response.data;
            console.log("Res.data", res.data);
            dispatch({type: 'ADD_TRANSACTION', payload: res.data});
            toast.success("Transaction successfully added!");
        }).catch(error => {
            toast.error("Unable to add transaction!");
        });
    }

    const closeModal = () => {
        setShowModal(false);
    };

    const handleTransaction = (e) => {
        e.preventDefault();
        addTransaction();
        setShowModal(false);
    }

    const handleTypeSelect = (type) => {
        setSelectedType(type);
    }

    return (
        <Modal show={showModal} onHide={closeModal}>
            <Form onSubmit={handleTransaction}>
            <Modal.Header>
                <Modal.Title>Add Transaction</Modal.Title>
                <FaTimes className="icon-close" style={{cursor: "pointer"}} onClick={closeModal} />
            </Modal.Header>
            <Modal.Body>
                    <Form.Group className='mb-3' controlId='transactionName'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            required
                            {...transactionName}
                            placeholder='e.g Buy Apples'
                        />
                    </Form.Group>

                    <CategoryDropdown
                        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
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

export default TransactionModal;