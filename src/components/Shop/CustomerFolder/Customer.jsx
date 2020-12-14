import React, {useEffect, useState} from "react";
import Axios from "axios";
import { Button, Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import CreateCustomerModal from "./CreateCustomerModal";
import EditCustomerModal from "./EditCustomerModal";
import DeleteCustomerModal from "./DeleteCustomerModal";

const Customer = (props) => {
  const [customers, setcustomers] = useState([]);
  const [open, setopen] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [opendelete, setopenDelete] = useState(false);
  const [customer, setcustomer] = useState({});

  useEffect(() => {
      if(!open){
        getCustomers();
      }
  },[open]);

  useEffect(() => {
    if(!openEdit){
      getCustomers();
    }
},[openEdit]);

useEffect(() => {
    if(!opendelete){
      getCustomers();
    }
},[opendelete]);


  const getCustomers = () => {
    Axios.get("/Customers/GetCustomer")
        .then((res) => {
            setcustomers(res.data)
        })
        .catch((err) => {
            console.log(err)
    });
  }

  const handleEditCustomer = (customer) => {
      setcustomer(customer);
      setopenEdit(true);
  }

  const handleDeleteCustomer = (customer) => {
    setcustomer(customer);
    setopenDelete(true);
}

  return(
    <div>
        <CreateCustomerModal open={open} handleModal={(value) => setopen(value)} />
        <EditCustomerModal  customer={customer} openEdit={openEdit} handleModal={(value) => setopenEdit(value)} />
        <DeleteCustomerModal customers={customers} customer={customer} opendelete={opendelete} handleModal={(value) => setopenDelete(value)} />
        <Button content="New Customer" color="blue" onClick={() => setopen(true)}></Button>
        
            <Table sortable striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body className='tbody-class'>
                    {customers.map((customer, index) => {
                        return(
                            <Table.Row className="customer-row" key ={customer.customerId}>
                                <Table.Cell>{customer.name}</Table.Cell>
                                <Table.Cell>{customer.address}</Table.Cell>
                                <Table.Cell>
                                    <Button content="EDIT" color='yellow' icon='edit' labelPosition='left' onClick={() => handleEditCustomer(customer)}></Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button content="DELETE" color='red' icon='edit' labelPosition='left' onClick={() => handleDeleteCustomer(customer)}></Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </ Table>
        </div>
    )
}

export default Customer
