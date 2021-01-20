// 'use strict'

const {create} = require('react-test-renderer')
const db = require('../server/db')
const {
  User,
  Product,
  Order,
  ItemOrder,
  Profile
} = require('../server/db/models')
const {Shipped} = require('../server/db/models/constant.js')

const products = [
  {
    name: 'The Mandalay Gown',
    price: 140000,
    fit: 'Mermaid',
    material: 'Crepe',
    imageUrl:
      'https://s7d1.scene7.com/is/image/BHLDN/59278606_011_b5?$pdpmain$',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
  },
  {
    name: 'The Orion Gown',
    price: 120000,
    fit: 'Ballgown',
    material: 'Crepe',
    imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/329465085C_b2?$zoom$',
    description:
      'This romantic ballgown is the epitome of bridal elegance, with ornate lace overlay bringing contrasting the tulle skirt. (Plus, it has pockets!)'
  },
  {
    name: 'The Sakura Dress',
    price: 90000,
    fit: 'Mermaid',
    material: 'Crepe',
    imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/59279794_011_c1?$zoom$',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
  },
  {
    name: 'The Stella Gown',
    price: 120000,
    fit: 'A-line',
    material: 'Crepe',
    imageUrl:
      'https://s7d1.scene7.com/is/image/BHLDN/57640435_011_b1?$pdpmain$',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
  },
  {
    name: 'The Amari Dress',
    price: 80000,
    fit: 'Sheath',
    material: 'Crepe',
    imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/44899144_013_a?$pdpmain$',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
  },
  {
    name: 'The Vela Gown',
    price: 110000,
    fit: 'Mermaid',
    material: 'Crepe',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
  },
  {
    name: 'The Willow Dress',
    price: 60000,
    fit: 'Mermaid',
    material: 'Crepe',
    imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/46542577_011_b?$zoom$',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
  },
  {
    name: 'The Aria Dress',
    price: 90000,
    fit: 'Sheath',
    material: 'Crepe',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
  },
  {
    name: 'The Monaco Dress',
    price: 60000,
    fit: 'Ballgown',
    material: 'Polyester',
    imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/59205070_011_c1?$zoom$',
    description:
      'Tip-of-the-shoulder straps complete the V-neck bodice of this romantically layered gown. A blush lining and Swiss dot underlay provide striking dimension when paired with delicate lace appliques, while soft netting placement at the waist creates a flattering silhouette.'
  },
  {
    name: 'The Aloha Dress',
    price: 60000,
    fit: 'Mermaid',
    material: 'Crepe',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train.'
  }
]

const profiles = [
  {
    firstName: 'Halle',
    lastName: 'Berry',
    bAddress: '123 Berry Rd',
    bCity: 'New York',
    bState: 'NY',
    bZipCode: '10001',
    sAddress: '123 Berry Rd',
    sCity: 'New York',
    sState: 'NY',
    sZipCode: '10001',
    country: 'United States',
    phone: '123-456-7891',
    size: '6',
    weddingDate: '02/22/2022'
  },
  {
    firstName: 'Rebel',
    lastName: 'Wilson',
    bAddress: '456 Wilson Rd',
    bCity: 'Brooklyn',
    bState: 'NY',
    bZipCode: '12345',
    sAddress: '789 Another Rd',
    sCity: 'Queens',
    sState: 'NY',
    sZipCode: ' 1234',
    country: 'United States',
    phone: '123-321-1234',
    size: '18',
    weddingDate: '08/06/2021'
  },
  {
    firstName: 'Lucy',
    lastName: 'Liu',
    bAddress: '789 Liu Rd',
    bCity: ' Los Angeles',
    bState: 'NY',
    bZipCode: '12345',
    sAddress: '7789 Liu Rd',
    sCity: ' Los Angeles',
    sState: 'CA',
    sZipCode: '90210',
    country: 'United States',
    phone: '100-100-1000',
    size: '4',
    weddingDate: '12/20/2022'
  },
  {
    firstName: 'Rachel',
    lastName: 'Stack',
    bAddress: '132 Boston road',
    bCity: 'Boston',
    bState: ' MA',
    bZipCode: '1456',
    sAddress: '',
    sCity: '',
    sState: '',
    sZipCode: '',
    country: 'United States',
    phone: '345-555-7890',
    size: '2',
    weddingDate: '11/20/2026'
  },
  {
    firstName: 'Cody',
    lastName: 'Pug',
    bAddress: '2020 dog road',
    bCity: 'Chicago',
    bState: ' IL',
    bZipCode: '606',
    sAddress: '2020 dog road',
    sCity: 'Chicago',
    sState: 'IL',
    sZipCode: '6060',
    country: 'United States',
    phone: '123-456-7890',
    size: '18',
    weddingDate: '02/04/2028'
  }
]

const users = [
  {
    email: 'hberry@email.com',
    password: 'hbpassword'
  },

  {
    email: 'rwilson@email.com',
    password: 'rwpassword'
  },
  {
    email: 'lliu@email.com',
    password: 'llpassword'
  },
  {
    email: 'rstack@email.com',
    password: 'rspassword',
    isAdmin: 'true'
  },
  {
    email: 'cpug@email.com',
    password: 'cppassword',
    isAdmin: 'true'
  }
]

const shippedOrder = {
  total_price: 350000,
  total_qty: 3,
  status: 'Shipped'
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //creating all products
  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )
  //creating all users
  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )
  //createing all profiles
  await Promise.all(
    profiles.map(profile => {
      return Profile.create(profile)
    })
  )

  //setting profiles to users
  const halle = await Profile.findOne({where: {firstName: 'Halle'}})
  const rebel = await Profile.findOne({where: {firstName: 'Rebel'}})
  const lucy = await Profile.findOne({where: {firstName: 'Lucy'}})
  const rachel = await Profile.findOne({where: {firstName: 'Rachel'}})
  const cody = await Profile.findOne({where: {firstName: 'Cody'}})

  const helleUser = await User.findOne({where: {email: 'hberry@email.com'}})
  const rebelUser = await User.findOne({where: {email: 'rwilson@email.com'}})
  const lucyUser = await User.findOne({where: {email: 'lliu@email.com'}})
  const rachelUser = await User.findOne({where: {email: 'rstack@email.com'}})
  const codyUser = await User.findOne({where: {email: 'cpug@email.com'}})

  await halle.setUser(helleUser)
  await rebel.setUser(rebelUser)
  await lucy.setUser(lucyUser)
  await rachel.setUser(rachelUser)
  await cody.setUser(codyUser)

  //assign a shipped order to a few users
  const user1 = await User.findByPk(1)
  const user2 = await User.findByPk(2)
  const shippedOrder1 = await Order.create(shippedOrder)
  await shippedOrder1.setUser(user1)
  const shippedOrder2 = await Order.create(shippedOrder)
  await shippedOrder2.setUser(user2)

  //set some items to a shipped order
  const anOrder = await Order.findOne({where: {status: Shipped}})
  const dressesForItemOrder1 = await Product.findOne({where: {id: 1}})
  const dressesForItemOrder2 = await Product.findOne({where: {id: 2}})
  const dressesForItemOrder3 = await Product.findOne({where: {id: 3}})
  await anOrder.addProduct(dressesForItemOrder1, {
    through: {qty: 1, subtotal: dressesForItemOrder1.price}
  })
  await anOrder.addProduct(dressesForItemOrder2, {
    through: {qty: 1, subtotal: dressesForItemOrder2.price}
  })
  await anOrder.addProduct(dressesForItemOrder3, {
    through: {qty: 1, subtotal: dressesForItemOrder3.price}
  })

  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
