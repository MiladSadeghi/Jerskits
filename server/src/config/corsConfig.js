let whitelist = [
  "http://localhost:5173",
  "http://jerskits.miladsdgh.ir",
  "http://localhost",
  "http://localhost:4173",
  "http://192.168.1.2:5173",
  "http://127.0.0.1:5173",
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
