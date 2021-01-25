import React, {useEffect, useState} from "react";
import { Button, Table, Select, Label} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import CreateStoreModal from "./CreateStoreModal";
import EditStoreModal from "./EditStoreModal";
import DeleteStoreModal from "./DeleteStoreModal";
import $ from 'jquery';
import ReactPaginate from 'react-paginate';

const Store = (props) => {
  const [stores, setstores] = useState([]);
  const [open, setopen] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [opendelete, setopenDelete] = useState(false);
  const [store, setstore] = useState({});
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [pageCount, setpageCount] = useState(0);

  useEffect(() => {
      if(!open){
        getStores();
      }
  }, [open]);

  useEffect(() => {
    if(!openEdit){
      getStores();
    }
}, [openEdit]);

  useEffect(() => {
    if(!opendelete){
      getStores();
    }
  }, [opendelete]);

  useEffect(() => {
    getStores()
  }, [offset, perPage])

  const getStores = () => {
    $.ajax({
        method: "GET",
        url: "/Stores/GetStore",
        dataType: 'json',
        success: function(res){
            setstores(res);
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

  const handleEditStore = (store) => {
      setstore(store);
      setopenEdit(true);
  }
  
  const handleDeleteStore = (store) => {
    setstore(store);
    setopenDelete(true);
  }

  const onSort = (sortKey,order) => {
    let sortStore = [...stores];
    switch(sortKey){
        case 'name':
          if(order === 'DESC'){
              sortStore.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
              const slice = sortStore.slice(offset, offset + perPage);
              setData(slice);
            }
            if(order === 'ASC'){
              sortStore.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
              const slice = sortStore.slice(offset, offset + perPage);
              setData(slice);
            }
          break;
      case 'address':
          if(order === 'DESC'){
              sortStore.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
              const slice = sortStore.slice(offset, offset + perPage);
              setData(slice);
            }
            if(order === 'ASC'){
              sortStore.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
              const slice = sortStore.slice(offset, offset + perPage);
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
        <CreateStoreModal open={open} handleModal={(value) => setopen(value)} />
        <EditStoreModal store={store} openEdit={openEdit} handleModal={(value) => setopenEdit(value)} />
        <DeleteStoreModal store={store} opendelete={opendelete} handleModal={(value) => setopenDelete(value)} />
        <Button content="New Store" color="blue" onClick={() => setopen(true)}></Button>
        
            <Table striped sortable celled fixed>
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
                {data.map(s => {
                    return (
                        <Table.Row className="store-row" key ={s.storeId}>
                          <Table.Cell>{s.name}</Table.Cell>
                          <Table.Cell>{s.address}</Table.Cell>
                          <Table.Cell>
                              <Button content="EDIT" color='yellow' icon='edit' labelPosition='left' onClick={() => handleEditStore(s)}></Button>
                          </Table.Cell>
                          <Table.Cell>
                              <Button content="DELETE" color='red' icon='edit' labelPosition='left' onClick={() => handleDeleteStore(s)}></Button>
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

export default Store
