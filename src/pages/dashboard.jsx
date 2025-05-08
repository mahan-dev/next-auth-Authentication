import { PageNotValidate } from "@/helper/PageValidation";
import Input from "@/module/Input";
import styles from "./registerForm.module.css";
import { Button } from "@mui/material";
import axios from "axios";
import { getSession, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import User from "@/models/User";

const Dashboard = ({ user }) => {
  const { data } = useSession();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    password: "",
  });

  const sessionUser = data?.user;
  const userEmail = sessionUser?.email.split("@")[0] || "no name found";

  const displayName = user?.name ? user.name : sessionUser ? userEmail : "";

  const router = useRouter();

  const logoutHandler = async () => {
    await signOut({ redirect: false });
    toast.success("loggedOut successfully ");
    await new Promise((resolver) => setTimeout(resolver, 2000));
    router.replace("/sign-in");
  };

  const updateHandler = async () => {
    const duration = {
      duration: 2000,
    };

    try {
      const res = await axios.post("/api/update-userDetail", form);
      const resData = res.data;

      const success = resData.status == "Success";
      if (success) {
        toast.success(resData.message, duration);
        await new Promise((resolver) => setTimeout(resolver, 2000));
        router.reload();
      }
    } catch (error) {
      const errorMessage = error.response?.data.message;
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

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <section className="mx-4">
      <header className="flex flex-wrap items-center justify-between my-4 gap-3 max-sm:text-[0.9em]">
        <h3>{`hello 👋 ${displayName}`}</h3>

        <div className="flex gap-3">
          <Button
            sx={{ px: "0.8em" }}
            onClick={logoutHandler}
            variant="contained"
          >
            Logout
          </Button>

          <Button
            sx={{ px: "0.8em" }}
            onClick={updateHandler}
            variant="contained"
          >
            Update User
          </Button>
        </div>
      </header>

      <div className="flex flex-col justify-center gap-4 w-[300px] mt-[2em] max-sm:w-full">
        {formFields.map((item) => {
          const { name, type, placeholder } = item;
          return (
            <Input
              key={name}
              className={styles.items__input}
              name={name}
              type={type}
              placeholder={placeholder}
              onChange={changeHandler}
              value={form[name]}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Dashboard;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return PageNotValidate(session);
  }

  const email = session.user.email;

  const user = await User.findOne({ email: email });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};
