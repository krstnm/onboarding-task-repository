import React, {useEffect, useState} from "react";
import { Button, Table, Select, Label} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import CreateCustomerModal from "./CreateCustomerModal";
import EditCustomerModal from "./EditCustomerModal";
import DeleteCustomerModal from "./DeleteCustomerModal";
import $ from 'jquery';
import ReactPaginate from 'react-paginate';

const Customer = (props) => {
  const [customers, setcustomers] = useState([]);
  const [open, setopen] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [opendelete, setopenDelete] = useState(false);
  const [customer, setcustomer] = useState({});
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [pageCount, setpageCount] = useState(0);

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

  useEffect(() => {
    getCustomers();
  }, [offset, perPage])

  const getCustomers = () => {
    $.ajax({
        method: "GET",
        url: "/Customers/GetCustomer",
        dataType: 'json',
        success: function(res){
            setcustomers(res)
            const slice = res.slice(offset, offset + perPage);
            setData(slice);
            setpageCount(Math.ceil(res.length / perPage))
        }
    })
  }

  const handlePaginationClick = (e) => {
    const selectedPage = e.selected;
    const offsets = selectedPage * perPage;
    setOffset(offsets);
  }

  const handleEditCustomer = (customer) => {
      setcustomer(customer);
      setopenEdit(true);
  }

  const handleDeleteCustomer = (customer) => {
    setcustomer(customer);
    setopenDelete(true);
  }

  const onSort = (sortKey,order) => {
      let sortCustomer = [...customers];
      switch(sortKey){
          case 'name':
            if(order === 'DESC'){
                sortCustomer.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
                const slice = sortCustomer.slice(offset, offset + perPage);
                setData(slice);
              }
              if(order === 'ASC'){
                sortCustomer.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
                const slice = sortCustomer.slice(offset, offset + perPage);
                setData(slice);
              }
            break;
        case 'address':
            if(order === 'DESC'){
                sortCustomer.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
                const slice = sortCustomer.slice(offset, offset + perPage);
                setData(slice);
              }
              if(order === 'ASC'){
                sortCustomer.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
                const slice = sortCustomer.slice(offset, offset + perPage);
                setData(slice);
              }
              break;
        default:
            throw new Error()
    }
  }

  const setPageSize = (e, data) => {
    setPerPage(data.value);
  }
  
  return(
    <div>
        <div>
            <CreateCustomerModal open={open} handleModal={(value) => setopen(value)} />
            <EditCustomerModal  customer={customer} openEdit={openEdit} handleModal={(value) => setopenEdit(value)} />
            <DeleteCustomerModal customers={customers} customer={customer} opendelete={opendelete} handleModal={(value) => setopenDelete(value)} />
            <Button content="New Customer" color="blue" onClick={() => setopen(true)}></Button>
        </div>
        <div>
            <Table sortable celled fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name
                          <Label className='sort-icon-down' icon='caret down' onClick={() => onSort('name', 'DESC')} />
                          <Label className='sort-icon-up' icon='caret up' onClick={() => onSort('name', 'ASC')} />
                          </Table.HeaderCell>
                        <Table.HeaderCell>Address
                          <Label className='sort-icon-down' icon='caret down' onClick={() => onSort('address', 'DESC')} />
                          <Label className='sort-icon-up' icon='caret up' onClick={() => onSort('address', 'ASC')} />
                        </Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body className='tbody-class'>
                {data.map(c => {
                    return (
                        <Table.Row className="customer-row" key ={c.customerId}>
                            <Table.Cell>{c.name}</Table.Cell>
                            <Table.Cell>{c.address}</Table.Cell>
                            <Table.Cell>
                                <Button content="EDIT" color='yellow' icon='edit' labelPosition='left' onClick={() => handleEditCustomer(c)}></Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button content="DELETE" color='red' icon='edit' labelPosition='left' onClick={() => handleDeleteCustomer(c)}></Button>
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
    )
}

export default Customer
