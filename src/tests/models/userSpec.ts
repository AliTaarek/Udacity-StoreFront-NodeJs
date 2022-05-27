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

  it('create method should create a new user', async () => {
    const userData: user = {
      firstName: 'John',
      lastName: 'Doe',
      userName: 'johndoe',
      password: 'password',
    }
    const newUser = await testUser.create(userData)
    expect(newUser.firstName).toBe('John')
    expect(newUser.lastName).toBe('Doe')
    expect(newUser.userName).toBe('johndoe')
  })

  it('index method should return all users', async () => {
    const users: userUpdate[] = await testUser.index()
    expect(users.length).toBe(1)
    expect(users[0]).toEqual({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      userName: 'johndoe',
    })
  })
})
