import React, {useState, useEffect} from "react";
import Axios from "axios";
import { Button, Form, Modal} from "semantic-ui-react";

const EditProductModal = (props) => {
  const [name, setname] = useState();
  const [price, setprice] = useState();
  const {openEdit, handleModal, product} = props;

  useEffect(() => {
    if(product){
        setname(product.name);
        setprice(product.price);
    }
  }, [product]);
  
  const editProduct = (id) => {
    Axios.put(`/Products/PutProduct/${id}`, {
        productId: id,
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

  if(product){
    return (
        <Modal open={openEdit} >
            <Modal.Header>Edit Product</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>NAME</label>
                            <input defaultValue={name} 
                                onChange={(event) => handleChange(event, "name")} />
                        </Form.Field>
                        <Form.Field>
                            <label>PRICE</label>
                            <input defaultValue={price} 
                                onChange={(event) => handleChange(event, "price")} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => handleModal(false)}>cancel</Button>
                <Button content="edit" color='green' icon='checkmark' labelPosition='right' onClick={() => editProduct(product.productId)} positive></Button>
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
  
export default EditProductModal
