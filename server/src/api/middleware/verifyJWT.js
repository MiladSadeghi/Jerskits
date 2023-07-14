import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err)
        return res.status(403).json({ error: true, message: "invalid token" });
      const decodedJWT = {
        email: decoded.email,
        username: decoded.username,
      };
      req.decoded = decodedJWT;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
