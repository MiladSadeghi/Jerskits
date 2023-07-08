let whitelist = [
  "http://localhost:5173",
  "http://jerskits.miladsdgh.ir",
  "http://localhost",
  "http://localhost:4173",
];
export const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
