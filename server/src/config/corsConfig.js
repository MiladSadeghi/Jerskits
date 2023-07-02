let whitelist = ["http://localhost:5173", "http://192.168.1.4"];
export const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
