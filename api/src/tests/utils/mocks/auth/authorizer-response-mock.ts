import { LoggedUser } from "../../../../app/domain/useCases/auth/authorizer";
import { userEntityMock } from "../user/user-entity-mock";

export const authorizerResponseMock: LoggedUser = {
    id: userEntityMock.id,
    name: userEntityMock.firstName + ' ' + userEntityMock.lastName,
    email: userEntityMock.email
}