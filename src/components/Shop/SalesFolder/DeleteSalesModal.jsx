import React, {useState} from "react";
import { Button, Modal, Icon} from "semantic-ui-react";
import $ from 'jquery';

const DeleteSalesModal = (props) => {
  const {handleModal, sale} = props;
  const [open, setOpen] = useState(false);
  
  const handleDeleteSales = (id) => {
    $.ajax({
      method: "DELETE",
      url: `/Sales/DeleteSales/${id}`,
      success: function(res){
          setOpen(false);
      }
    })
  }
  
  return (
    <Modal  onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={
      <Button color="red">
        <Icon name="trash"></Icon>Delete
      </Button>
      }>
        <Modal.Header>Delete sale</Modal.Header>
        <Modal.Content>
          <p>Are you sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            cancel
          </Button>
          <Button content="delete" color='red' icon='delete' labelPosition='left' onClick={() => handleDeleteSales(sale.salesId)}/>
        </Modal.Actions>
    </Modal>
  )
}
  
export default DeleteSalesModal
