import { compare, hash } from "bcrypt";
import { verify } from "jsonwebtoken";

const hashedPassword = async (password) => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};



const verifyPassword = async (password, hashedPasswordUser) => {
  const isValid = await compare(password, hashedPasswordUser);
  return isValid;
};
const verifyToken = (token, secretKey) => {
  try {
    const result = verify(token, secretKey);
    return { email: result.email };
  } catch {
    return false;
  }
};

export { hashedPassword, verifyPassword, verifyToken };
