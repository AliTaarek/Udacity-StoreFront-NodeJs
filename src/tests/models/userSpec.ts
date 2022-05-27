import { User, user, userUpdate } from '../../models/user'

const testUser = new User()

describe('User Model', () => {
  it('index method should be defined', () => {
    expect(testUser.index).toBeDefined()
  })
  it('show method should be defined', () => {
    expect(testUser.show).toBeDefined()
  })
  it('create method should be defined', () => {
    expect(testUser.create).toBeDefined()
  })
  it('update method should be defined', () => {
    expect(testUser.update).toBeDefined()
  })

})
