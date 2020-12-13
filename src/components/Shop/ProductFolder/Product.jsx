import React, {useEffect, useState} from "react";
import Axios from "axios";
import { Button, Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

const Product = (props) => {
  const [products,setproducts] = useState([]);
  const [open, setopen] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [opendelete, setopenDelete] = useState(false);
  const [product, setproduct] = useState({});

  useEffect(() => {
      if(!open){
        getProducts();
      }
  }, [open]);

  useEffect(() => {
    if(!openEdit){
      getProducts();
    }
  }, [openEdit]);

  useEffect(() => {
      if(!opendelete){
        getProducts();
      }
  }, [opendelete]);


  const getProducts = () => {
    Axios.get("/Products/GetProduct")
        .then((res) => {
            setproducts(res.data)
        })
        .catch((err) => {
            console.log(err)
    });
  }

  const handleEditProduct = (product) => {
      setproduct(product);
      setopenEdit(true);
  }
  
  const handleDeleteProduct = (product) => {
    setproduct(product);
    setopenDelete(true);
}
  
  
  return(
    <div>
        <CreateProductModal open={open} handleModal={(value) => setopen(value)} />
        <EditProductModal product={product} openEdit={openEdit} handleModal={(value) => setopenEdit(value)} />
        <DeleteProductModal product={product} opendelete={opendelete} handleModal={(value) => setopenDelete(value)} />
        <Button content="New Product" color="blue" onClick={() => setopen(true)}></Button>
        
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {products.map((product, index) => {
                        return(
                            <Table.Row className="product-row" key ={product.productId}>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>{product.price}</Table.Cell>
                                <Table.Cell>
                                    <Button content="EDIT" color='yellow' icon='edit' labelPosition='left' onClick={() => handleEditProduct(product)}></Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button content="DELETE" color='red' icon='edit' labelPosition='left' onClick={() => handleDeleteProduct(product)}></Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </ Table>
        </div>
    )
}

export default Product