import { SignInApiMock, SignUpApiMock } from "./auth.mock";
import { SignInWIthRefreshTokenMock } from "./navbar.mock";

const handler = [SignUpApiMock, SignInApiMock, SignInWIthRefreshTokenMock];

export default handler;
