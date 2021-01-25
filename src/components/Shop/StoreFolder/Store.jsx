import React, {useEffect, useState} from "react";
import { Button, Table, Select} from "semantic-ui-react";
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
  const [order, setorder] = useState('ASC');
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [pageCount, setpageCount] = useState(0);
  const [namedirection, setnamedirection] = useState();
  const [addressdirection, setaddressdirection] = useState();

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
              setnamedirection('descending');
              setaddressdirection(null);
              const slice = sortStore.slice(offset, offset + perPage);
              setData(slice);
              setorder('ASC');
            }
            if(order === 'ASC'){
              sortStore.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
              setnamedirection('ascending');
              setaddressdirection(null);
              const slice = sortStore.slice(offset, offset + perPage);
              setData(slice);
              setorder('DESC');
            }
          break;
      case 'address':
          if(order === 'DESC'){
              sortStore.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
              setnamedirection(null);
              setaddressdirection('descending');
              const slice = sortStore.slice(offset, offset + perPage);
              setData(slice);
              setorder('ASC');
            }
            if(order === 'ASC'){
              sortStore.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
              setnamedirection(null);
              setaddressdirection('ascending');
              const slice = sortStore.slice(offset, offset + perPage);
              setData(slice);
              setorder('DESC');
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
                        <Table.HeaderCell sorted={namedirection} onClick={() => onSort('name', order)}>Name</Table.HeaderCell>
                        <Table.HeaderCell sorted={addressdirection} onClick={() => onSort('address', order)}>Address</Table.HeaderCell>
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
