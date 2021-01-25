import React from "react";
import Axios from "axios";
import { Button, Modal} from "semantic-ui-react";
import $ from 'jquery';

const DeleteStoreModal = (props) => {
  const {opendelete, handleModal, store} = props;
  
  const handleDeleteStore = (id) => {
    $.ajax({
      method: "DELETE",
      url: `/Stores/DeleteStore/${id}`,
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
          <Button content="delete" color='red' icon='delete' labelPosition='left' onClick={() => handleDeleteStore(store.storeId)}/>
        </Modal.Actions>
    </Modal>
  )
}
  
export default DeleteStoreModal
