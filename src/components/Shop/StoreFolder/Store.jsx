import React, {useEffect, useState} from "react";
import Axios from "axios";
import { Button, Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import CreateStoreModal from "./CreateStoreModal";
import EditStoreModal from "./EditStoreModal";
import DeleteStoreModal from "./DeleteStoreModal";

const Store = (props) => {
  const [stores, setstores] = useState([]);
  const [open, setopen] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [opendelete, setopenDelete] = useState(false);
  const [store, setstore] = useState({});

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
  


  const getStores = () => {
    Axios.get("/Stores/GetStore")
        .then((res) => {
            setstores(res.data)
        })
        .catch((err) => {
            console.log(err)
    });
  }

  const handleEditStore = (store) => {
      setstore(store);
      setopenEdit(true);
  }
  
  const handleDeleteStore = (store) => {
    setstore(store);
    setopenDelete(true);
}
  
  
  return(
    <div>
        <CreateStoreModal open={open} handleModal={(value) => setopen(value)} />
        <EditStoreModal store={store} openEdit={openEdit} handleModal={(value) => setopenEdit(value)} />
        <DeleteStoreModal store={store} opendelete={opendelete} handleModal={(value) => setopenDelete(value)} />
        <Button content="New Store" color="blue" onClick={() => setopen(true)}></Button>
        
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {stores.map((store, index) => {
                        return(
                            <Table.Row className="customer-row" key ={store.storeId}>
                                <Table.Cell>{store.name}</Table.Cell>
                                <Table.Cell>{store.address}</Table.Cell>
                                <Table.Cell>
                                    <Button content="EDIT" color='yellow' icon='edit' labelPosition='left' onClick={() => handleEditStore(store)}></Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button content="DELETE" color='red' icon='edit' labelPosition='left' onClick={() => handleDeleteStore(store)}></Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </ Table>
        </div>
    )
}

export default Store