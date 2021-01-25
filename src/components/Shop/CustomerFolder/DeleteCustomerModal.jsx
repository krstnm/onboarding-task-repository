import React from "react";
import { Button, Modal} from "semantic-ui-react";
import $ from 'jquery';

const DeleteCustomerModal = (props) => {
  const {opendelete, handleModal, customer} = props;

  
  const handleDeleteCustomer = (id) => {
    $.ajax({
      method: "DELETE",
      url: `/Customers/DeleteCustomer/${id}`,
      success: function(res){
          handleModal(false);
      }
    })
  }
  
  return (
    <Modal open={opendelete} >
        <Modal.Header>Delete customer</Modal.Header>
        <Modal.Content>
          <p>Are you sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => handleModal(false)}>
            cancel
          </Button>
          <Button content="delete" color='red' icon='delete' labelPosition='left' onClick={() => handleDeleteCustomer(customer.customerId)}/>
        </Modal.Actions>
    </Modal>
  )
}
  
export default DeleteCustomerModal

