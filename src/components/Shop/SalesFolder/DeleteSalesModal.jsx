import React from "react";
import Axios from "axios";
import { Button, Modal} from "semantic-ui-react";

const DeleteSalesModal = (props) => {
  const {opendelete, handleModal, sale} = props;
  
  const handleDeleteSales = (id) => {
    Axios.delete(`/Sales/DeleteSales/${id}`)
        .then((res) => {
            handleModal(false);
        })
        .catch((err) => {
            console.log(err)
        });
  }
  
  return (
    <Modal open={opendelete} >
        <Modal.Header>Delete sale</Modal.Header>
        <Modal.Content>
          <p>Are you sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => handleModal(false)}>
            Cancel
          </Button>
          <Button content="delete" color='red' icon='delete' labelPosition='left' onClick={() => handleDeleteSales(sale.salesId)}/>
        </Modal.Actions>
    </Modal>
  )
}
  
export default DeleteSalesModal

