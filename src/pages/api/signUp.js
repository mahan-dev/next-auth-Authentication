import User from "@/models/User";
import { hashedPassword } from "@/utils/auth";
import connectDb from "@/utils/ConnectDb";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectDb();
  } catch (error) {
    return res.status(500).json({ message: "Database connection error" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ status: "Failed", message: "invalid data" });
  }

  const existUser = await User.findOne({ email: email });
  if (existUser) {
    return res
      .status(422)
      .json({ status: "Failed", message: "user already exist" });
  }
  const encryptedPassword = await hashedPassword(password);
  const newUser = await User.create({
    email: email,
    password: encryptedPassword,
  });

  res.status(201).json({
    status: "Success",
    message: "user created successfully",
    data: newUser,
  });
};

export default handler;
