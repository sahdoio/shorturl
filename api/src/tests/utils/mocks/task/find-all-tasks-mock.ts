import { PaginatedResult } from "../../../../app/data/protocols/repositories/repository";
import { TaskEntity } from "../../../../app/domain/entities/Task";
import { repositoryMetadataMock } from "../repository-metadata-mock";
import { taskEntityMock } from "./task-entity-mock";

export const findAllTasksMock: PaginatedResult<TaskEntity[]> = {
    payload: [taskEntityMock],
    metadata: repositoryMetadataMock
}