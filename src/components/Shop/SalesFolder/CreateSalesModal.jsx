import React, {useState} from "react";
import Axios from "axios";
import { Button, Form, Modal} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from 'jquery';

const CreateSalesModal = (props) => {
  const [customer, setcustomer] = useState([]);
  const [product, setproduct] = useState([]);
  const [store, setstore] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const {handleModal, customers, products, stores} = props;
  const [open, setOpen] = useState(false);

  const createSales = () => {
    $.ajax({
        method: "POST",
        url: "/Sales/PostSales",
        dataType: 'json',
        data: JSON.stringify({ "customerId": customer, "productId" : product, "storeId" : store, "dateSold" : startDate }),
        contentType: 'application/json',
        success: function(res){
            setOpen(false);
        }
    })
  }

  const handleCancel = () => {
      handleModal(false);
  }

  const handleChange = (e, input) => {
    switch (input) {
      case "customer":
        setcustomer(e.target.value);
        break;
      case "product":
        setproduct(e.target.value);
        break;
      case "store":
        setstore(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={<Button primary>New Sale</Button>}>
        <Modal.Header>Create sales</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Date Sold</label>
                    <DatePicker selected={startDate} label='Date Sold'  dateFormat="MM/dd/yyyy" onChange={date => setStartDate(date)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Customer</label>
                        <select label='Customer' onChange={(e) => handleChange(e, "customer")} >
                        <option value=""></option>
                        {customers.map((customer, index) => {
                            return (
                            <option key={index} value={customer.customerId}>
                                {customer.name}
                            </option>
                        );
                        })}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label>Product</label>
                        <select label='Product' onChange={(e) => handleChange(e, "product")} >
                        <option value=""></option>
                        {products.map((product, index) => {
                            return (
                            <option key={index} value={product.productId}>
                                {product.name}
                            </option>
                        );
                        })}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <label>Store</label>
                        <select label='Store' onChange={(e) => handleChange(e, "store")} >
                        <option value=""></option>
                        {stores.map((store, index) => {
                            return (
                            <option key={index} value={store.storeId}>
                                {store.name}
                            </option>
                        );
                        })}
                        </select>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    cancel
                </Button>
                <Button content="create" color='green' icon='checkmark' labelPosition='right' onClick={createSales} positive></Button>
            </Modal.Actions>
        </Modal>
    )
}

export default CreateSalesModal
