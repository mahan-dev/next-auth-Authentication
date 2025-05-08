import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDb from "@/utils/ConnectDb";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    await connectDb();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Failed", message: "Database connection error" });
  }

  const { name, lastName, password } = req.body;

  const session = await getSession({ req });
  let email = session?.user.email;
  if (!session) {
    return res
      .status(401)
      .json({ status: "Failed", message: "your'e not loggedIn" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "Failed", message: "user not found" });
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return res
      .status(422)
      .json({ status: "Failed", message: "user or pass is incorrect" });
  }

  user.name = name || "";
  user.lastName = lastName || "";
  // user.password = password;
  await user.save();

  return res.status(200).json({
    status: "Success",
    message: "user updated successfully",
    data: session.user.email,
  });
};

export default handler;
