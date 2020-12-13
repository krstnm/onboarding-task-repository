import React, {useEffect, useState} from "react";
import Axios from "axios";
import { Button, Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import CreateSalesModal from "./CreateSalesModal";
import EditSalesModal from "./EditSalesModal";
import DeleteSalesModal from "./DeleteSalesModal";

const Sales = (props) => {
  const [sales, setsales] = useState([]);
  const [customers, setcustomers] = useState([]);
  const [products, setproducts] = useState([]);
  const [stores, setstores] = useState([]);
  const [sale, setsale] = useState({});
  const [open, setopen] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [opendelete, setopenDelete] = useState(false);
  
  useEffect(() => {
    if(!open){
      getSales();
      getCustomer();
      getProduct();
      getStore();
    }
}, [open]);

  useEffect(() => {
    if(!openEdit){
      getSales();
      getCustomer();
      getProduct();
      getStore();
    }
  }, [openEdit]);
  
  useEffect(() => {
    if(!opendelete){
      getSales();
      getCustomer();
      getProduct();
      getStore();
    }
  }, [opendelete]);

  const getProduct = () => {
      fetch("/Products/GetProduct")
        .then((res) => {
            return res.json();
        })
        .then(data => {
            let options = data.map(d => ({
                "value" : d.productId,
                "label" : d.name
            }))
            setproducts(options);
        })
  }
  
  const getCustomer = () => {
      fetch("/Customers/GetCustomer")
        .then((res) => {
                return res.json();
        })
        .then(data => {
            let options = data.map(d => ({
                "value" : d.customerId,
                "label" : d.name
            }))
            setcustomers(options);
        })
    }
 
  const getStore = () => {
      fetch("/Stores/GetStore")
        .then((res) => {
            return res.json();
        })
        .then(data => {
            let options = data.map(d => ({
                "value" : d.storeId,
                "label" : d.name
        }))
            setstores(options);
    })
  }

  const getSales = () =>{
      Axios.get("/Sales/GetSales")
        .then((res) => {
            setsales(res.data)
        })
        .catch((err) => {
            console.log(err)
    })
  }

  const handleEditSale = (sale) => {
    setsale(sale);
    setopenEdit(true);
  }

  const handleDeleteSale = (sale) => {
    setsale(sale);
    setopenDelete(true);
  }


  if(customers.length >= 1 && products.length >= 1 && stores.length >= 1){
    return (
        <div>
            <CreateSalesModal customers={customers} products={products} stores={stores}
                open={open} handleModal={(value) => setopen(value)} />
                
            <EditSalesModal customers={customers} products={products} stores={stores} sale={sale}
                openEdit={openEdit} handleModal={(value) => setopenEdit(value)} />
            
            <DeleteSalesModal sale= {sale} opendelete={opendelete}
                handleModal={(value) => setopenDelete(value)} />

            <Button content="New Sale" color="blue" onClick={() => setopen(true)}></Button>
            
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Customer</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Store</Table.HeaderCell>
                            <Table.HeaderCell>Date Sold</Table.HeaderCell>                            
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>


                        {sales.map((sale, index) => {      
                        
                            const cleanedDate = new Date(sale.dateSold).toDateString();
                            const customerLabel = customers.filter(e => e.value === sale.customerId);
                            const productLabel = products.filter(e => e.value === sale.productId);
                            const storeLabel = stores.filter(e => e.value === sale.storeId);

                            return(
                                <Table.Row className="sales-row" key ={sale.salesId}> 
                                    <Table.Cell>{customerLabel[index].label}</Table.Cell>
                                    <Table.Cell>{productLabel[index].label}</Table.Cell>
                                    <Table.Cell>{storeLabel[index].label}</Table.Cell>
                                    <Table.Cell>{cleanedDate}</Table.Cell>
                                    <Table.Cell>
                                        <Button content="EDIT" color='yellow' icon='edit' labelPosition='left' onClick={() => handleEditSale(sale)}></Button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button content="DELETE" color='red' icon='edit' labelPosition='left' onClick={() => handleDeleteSale(sale)}></Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </ Table>
            </div>
        )
    }
    else{
        return(
            <div>
            <Button disabled ='true' content="New Sale" color="blue" onClick={() => setopen(true)}></Button>

            <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Customer</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Store</Table.HeaderCell>
                            <Table.HeaderCell>Date Sold</Table.HeaderCell>                            
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    </Table.Body>
                </ Table>
            </div>
        )
    }
}

export default Sales
