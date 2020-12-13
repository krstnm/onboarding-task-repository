import React, {useState, useEffect} from "react";
import Axios from "axios";
import { Button, Form, Modal} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const EditSalesModal = (props) => {
  const [product, setproduct] = useState();
  const [store, setstore] = useState(); 
  const [customer, setcustomer] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const {openEdit, handleModal, customers, products, stores, sale} = props;


  useEffect(() => {
    if(sale){
        setcustomer(sale.customerId);
        setproduct(sale.productId);
        setstore(sale.storeId);
        setStartDate(sale.dateSold);
    }
  }, [sale])

  const editSales = (id) => {
    Axios.put(`/Sales/PutSales/${id}`, {
        'salesId': id,
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


  if (sale) {
    return (
        <Modal open={openEdit}>
            <Modal.Header>Edit sales</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Date Sold</label>
                        <DatePicker selected={Date.parse(startDate)} defaultDate={Date.parse(startDate)} label='Date Sold'  dateFormat="MM/dd/yyyy" onChange={date => setStartDate(date)} />
                        </Form.Field>
                        <Form.Select fluid label='Customer' defaultValue={sale.customerId} options={customers.map((c, index) => {
                        return {
                            key: index,
                            text: c.label,
                            value: c.value
                        }
                        })} onChange={handleDropdownChangeCustomer} >
                        </Form.Select>
                        <Form.Select fluid label='Product' defaultValue={sale.productId} options={products.map((p, index) => {
                            return {
                                key: index,
                                text: p.label,
                                value: p.value
                            }
                        })} onChange={handleDropdownChangeProduct} >
                        </Form.Select>
                        <Form.Select fluid label='Stores' defaultValue={sale.storeId} options={stores.map((s, index) => {
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
                    <Button content="edit" color='green' icon='checkmark' labelPosition='right' onClick={() => editSales(sale.salesId)} positive></Button>
                </Modal.Actions>
            </Modal>
        )
  } else {
      return (
          <div></div>
      )
  }
}

export default EditSalesModal