import { PageNotValidate } from "@/helper/PageValidation";
import Input from "@/module/Input";
import styles from "./registerForm.module.css";
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
  const name = userEmail.split("@")[0];

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

    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  return (
    <section className="mx-4">
      <header className="flex flex-wrap justify-between my-4 gap-3">
        <h3>{name}</h3>

        <div className="flex gap-3">
          {status === "authenticated" && (
            <Button onClick={logoutHandler} variant="contained">
              Logout
            </Button>
          )}
          <Button onClick={updateHandler} variant="contained">
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

  return PageNotValidate(session);
};
