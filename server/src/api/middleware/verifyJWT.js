import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  try {
    const accToken = req.cookies.acc;
    const refToken = req.cookies.ref;
    if (!refToken) return res.status(403).json({ error: { status: 403 } });
    jwt.verify(accToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: { status: 401 } });
      const decodedJWT = {
        _id: decoded._id,
        email: decoded.email,
        fullName: decoded.fullName,
      };
      req.decoded = decodedJWT;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
