import { UserEntity } from "../../../../app/domain/entities/User";

export const userEntityMock: UserEntity = {
  id: 1,
  email: 'user_test@test.com',
  firstName: 'User',
  lastName: 'Test',
  phoneNumber: '5511999999999',
  password: '123456',
  createdAt: new Date(),
  updatedAt: new Date()
}