/* global describe beforeEach it */
import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {MyAccount} from './MyAccount'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('MyAccount', () => {
  let myAccount

  beforeEach(() => {
    myAccount = shallow(<MyAccount email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    expect(myAccount.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})
