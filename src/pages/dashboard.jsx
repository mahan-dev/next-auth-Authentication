import Input from "@/module/input";
import { Button } from "@mui/material";
import axios from "axios";
import { getSession, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { status, data } = useSession();
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    password: "",
  });
  const userEmail = data?.user.email || "";

  useEffect(() => {
    if (status === "authenticated") {
      console.log(data);
    } else {
      console.log(data);
    }
    console.log(form);
  }, [status]);

  const logoutHandler = () => {
    signOut();
  };

  const updateHandler = async () => {
    const duration = {
      duration: 2000,
    };

    try {
      const res = await axios.post("/api/update-user-next-auth", form);
      const resData = res.data;
      console.log(resData);
      toast.success("updated successfully", duration);
    } catch (error) {
      const errorMessage = error.response?.data.message;
      console.log("🔗 ~ Dashboard.jsx:28 -> error: ", error);
      toast.error(errorMessage || "something went wrong", duration);
    }
  };

  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "enter a name",
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "enter a lastName",
    },
    {
      name: "password",
      type: "password",
      placeholder: "enter a password",
    },
  ];

  const changeHandler = (e) => {
    const { name, value } = e.target;
    // setForm((prev) => ({
    //   ...prev,
    //   [name]: value,
    // }));

    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  return (
    <section>
      <h2 className="flex justify-center my-4">hi</h2>

      <span>{userEmail}</span>

      {status === "authenticated" && (
        <Button onClick={logoutHandler} variant="contained">
          Logout
        </Button>
      )}
      <Button onClick={updateHandler} variant="contained">
        Update User
      </Button>

      {formFields.map((item) => {
        const { name, type, placeholder } = item;
        return (
          <Input
            key={name}
            className="!text-black"
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={changeHandler}
            value={form[name]}
          />
        );
      })}
    </section>
  );
};

export default Dashboard;

export const getServerSideProps = async ({ req }) => {
  // await connectDb();
  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {  session },
  };
};
