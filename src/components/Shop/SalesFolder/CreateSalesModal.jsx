import React, {useState} from "react";
import Axios from "axios";
import { Button, Form, Modal} from "semantic-ui-react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";


const CreateSalesModal = (props) => {
  const [customer, setcustomer] = useState([]);
  const [product, setproduct] = useState([]);
  const [store, setstore] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const {open, handleModal, customers, products, stores} = props;
  

  const createSales = () => {
    Axios.post('/Sales/PostSales', {
        'customerId': customer,
        'productId': product,
        'storeId': store,
        'dateSold': startDate
    })
    .then((res) => {
        handleModal(false);
    })
    .catch((err) => {
        console.log(err)
    })
  }

  const handleCancel = () => {
      handleModal(false);
  }

  const handleDropdownChangeCustomer = (event, data) => {
    setcustomer(data.value);
  }
  
  const handleDropdownChangeProduct = (event, data) => {
    setproduct(data.value);
  }

  const handleDropdownChangeStore = (event, data) => {
    setstore(data.value);
  }


  return (
    <Modal open={open}>
        <Modal.Header>Create sales</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Date Sold</label>
                    <DatePicker selected={startDate} label='Date Sold'  dateFormat="MM/dd/yyyy" onChange={date => setStartDate(date)} />
                    </Form.Field>
                    <Form.Select fluid label='Customer' options={customers.map((c, index) => {
                        return {
                            key: index,
                            text: c.label,
                            value: c.value
                        }
                    })} onChange={handleDropdownChangeCustomer} >
                    </Form.Select>
                    <Form.Select fluid label='Product' options={products.map((p, index) => {
                        return {
                            key: index,
                            text: p.label,
                            value: p.value
                        }
                    })} onChange={handleDropdownChangeProduct} >
                    </Form.Select>
                    <Form.Select fluid label='Stores' options={stores.map((s, index) => {
                        return {
                            key: index,
                            text: s.label,
                            value: s.value
                        }
                    })} onChange={handleDropdownChangeStore} >
                    </Form.Select>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={handleCancel}>cancel</Button>
                <Button content="create" color='green' icon='checkmark' labelPosition='right' onClick={createSales} positive></Button>
            </Modal.Actions>
        </Modal>
    )
}

export default CreateSalesModal