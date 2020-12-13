import React, {useState, useEffect} from "react";
import Axios from "axios";
import { Button, Form, Modal} from "semantic-ui-react";

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
    Axios.put(`/Stores/PutStore/${id}`, {
        storeId: id,
        name: name,
        address: address
    })
    .then((res) => {
        handleModal(false);
    })
    .catch((err) => {
        console.log(err)
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
