import React from "react";
import Axios from "axios";
import { Button, Modal} from "semantic-ui-react";

const DeleteProductModal = (props) => {
  const {opendelete, handleModal, product} = props;
  
  const handleDeleteProduct= (id) => {
    Axios.delete(`/Products/DeleteProduct/${id}`)
        .then((res) => {
            handleModal(false);
        })
        .catch((err) => {
            console.log(err)
        });
  }
  
  return (
    <Modal open={opendelete} >
        <Modal.Header>Delete product</Modal.Header>
        <Modal.Content>
          <p>Are you sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => handleModal(false)}>
            Cancel
          </Button>
          <Button content="delete" color='red' icon='delete' labelPosition='left' onClick={() => handleDeleteProduct(product.productId)}/>
        </Modal.Actions>
    </Modal>
  )
}
  
export default DeleteProductModal

