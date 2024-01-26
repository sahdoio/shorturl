import { LoginResponseDto } from "../../../../app/domain/useCases/auth/login";
import { userEntityMock } from "../user/user-entity-mock";

export const loginResponseMock: LoginResponseDto = {
    accessToken: 'token',
    user: userEntityMock,
}