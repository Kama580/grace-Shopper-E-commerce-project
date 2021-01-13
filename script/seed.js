// 'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

const products = [
  {
    name: 'The Mandalay Gown',
    price: 1400.0,
    fit: 'Mermaid',
    material: 'Crepe',
    color: ['White', 'Ivory'],
    size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
    imageUrl:
      'https://s7d1.scene7.com/is/image/BHLDN/59278606_011_b5?$pdpmain$',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
  },
  {
    name: 'The Orion Gown',
    price: 1200.0,
    fit: 'Ballgown',
    material: 'Crepe',
    color: ['White', 'Ivory'],
    size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
    imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/329465085C_b2?$zoom$',
    description:
      'This romantic ballgown is the epitome of bridal elegance, with ornate lace overlay bringing contrasting the tulle skirt. (Plus, it has pockets!)'
  },
  {
    name: 'The Sakura Dress',
    price: 900.0,
    fit: 'Mermaid',
    material: 'Crepe',
    color: ['White', 'Ivory'],
    size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
    imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/59279794_011_c1?$zoom$',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
  },
  {
    name: 'The Stella Gown',
    price: 1200.0,
    fit: 'A-line',
    material: 'Crepe',
    color: ['White', 'Ivory'],
    size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
    imageUrl:
      'https://s7d1.scene7.com/is/image/BHLDN/57640435_011_b1?$pdpmain$',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
  },
  {
    name: 'The Amari Dress',
    price: 800.0,
    fit: 'Sheath',
    material: 'Crepe',
    color: ['White', 'Ivory'],
    size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
    imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/44899144_013_a?$pdpmain$',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
  },
  {
    name: 'The Vela Gown',
    price: 1100.0,
    fit: 'Mermaid',
    material: 'Crepe',
    color: ['White', 'Ivory'],
    imageUrl: '',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
  },
  {
    name: 'The Willow Dress',
    price: 600.0,
    fit: 'Mermaid',
    material: 'Crepe',
    color: ['White', 'Ivory'],
    size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
    imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/46542577_011_b?$zoom$',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
  },
  {
    name: 'The Aria Dress',
    price: 900.0,
    fit: 'Sheath',
    material: 'Crepe',
    color: ['White', 'Ivory'],
    imageUrl: '',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
  },
  {
    name: 'The Monaco Dress',
    price: 600.0,
    fit: 'Ballgown',
    material: 'Polyester',
    color: ['White', 'Ivory'],
    size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
    imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/59205070_011_c1?$zoom$',
    description:
      'Tip-of-the-shoulder straps complete the V-neck bodice of this romantically layered gown. A blush lining and Swiss dot underlay provide striking dimension when paired with delicate lace appliques, while soft netting placement at the waist creates a flattering silhouette.'
  },
  {
    name: 'The Aloha Dress',
    price: 600.0,
    fit: 'Mermaid',
    material: 'Crepe',
    color: ['White', 'Ivory'],
    size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
    imageUrl: '',
    description:
      'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train.'
  }
]

const users = [
  {
    firstName: 'Halle',
    lastName: 'Berry',
    email: 'hberry@email.com',
    password: 'hbpassword',
    isAdmin: 'false',
    billingAddress: '123 Berry Rd, New York, NY, 10001',
    shippingAddress: '123 Berry Rd, New York, NY, 10001',
    country: 'United States',
    phone: '123-456-7891',
    size: '6',
    weddingDate: '02/22/2022'
  },
  {
    firstName: 'Rebel',
    lastName: 'Wilson',
    email: 'rwilson@email.com',
    password: 'rwpassword',
    isAdmin: 'false',
    billingAddress: '456 Wilson Rd, Brooklyn, NY, 12345',
    shippingAddress: '789 Another Rd, Queens, NY, 1234',
    country: 'United States',
    phone: '123-321-1234',
    size: '18',
    weddingDate: '08/06/2021'
  },
  {
    firstName: 'Lucy',
    lastName: 'Liu',
    email: 'lliu@email.com',
    password: 'llpassword',
    isAdmin: 'false',
    billingAddress: '789 Liu Rd, Los Angeles, CA, 90210',
    shippingAddress: '789 Liu Rd, Los Angeles, CA, 90210',
    country: 'United States',
    phone: '100-100-1000',
    size: '4',
    weddingDate: '12/20/2022'
  },
  {
    firstName: 'Rachel',
    lastName: 'Stack',
    email: 'rstack@email.com',
    password: 'rspassword',
    isAdmin: 'true',
    billingAddress: '132 Boston road, Boston, MA, 1456',
    shippingAddress: '',
    country: 'United States',
    phone: '345-555-7890',
    size: '2',
    weddingDate: '11/20/2026'
  },
  {
    firstName: 'Cody',
    lastName: 'Pug',
    email: 'cpug@email.com',
    password: 'cppassword',
    billingAddress: '2020 dog road, New York City, NY, 10101',
    shippingAddress: '2020  No catsallowed street, New York City, NY, 10111',
    phone: '123-456-7890',
    size: '18',
    weddingDate: '02/04/2028'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

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
