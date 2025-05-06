import { Button, duration } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./registerForm.module.css";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { PageValidation } from "@/helper/PageValidation";
import toast from "react-hot-toast";
// import { pageValidation } from "@/helper/pageValidation";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const duration = {
    duration: 2000,
  };

  const signInHandler = async () => {
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    const success = res.status === 200;

    if (success) {
      toast.success("successfully loggedIn", duration);
      await new Promise((resolver) => setTimeout(resolver, 2000));
      router.push("/dashboard");
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__form}>
        <h2 className="mb-3">Sign In</h2>
        <div className={styles.form__items}>
          <input
            className={styles.items__input}
            type="text"
            name="email"
            placeholder="email"
            onChange={changeHandler}
          />
          <input
            className={styles.items__input}
            type="password"
            name="password"
            placeholder="password"
            onChange={changeHandler}
          />
        </div>

        <Button
          sx={{ mt: "1rem", textTransform: "none", fontSize: "1.5rem" }}
          variant="outlined"
          color="primary"
          onClick={signInHandler}
        >
          {" "}
          sign in
        </Button>
      </div>
    </section>
  );
};

export default SignIn;

export const getServerSideProps = async (req) => {
  console.log(req, "this is user server");
  const session = await getSession({ req });
  // return PageValidation(session);

  return {
    props: {
      session,
    },
  };
};
