import React, {useState} from "react";
import Axios from "axios";
import { Button, Modal} from "semantic-ui-react";

const DeleteCustomerModal = (props) => {
  const [customers, setcustomers] = useState([]);
  const {opendelete, handleModal, customer} = props;

  
  const handleDeleteCustomer = (id) => {
    Axios.delete(`/Customers/DeleteCustomer/${id}`)
        .then((res) => {
          handleModal(false);
        })
        .catch((err) => {
            console.log(err)
        });
  }
  
  return (
    <Modal open={opendelete} >
        <Modal.Header>Delete customer</Modal.Header>
        <Modal.Content>
          <p>Are you sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => handleModal(false)}>
            Cancel
          </Button>
          <Button content="delete" color='red' icon='delete' labelPosition='left' onClick={() => handleDeleteCustomer(customer.customerId)}/>
        </Modal.Actions>
    </Modal>
  )
}
  
export default DeleteCustomerModal

