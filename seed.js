const { green, red } = require('chalk');
const { db, Product, User } = require('./server/db');

const products = [{
  name: 'The Mandalay Gown',
  price: 1400.00,
  fit: 'Mermaid',
  material: 'Crepe',
  color: [White, Ivory],
  size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
  imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/59278606_011_b5?$pdpmain$',
  description: 'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
}, {
  name: 'The Orion Gown',
  price: 1200.00,
  fit: 'Ballgown',
  material: '',
  color: [White, Ivory, Blush, Gold, Silver],
  size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
  imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/329465085C_b2?$zoom$',
  description: 'This romantic ballgown is the epitome of bridal elegance, with ornate lace overlay bringing contrasting the tulle skirt. (Plus, it has pockets!)'
}, {
  name: 'The Sakura Dress',
  price: 900.00,
  fit: 'Mermaid',
  material: 'Crepe',
  color: [White, Ivory, Blush],
  size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
  imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/59279794_011_c1?$zoom$',
  description: 'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
}, {
  name: 'The Stella Gown',
  price: 1200.00,
  fit: 'A-line',
  material: 'Crepe',
  color: [White, Ivory, Black],
  size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
  imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/57640435_011_b1?$pdpmain$',
  description: 'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
}, {
  name: 'The Amari Dress',
  price: 800.00,
  fit: 'Sheath',
  material: 'Crepe',
  color: [Cream],
  size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
  imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/44899144_013_a?$pdpmain$',
  description: 'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
}, {
  name: 'The Vela Gown',
  price: 1100.00,
  fit: 'Mermaid',
  material: 'Crepe',
  color: [White, Yellow],
  imageUrl: '',
  description: 'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
}, {
  name: 'The Willow Dress',
  price: 600.00,
  fit: 'Mermaid',
  material: 'Crepe',
  color: [White, Ivory],
  size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
  imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/46542577_011_b?$zoom$',
  description: 'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
}, {
  name: 'The Aria Dress',
  price: 900.00,
  fit: 'Sheath',
  material: 'Crepe',
  color: [White, Ivory, Cream],
  imageUrl: '',
  description: 'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train. '
}, {
  name: 'The Monaco Dress',
  price: 600.00,
  fit: 'Ballgown',
  material: 'Polyester',
  color: [White, Ivory],
  size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
  imageUrl: 'https://s7d1.scene7.com/is/image/BHLDN/59205070_011_c1?$zoom$',
  description: 'Tip-of-the-shoulder straps complete the V-neck bodice of this romantically layered gown. A blush lining and Swiss dot underlay provide striking dimension when paired with delicate lace appliques, while soft netting placement at the waist creates a flattering silhouette.'
}, {
  name: 'The Aloha Dress',
  price: 600.00,
  fit: 'Mermaid',
  material: 'Crepe',
  color: [White, Ivory],
  size: ['0', '2', '4', '6', '8', '9', '10', '12', '14', '16', '18'],
  imageUrl: '',
  description: 'A chic square neckline lends a modern edge to this fitted mermaid gown, while floral lace details add romantic softness to the plunging back and sweeping train.'
}];

const users = [{
  firstName: 'Halle',
  lastName: 'Berry',
  email: 'hberry@email.com',
  password: 'password',
  isAdmin: 'false',
  billingAddress: '123 Berry Rd, New York, NY, 10001',
  default_shipping_address: '123 Berry Rd, New York, NY, 10001',
  country: 'United States',
  phone: '123-456-7891',
  size: '6',
  wedding_date: '02/22/2022'
}, {
  firstName: 'Rebel',
  lastName: 'Wilson',
  email: 'rwilson@email.com',
  password: 'password',
  isAdmin: 'false',
  billingAddress: '456 Wilson Rd, Brooklyn, NY, 12345',
  default_shipping_address: '789 Another Rd, Queens, NY, 1234',
  country: 'United States',
  phone: '123-321-1234',
  size: '18',
  wedding_date: '08/06/2021'
}, {
  firstName: 'Lucy',
  lastName: 'Liu',
  email: 'lliu@email.com',
  password: 'password',
  isAdmin: 'false',
  billingAddress: '789 Liu Rd, Los Angeles, CA, 90210',
  default_shipping_address: '789 Liu Rd, Los Angeles, CA, 90210',
  country: 'United States',
  phone: '100-100-1000',
  size: '4',
  wedding_date: '12/20/2022'
}, {
  firstName: 'Rachel',
  lastName: 'Stack',
  email: 'rstack@email.com',
  password: 'password',
  isAdmin: 'true',
  billingAddress: '',
  default_shipping_address: '',
  country: '',
  phone: '',
  size: '',
  wedding_date: ''
}, {
  firstName: 'Cody',
  lastName: 'Pug',
  email: 'cpug@email.com',
  password: 'password',
  isAdmin: 'true',
  billingAddress: '',
  default_shipping_address: '',
  country: '',
  phone: '',
  size: '',
  wedding_date: ''
}];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(products.map(product => {
      return Product.create(product);
    }))

    await Promise.all(users.map(user => {
      return User.create(user);
    }))

  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
