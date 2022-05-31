import { User, user, userUpdate } from '../../models/user'

export type test = {
  id?: number
  first_name?: string
  last_name?: string
  user_name?: string
  password?: string
}

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

  it('create method should add a user', async () => {
    const result : test= await testUser.create({
      firstName: 'John',
      lastName: 'Doe',
      userName: 'johndoe',
      password: 'password',
    })
    if (result) {
      expect(result.first_name).toBe('John')
      expect(result.last_name).toBe('Doe')
      expect(result.user_name).toBe('johndoe')
    }
  })

  it('show method should return the correct user', async () => {
    const result: test = await testUser.show(1)
    if (result) {
      expect(result.first_name).toBe('John')
      expect(result.last_name).toBe('Doe')
      expect(result.user_name).toBe('johndoe')
    }
  })

  it('update method should update the user', async () => {
    const result: test = await testUser.update(1, {
      firstName: 'John',
      lastName: 'Doe',
      userName: 'johnny',
    })
    if (result) {
      expect(result.first_name).toBe('John')
      expect(result.last_name).toBe('Doe')
      expect(result.user_name).toBe('johnny')
    }
  })
})
