import { rest } from "msw";
import { TSignUpRequest } from "../../App/feature/auth/authSlice.types";

const SignUpApiMock = rest.post<TSignUpRequest>(
  `http://localhost:3001/api/auth/sign-up`,
  (req, res, ctx) => {
    const { email, fullName, password } = req.body;
    if (email && fullName && password) {
      return res(ctx.status(200), ctx.json({ accessToken: "fakeAccessToken" }));
    } else {
      return res(
        ctx.status(403),
        ctx.json({ message: "Invalid email or password" })
      );
    }
  }
);

export { SignUpApiMock };
