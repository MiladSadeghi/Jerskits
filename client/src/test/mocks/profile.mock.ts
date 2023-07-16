import { rest } from "msw";

type SubmitProfileMockAPI = {
  firstName: string;
  lastName: string;
};

export const GetProfileMock = rest.get(
  `${import.meta.env.VITE_SERVER_URL}/profile`,
  (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ firstName: "test", lastName: "test2" })
    );
  }
);

export const SubmitProfileMock = rest.post<SubmitProfileMockAPI>(
  `${import.meta.env.VITE_SERVER_URL}/profile`,
  (req, res, ctx) => {
    const { firstName, lastName } = req.body;
    if (firstName && lastName) {
      return res(
        ctx.status(200),
        ctx.json({ newProfile: { firstName, lastName } })
      );
    }
  }
);
