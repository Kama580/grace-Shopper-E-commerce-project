import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {lighten, makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/allUsers'

const defaultState = {
  detailsFormOpen: false,
  currentUserId: null
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

function createData(name, calories, fat, carbs, protein) {
  return {name, calories, fat, carbs, protein}
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

class ManageUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailsFormOpen: false,
      currentUserId: null,
      orderBy: ''
    }
  }

  async componentDidMount() {
    try {
      await this.props.getUsers()
    } catch (error) {
      console.log('This is componentDidMount error', error)
    }
  }

  onOpenDetailsHandler(id) {
    this.setState({
      detailFormOpen: true,
      currentProductId: id
    })
  }

  onCloseDetailForm(event) {
    this.setState(defaultState)
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Toolbar>
          <Typography
            className={useStyles.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Users
          </Typography>
        </Toolbar>
        <Table className={useStyles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Shipping Address</TableCell>
              <TableCell align="right">Orders To Date</TableCell>
              <TableCell align="right">Admin?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.users.map(user => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.phone}</TableCell>
                <TableCell align="right">{user.shippingAddress}</TableCell>
                <TableCell align="right">0</TableCell>
                {user.isAdmin ? (
                  <TableCell align="right">Yes</TableCell>
                ) : (
                  <TableCell align="right">No</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

const mapState = state => {
  return {
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(ManageUsers)
