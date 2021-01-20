import React from 'react'

function OrderHidtory(props) {
  console.log('im here')
  console.log(props)
  return (
    <div>
      {props.location.orderHistory ? (
        <table align="left">
          <caption>Order History</caption>
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {props.location.orderHistory.map(order => {
              return (
                <tr key={order.id}>
                  <td>{order.createdAt}</td>
                  <td>{`$${order.total_price / 100}`}</td>
                  <td>{order.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <div>
          Sorry, something went wrong! Try clicking order history through your
          account page
        </div>
      )}
    </div>
  )
}

export default OrderHidtory
