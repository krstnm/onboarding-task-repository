import React, {useState, useEffect} from "react";
import { Button, Form, Modal} from "semantic-ui-react";
import $ from 'jquery';

const EditStoreModal = (props) => {
  const [name, setname] = useState();
  const [address, setaddress] = useState();
  const {openEdit, handleModal, store} = props;

  useEffect(() => {
    if(store){
        setname(store.name);
        setaddress(store.address);
    }
  }, [store])
  
  const editStore = (id) => {
    $.ajax({
        method: "PUT",
        url: `/Stores/PutStore/${id}`,
        dataType: 'json',
        data: JSON.stringify({ "storeId": id, "name": name, "address" : address }),
        contentType: 'application/json',
        success: function(res){
            handleModal(false);
        }
    })
  }
  
  const handleChange = (e, field) => {
    switch(field){
        case "name":
            setname(e.target.value);
            break;
        case "address":
            setaddress(e.target.value);
            break;
        default:
            break;
    }
  }

  if(store){
    return (
        <Modal open={openEdit} >
            <Modal.Header>Edit Store</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>NAME</label>
                            <input defaultValue={name} 
                                onChange={(event) => handleChange(event, "name")} />
                        </Form.Field>
                        <Form.Field>
                            <label>ADDRESS</label>
                            <input defaultValue={address} 
                                onChange={(event) => handleChange(event, "address")} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => handleModal(false)}>cancel</Button>
                <Button content="edit" color='green' icon='checkmark' labelPosition='right' onClick={() => editStore(store.storeId)} positive></Button>
            </Modal.Actions>
        </Modal>
    )
  }
  else {
      return(
          <div></div>
      )
  }
}
  
export default EditStoreModal
