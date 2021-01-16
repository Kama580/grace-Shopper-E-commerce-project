import React from 'react'
// import {connect} from 'react-redux'
// import {
//   fetchUsers
// } from '../store/allUsers'
// import {
//   List,
//   Paper,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Avatar,
//   Fab,
//   Button
// } from '@material-ui/core'

const defaultState = {
  detailsFormOpen: false,
  currentUserId: null
}

class ManageUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailsFormOpen: false,
      currentUserId: null
    }
  }

  // async componentDidMount() {
  //   try {
  //     await this.props.getUsers()
  //   } catch (error) {
  //     console.log('This is componentDidMount error', error)
  //   }
  // }

  // onOpenDetailsHandler(id) {
  //   this.setState({
  //     detailFormOpen: true,
  //     currentProductId: id
  //   })
  // }

  // onCloseDetailForm(event) {
  //   this.setState(defaultState)
  // }

  render() {
    return (
      <div>HELLO ITS ME</div>
      // <div className="adminContainer">
      //   <div className="adminListContainer">

      //     <Paper>
      //       <List>
      //         {this.props.users.map(user => {
      //           return (
      //               <div>
      //               <ListItem key={user.id}>
      //                 <ListItemAvatar>
      //                   <Avatar src={user.imageUrl} />
      //                 </ListItemAvatar>
      //                 <ListItemText primary={user.firstName} />
      //                 <Fab
      //                   size="small"
      //                   onClick={() => this.deleteHandler(product.id)}
      //                 >
      //                   <DeleteIcon />
      //                 </Fab>
      //                 <Fab
      //                   size="small"
      //                   onClick={() => this.onOpenHandler(product.id)}
      //                 >
      //                   <EditIcon />
      //                 </Fab>
      //               </ListItem>
      //               {this.state.detailsFormOpen &&
      //               this.state.currentUserId === user.id ? (
      //                 <ListItem key={user.firstName}>
      //                   <ListItem key={user.lastName}>
      //                     <Paper>
      //                     </Paper>
      //                   </ListItem>
      //                 </ListItem>)
      //                       : null}
      //             </div>
      //           )
      //         })}
      //       </List>
      //     </Paper>
      //   </div>
      // </div>
    )
  }
}

// const mapState = state => {
//   return {
//     users: state.users
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     getUsers: () => dispatch(fetchUser())
//   }
// }

// export default connect(mapState, mapDispatch)(ManageUsers)
export default ManageUsers
