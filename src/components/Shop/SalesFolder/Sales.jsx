import React, { useEffect, useState } from "react";
import { Table, Select } from "semantic-ui-react";
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
  const [order, setorder] = useState('DESC');
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [pageCount, setpageCount] = useState(0);
  const [custdirection, setcusdirection] = useState();

  useEffect(() => {
    if (sales) {
      getSales();
    }
    if (customers) {
      getCustomers();
    }
    if (products) {
      getProducts();
    }
    if (stores) {
      getStores();
    }
  }, [sales]);

  useEffect(() => {
    getSales()
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

  return (
    <div>
      <div>
        <CreateSalesModal customers={customers} products={products} stores={stores} />
      </div>
      <div>
        <Table striped sortable celled fixed>
              <Table.Header>
              <Table.Row>
                      <Table.HeaderCell>Customer</Table.HeaderCell>
                      <Table.HeaderCell>Product</Table.HeaderCell>
                      <Table.HeaderCell>Store</Table.HeaderCell>
                      <Table.HeaderCell>DateSold</Table.HeaderCell>
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
