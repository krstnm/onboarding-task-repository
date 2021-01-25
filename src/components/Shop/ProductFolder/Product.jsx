import React, {useEffect, useState} from "react";
import { Button, Table, Select, Label } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import $ from 'jquery';
import ReactPaginate from 'react-paginate';

const Product = (props) => {
  const [products,setproducts] = useState([]);
  const [open, setopen] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [opendelete, setopenDelete] = useState(false);
  const [product, setproduct] = useState({});
  const [order, setorder] = useState();
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [pageCount, setpageCount] = useState(0);

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

  useEffect(() => {
    getProducts()
  }, [offset, perPage])
  
  const getProducts = () => {
    $.ajax({
      method: "GET",
      url: "/Products/GetProduct",
      dataType: 'json',
      success: function(res){
         setproducts(res)
         const slice = res.slice(offset, offset + perPage);
         setData(slice);
         setpageCount(Math.ceil(res.length / perPage));
      }
    })
  }

  const handleEditProduct = (product) => {
      setproduct(product);
      setopenEdit(true);
  }
  
  const handleDeleteProduct = (product) => {
    setproduct(product);
    setopenDelete(true);
  }

  const onSort = (sortKey,order) => {
    let sortProduct = [...products];
    switch(sortKey){
        case 'name':
          if(order === 'DESC'){
              sortProduct.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
              const slice = sortProduct.slice(offset, offset + perPage);
              setData(slice);
            }
            if(order === 'ASC'){
              sortProduct.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
              const slice = sortProduct.slice(offset, offset + perPage);
              setData(slice);
            }
          break;
      case 'price':
          if(order === 'DESC') {
            const parsePrice = x => parseFloat(x.replace(/^\$/, '')) || 0
            const sortedProduct = sortProduct
              .slice()
              .sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
            const slice = sortedProduct.slice(offset, offset + perPage);
            setData(slice);
          }
          if(order === 'ASC') {
            const parsePrice = x => parseFloat(x.replace(/^\$/, '')) || 0
            const sortedProduct = sortProduct
              .slice()
              .sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
            const slice = sortedProduct.slice(offset, offset + perPage);
            setData(slice);
          }
          break;
      default:
          throw new Error()
  }
}
  
  const handlePaginationClick = (e) => {
    const selectedPage = e.selected;
    const offsets = selectedPage * perPage;
    setOffset(offsets);
  }

  const setPageSize = (e, data) => {
    setPerPage(data.value);
  }
  
  return(
    <div>
        <div>
        <CreateProductModal open={open} handleModal={(value) => setopen(value)} />
        <EditProductModal product={product} openEdit={openEdit} handleModal={(value) => setopenEdit(value)} />
        <DeleteProductModal product={product} opendelete={opendelete} handleModal={(value) => setopenDelete(value)} />
        <Button content="New Product" color="blue" onClick={() => setopen(true)}></Button>
        </div>
            <Table striped sortable celled fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name
                          <Label className='sort-icon-down' icon='caret down' onClick={() => onSort('name', 'DESC')} />
                          <Label className='sort-icon-up' icon='caret up' onClick={() => onSort('name', 'ASC')} />
                        </Table.HeaderCell>
                        <Table.HeaderCell>Price
                          <Label className='sort-icon-down' icon='caret down' onClick={() => onSort('price', 'DESC')} />
                          <Label className='sort-icon-up' icon='caret up' onClick={() => onSort('price', 'ASC')} />
                        </Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body className='tbody-class'>
                  {data.map(p => {
                      return (
                          <Table.Row className="product-row" key ={p.productId}>
                            <Table.Cell>{p.name}</Table.Cell>
                            <Table.Cell>{p.price}</Table.Cell>
                            <Table.Cell>
                                <Button content="EDIT" color='yellow' icon='edit' labelPosition='left' onClick={() => handleEditProduct(p)}></Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button content="DELETE" color='red' icon='edit' labelPosition='left' onClick={() => handleDeleteProduct(p)}></Button>
                            </Table.Cell>
                        </Table.Row>   
                      )
                  })}
                </Table.Body>
            </ Table>
            <Select className="select-filter" defaultValue={perPage}
              options={[5,10,20,30,40,50].map((p, index) => {
                  return {
                      key: index,
                      value: p,
                      text: p
                  }
              })} onChange={setPageSize}>
          </Select>
          <ReactPaginate
            pageCount={pageCount}
            marginPagesDisplayed={0}
            pageRangeDisplayed={3}
            onPageChange={handlePaginationClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
    )
}

export default Product
