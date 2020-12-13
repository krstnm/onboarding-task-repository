import React, {useState, useEffect} from "react";
import Axios from "axios";
import { Button, Form, Modal} from "semantic-ui-react";

const EditCustomerModal = (props) => {
  const [name, setname] = useState();
  const [address, setaddress] = useState();
  const {openEdit, handleModal, customer} = props;

  useEffect(() => {
    if(customer){
        setname(customer.name);
        setaddress(customer.address);
    }
  }, [customer])
  
  const editCustomer = (id) => {
    Axios.put(`/Customers/PutCustomer/${id}`, {
        customerId: id,
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

  if(customer){
    return (
        <Modal open={openEdit} >
            <Modal.Header>Edit Customer</Modal.Header>
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
                <Button content="edit" color='green' icon='checkmark' labelPosition='right' onClick={() => editCustomer(customer.customerId)} positive></Button>
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
  
export default EditCustomerModal
