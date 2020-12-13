import React, {useState} from "react";
import Axios from "axios";
import { Button, Form, Modal} from "semantic-ui-react";


const CreateProductModal = (props) => {
  const [name, setname] = useState();
  const [price, setprice] = useState();
  const {open, handleModal} = props;

  const createProduct = () => {
    Axios.post('/Products/PostProduct', {
        name: name,
        price: price
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
        case "price":
            setprice(e.target.value);
            break;
        default:
            break;
    }
  }
  
  return (
  <Modal open={open} >
      <Modal.Header>Create Product</Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Field>
                    <label>NAME</label>
                    <input onBlur={(event) => handleChange(event, "name")} />
                </ Form.Field>
                <Form.Field>
                    <label>PRICE</label>
                    <input onBlur={(event) => handleChange(event, "price")} />
                </Form.Field>
            </Form>
        </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => handleModal(false)}>cancel</Button>
                <Button content="create" color='green' icon='checkmark' labelPosition='right' onClick={createProduct} positive></Button>
            </Modal.Actions>
        </Modal>
    )
}


export default CreateProductModal
