import jwt from "jsonwebtoken";
const jwtVerify = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
export default jwtVerify;
