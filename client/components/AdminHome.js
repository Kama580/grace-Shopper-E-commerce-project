import React from 'react'
import ManageProducts from './ManageProducts'
import ManageUsers from './ManageUsers'
import {Tabs, Tab, AppBar} from '@material-ui/core'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'

const AdminHome = () => {
  const [selectedTab, setSelectedTab] = React.useState(0)

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  return (
    <>
      <AppBar position="static" style={{background: '#A5A58D'}}>
        <Tabs value={selectedTab} onChange={handleChange} centered>
          <Tab icon={<ShoppingBasket />} />
          <Tab icon={<PersonPinIcon />} />
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <ManageProducts />}
      {selectedTab === 1 && <ManageUsers />}
    </>
  )
}
export default AdminHome
