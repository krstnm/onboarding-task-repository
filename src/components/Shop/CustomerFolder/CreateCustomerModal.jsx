import React, {useState} from "react";
import { Button, Form, Modal} from "semantic-ui-react";
import $ from 'jquery';

const CreateCustomerModal = (props) => {
  const [name, setname] = useState();
  const [address, setaddress] = useState();
  const {open, handleModal} = props;

  const createCustomer = () => {
    $.ajax({
        method: "POST",
        url: "/Customers/PostCustomer",
        dataType: 'json',
        data: JSON.stringify({ "name": name, "address" : address }),
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
  
  return (
  <Modal open={open} >
      <Modal.Header>Create Customer</Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Field>
                    <label>NAME</label>
                    <input onBlur={(event) => handleChange(event, "name")} />
                </ Form.Field>
                <Form.Field>
                    <label>ADDRESS</label>
                    <input onBlur={(event) => handleChange(event, "address")} />
                </Form.Field>
            </Form>
        </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => handleModal(false)}>cancel</Button>
                <Button content="create" color='green' icon='checkmark' labelPosition='right' onClick={createCustomer} positive></Button>
            </Modal.Actions>
        </Modal>
    )
}


export default CreateCustomerModal
