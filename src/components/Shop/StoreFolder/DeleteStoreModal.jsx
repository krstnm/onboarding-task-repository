import React from "react";
import Axios from "axios";
import { Button, Modal} from "semantic-ui-react";

const DeleteStoreModal = (props) => {
  const {opendelete, handleModal, store} = props;
  
  const handleDeleteStore = (id) => {
    Axios.delete(`/Stores/DeleteStore/${id}`)
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
          <Button content="delete" color='red' icon='delete' labelPosition='left' onClick={() => handleDeleteStore(store.storeId)}/>
        </Modal.Actions>
    </Modal>
  )
}
  
export default DeleteStoreModal

