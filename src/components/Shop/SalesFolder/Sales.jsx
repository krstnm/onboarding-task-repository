import React, { useEffect, useState } from "react";
import { Table, Select, Label } from "semantic-ui-react";
import CreateSalesModal from "./CreateSalesModal";
import EditSalesModal from "./EditSalesModal";
import DeleteSalesModal from "./DeleteSalesModal";
import $ from 'jquery';
import ReactPaginate from 'react-paginate';

const Sales = () => {
  const [sales, setsales] = useState([]);
  const [customers, setcustomers] = useState([]);
  const [products, setproducts] = useState([]);
  const [stores, setstores] = useState([]);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [pageCount, setpageCount] = useState(0);


  useEffect(() => {
    getSales()
    getCustomers()
    getProducts()
    getStores()
  }, [offset, perPage])

  const getCustomers = () => {
    $.ajax({
      method: "GET",
      url: "/Customers/GetCustomer",
      dataType: 'json',
      success: function(res){
        setcustomers(res);
      }
    })
  }
  
  const getSales = () => {
    $.ajax({
      method: "GET",
      url: "/Sales/GetSales",
      dataType: 'json',
      success: function(res){
        setsales(res)
        const slice = res.slice(offset, offset + perPage);        
        setData(slice);
        setpageCount(Math.ceil(res.length / perPage));
        }
    })
  }

  const handlePaginationClick = (e) => {
    const selectedPage = e.selected;
    const offsets = selectedPage * perPage;
    setOffset(offsets);
  }

  const getStores = () => {
    $.ajax({
      method: "GET",
      url: "/Stores/GetStore",
      dataType: 'json',
      success: function(res){
        setstores(res);
      }
    })
  }

  const getProducts = () => {
    $.ajax({
      method: "GET",
      url: "/Products/GetProduct",
      dataType: 'json',
      success: function(res){
        setproducts(res);
      }
    })
  }

  const setPageSize = (e, data) => {
    setPerPage(data.value);
  }

  const onSort = (sortKey,order) => {
    let sortSales = [...sales];
    switch(sortKey){
        case 'customer':
          if(order === 'DESC'){
              sortSales.sort((a, b) => a.customer.name.localeCompare(b.customer.name))
              const slice = sortSales.slice(offset, offset + perPage);
              setData(slice);
            }
            if(order === 'ASC'){
              sortSales.sort((a, b) => b.customer.name.localeCompare(a.customer.name))
              const slice = sortSales.slice(offset, offset + perPage);
              setData(slice);
            }
          break; 
        case 'product':
          if(order === 'DESC'){
              sortSales.sort((a, b) => a.product.name.localeCompare(b.product.name))
              const slice = sortSales.slice(offset, offset + perPage);
              setData(slice);
            }
            if(order === 'ASC'){
              sortSales.sort((a, b) => b.product.name.localeCompare(a.product.name))
              const slice = sortSales.slice(offset, offset + perPage);
              setData(slice);
            }
          break;  
        case 'store':
          if(order === 'DESC'){
              sortSales.sort((a, b) => a.store.name.localeCompare(b.store.name))
              const slice = sortSales.slice(offset, offset + perPage);
              setData(slice);
            }
            if(order === 'ASC'){
              sortSales.sort((a, b) => b.store.name.localeCompare(a.store.name))
              const slice = sortSales.slice(offset, offset + perPage);
              setData(slice);
            }
          break;         
        case 'dateSold':
          if(order === 'DESC'){
              sortSales.sort((a, b) => new Date(a.dateSold) - new Date(b.dateSold))
              const slice = sortSales.slice(offset, offset + perPage);
              setData(slice);
            }
            if(order === 'ASC'){
              sortSales.sort((a, b) => new Date(b.dateSold) - new Date(a.dateSold))
              const slice = sortSales.slice(offset, offset + perPage);
              setData(slice);
            }
          break;
      default:
          throw new Error()
  }
}

  return (
    <div>
      <div>
        <CreateSalesModal customers={customers} products={products} stores={stores} />
      </div>
      <div>
        <Table striped sortable celled fixed>
              <Table.Header>
              <Table.Row>
                      <Table.HeaderCell>Customer
                        <Label className='sort-icon-down' icon='caret down' onClick={() => onSort('customer', 'DESC')} />
                        <Label className='sort-icon-up' icon='caret up' onClick={() => onSort('customer', 'ASC')} />
                      </Table.HeaderCell>
                      <Table.HeaderCell>Product
                        <Label className='sort-icon-down' icon='caret down' onClick={() => onSort('product', 'DESC')} />
                        <Label className='sort-icon-up' icon='caret up' onClick={() => onSort('product', 'ASC')} />
                      </Table.HeaderCell>
                      <Table.HeaderCell>Store
                        <Label className='sort-icon-down' icon='caret down' onClick={() => onSort('store', 'DESC')} />
                        <Label className='sort-icon-up' icon='caret up' onClick={() => onSort('store', 'ASC')} />
                      </Table.HeaderCell>
                      <Table.HeaderCell>DateSold
                        <Label className='sort-icon-down' icon='caret down' onClick={() => onSort('dateSold', 'DESC')} />
                        <Label className='sort-icon-up' icon='caret up' onClick={() => onSort('dateSold', 'ASC')} />
                      </Table.HeaderCell>
                      <Table.HeaderCell>Actions</Table.HeaderCell>
                      <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
              </Table.Header>

          <Table.Body className='tbody-class'>
                {data.map(sale => {
                  const cleanedDate = new Date(sale.dateSold).toDateString();
                    return (
                      <Table.Row className="sales-row" key ={sale.salesId}>
                      <Table.Cell>{sale.customer.name}</Table.Cell>
                      <Table.Cell>{sale.product.name}</Table.Cell>
                      <Table.Cell>{sale.store.name}</Table.Cell>
                      <Table.Cell>{cleanedDate}</Table.Cell>
                      <Table.Cell>
                      <EditSalesModal
                        sale={sale}
                        customers={customers}
                        products={products}
                        stores={stores}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <DeleteSalesModal sale={sale} />
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
    </div>
  );
};

export default Sales  
