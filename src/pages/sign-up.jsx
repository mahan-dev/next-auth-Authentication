import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./registerForm.module.css";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Input from "@/module/Input";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status]);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const signUpHandler = async () => {
    const duration = {
      duration: 2000,
    };
    if (!form.email || !form.password) {
      toast.error("Please fill-out all fields", { duration: 2000 });

      return;
    }

    try {
      const res = await axios.post("/api/signUp", form);
      const data = await res.data;
      const success = data.status === "Success";
      if (success) {
        toast.success(data.message, duration);
        await new Promise((resolver) => setTimeout(resolver, 2000));
        router.replace("/sign-in");
      } else {
        toast.error("data doesn't save");
      }
    } catch (error) {
      toast.error("something went wrong", duration);
    }
  };

  const formFields = [
    {
      name: "email",
      type: "text",
    },
    {
      name: "password",
      type: "password",
    },
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__form}>
        <h2 className="mb-3">Sign Up</h2>
        <div className={styles.form__items}>
          {formFields.map((item) => {
            const { name, type } = item;

            return (
              <Input
                className={styles.items__input}
                key={name}
                name={name}
                type={type}
                onChange={changeHandler}
                value={formFields[name]}
              />
            );
          })}
        </div>

        <Button
          sx={{ mt: "1rem", textTransform: "none", fontSize: "1.3rem" }}
          variant="outlined"
          color="primary"
          onClick={signUpHandler}
        >
          {" "}
          sign up
        </Button>
      </div>
    </section>
  );
};

export default SignUp;
