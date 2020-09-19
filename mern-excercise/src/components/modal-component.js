import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalComponent = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const remove = () => {
        handleClose();
        props.remove(props._id);
    }
        return (
            <div>
                <Button variant="danger" onClick={handleShow}>
                    Delete
                </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Delete this exercise track.</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="danger" onClick={remove}>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>
            </div>
        )
    }

    export default ModalComponent;

