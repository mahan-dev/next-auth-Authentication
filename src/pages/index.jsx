import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

import { Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
const Index = ({ isUser }) => {
  const router = useRouter();
  const signoutHandler = async () => {
    const duration = 2000;

    try {
      const res = await axios.get("/api/signout");
      const data = await res.data;
      const success = data.status === "Success";
      if (success) {
        toast.success(data.message, { duration });
        await new Promise((resolver) => setTimeout(resolver, 2000));
        router.reload();
      } else {
        toast.error("cannot signout", { duration });
      }
    } catch {
      toast.error("something went wrong", {
        duration: 2000,
      });
    }
  };

  return (
    <>
      {isUser && (
        <div className="flex gap-4">
          <button>dashboard</button>
          <button onClick={signoutHandler}>signout</button>
        </div>
      )}

      {!isUser && (
        <section className="flex flex-col items-center justify-center h-screen w-full">
          <section className="bg-[#344658] w-[100%] max-w-fit text-[1.8rem] text-center p-4 rounded-md shadow-md">
            <h2 className="border-b-2 w-fit m-auto">Welcome</h2>

            <section className="flex flex-col gap-2 mt-[3rem]">
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  width: "300px",
                  fontSize: "1.5rem",
                  padding: "0",
                  bgcolor: "#486481",
                }}
              >
                <Link className="w-full px-4 py-2" href={"/sign-in"}>
                  Sign in
                </Link>
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  width: "300px",
                  fontSize: "1.5rem",
                  padding: "0",
                  bgcolor: "#486481",
                }}
              >
                {" "}
                <Link className="w-full px-4 py-2" href={"/sign-up"}>
                  Sign up
                </Link>
              </Button>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
