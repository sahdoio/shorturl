import { TaskEntity } from "../../../../app/domain/entities/Task";
import Config from "../../../../config/config";

export const taskEntityMock: TaskEntity = {
  id: 1,
  name: 'user_test@test.com',
  statusId: Config.TASK_STATUS.TO_DO,
  createdAt: new Date(),
  updatedAt: new Date()
}