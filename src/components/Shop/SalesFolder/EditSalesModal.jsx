import React, { useState } from "react";
import { Button, Icon, Modal, Form } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from 'jquery';

const EditSalesModal = (props) => {
  const { sale, customers, products, stores} = props;
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(sale.customer.customerId);
  const [product, setProduct] = useState(sale.product.productId);
  const [store, setStore] = useState(sale.store.storeId);
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (e, input) => {
    switch (input) {
      case "customer":
        setCustomer(e.target.value);
        break;
      case "product":
        setProduct(e.target.value);
        break;
      case "store":
        setStore(e.target.value);
        break;
      default:
        throw new Error();
    }
  };

  const EditSale = (id) => {
    $.ajax({
      method: "PUT",
      url: `/Sales/PutSales/${id}`,
      dataType: 'json',
      data: JSON.stringify({ "salesId": id, "customerId": customer, "productId" : product, "storeId" : store, "dateSold" : startDate }),
      contentType: 'application/json',
      success: function(res){
        setOpen(false);
      }
    })
  }    

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button color="yellow">
          <Icon name="edit"></Icon>Edit
        </Button>
      }
    >
      <Modal.Header>Edit sales</Modal.Header>
      <Modal.Content>
        <Form>
        <Form.Field>
            <label>Date Sold</label>
            <DatePicker selected={Date.parse(sale.dateSold)} defaultDate={Date.parse(sale.dateSold)} label='Date Sold'  dateFormat="MM/dd/yyyy" onChange={date => setStartDate(date)} />
            </Form.Field>
          <Form.Field>
            <label>Customer</label>
            <select value={customer} onChange={(e) => handleChange(e, "customer")} >
              <option value={sale.customer.customerId}>{sale.customer.name}</option>
              {customers
                .filter((c) => c.id !== sale.customer.customerId)
                .map((customer) => {
                  return (
                    <option key={customer.customerId} value={customer.customerId}>
                      {customer.name}
                    </option>
                  );
                })}
            </select>
          </Form.Field>
          <Form.Field>
            <label>Product</label>
            <select value={product} onChange={(e) => handleChange(e, "product")} >
              <option value={sale.product.productId}>{sale.product.name}</option>
              {products
                .filter((p) => p.id != sale.product.productId)
                .map((product) => {
                  return (
                    <option key={product.productId} value={product.productId}>
                      {product.name}
                    </option>
                  );
                })}
            </select>
          </Form.Field>
          <Form.Field>
            <label>Store</label>
            <select value={store} onChange={(e) => handleChange(e, "store")}>
              <option value={sale.store.storeId}>{sale.store.name}</option>
              {stores
                .filter((s) => s.id !== sale.store.storeId)
                .map((store) => {
                  return (
                    <option key={store.storeId} value={store.storeId}>
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
        <Button
          content="edit"
          labelPosition="right"
          icon="checkmark"
          onClick={() => EditSale(sale.salesId)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default EditSalesModal
