import { rest } from "msw";
import {
  TSignInRequest,
  TSignUpRequest,
} from "../../App/feature/auth/authSlice.types";

const SignUpApiMock = rest.post<TSignUpRequest>(
  `${import.meta.env.VITE_SERVER_URL}/auth/sign-up`,
  (req, res, ctx) => {
    const { email, fullName, password } = req.body;
    if (email && fullName && password) {
      return res(ctx.status(201), ctx.json({ accessToken: "fakeAccessToken" }));
    } else {
      return res(
        ctx.status(403),
        ctx.json({ message: "Invalid email or password" })
      );
    }
  }
);

const SignInApiMock = rest.post<TSignInRequest>(
  `${import.meta.env.VITE_SERVER_URL}/auth/sign-in`,
  (req, res, ctx) => {
    const { email, password } = req.body;
    if (email && password) {
      return res(ctx.status(200), ctx.json({ accessToken: "fakeAccessToken" }));
    } else {
      return res(
        ctx.status(403),
        ctx.json({ message: "Invalid email or password" })
      );
    }
  }
);

export { SignUpApiMock, SignInApiMock };
