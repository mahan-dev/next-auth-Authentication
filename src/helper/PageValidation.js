export const PageValidation = (token) => {
  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};

export const PageNotValidate = (token) => {
    
  if (!token) {
    console.log("hi im working")
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};
