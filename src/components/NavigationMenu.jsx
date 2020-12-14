import React, { useState, useEffect } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom';
import './Shop/SemanticUi.css';


const NavigationMenu = (props) => {

  const [activeItem, setactiveItem] = useState();
  let history = useHistory();

  useEffect(() => {

  }, [activeItem])

  const handleItemClick = (e, { name }) => {
    setactiveItem(name);
    history.push(`/${name}`);
  };
  
  return (
    <Menu inverted>
      <Menu.Item
        as={Link}
        name='React'
        onClick={handleItemClick}
        to='/'>
        React
      </Menu.Item>
      <Menu.Item
        as={Link}
        name='Customer'
        active={activeItem === 'Customer'}
        onClick={handleItemClick}
        to='/'>
        Customer
      </Menu.Item>

      <Menu.Item
        as={Link}
        name='Product'
        active={activeItem === 'Product'}
        onClick={handleItemClick}
        to='/Product' >
        Product
      </Menu.Item>

      <Menu.Item
        as={Link}
        name='Sales'
        active={activeItem === 'Sales'}
        onClick={handleItemClick}
        to='/Sales' >
        Sales
      </Menu.Item>            
    
      <Menu.Item
        as={Link}
        name='Store'
        active={activeItem === 'Store'}
        onClick={handleItemClick}
        to='/Store' >
        Store
      </Menu.Item>
    </Menu>
  );
}

export default NavigationMenu;
