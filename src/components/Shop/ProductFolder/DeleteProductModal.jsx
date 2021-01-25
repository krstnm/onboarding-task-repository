import React from "react";
import { Button, Modal} from "semantic-ui-react";
import $ from 'jquery';

const DeleteProductModal = (props) => {
  const {opendelete, handleModal, product} = props;
  
  const handleDeleteProduct= (id) => {
    $.ajax({
      method: "DELETE",
      url: `/Products/DeleteProduct/${id}`,
      success: function(res){
          handleModal(false);
      }
    })
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
