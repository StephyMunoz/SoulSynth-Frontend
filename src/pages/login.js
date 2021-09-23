import { Button, Link as MuiLink, TextField, Typography } from "@material-ui/core";
import Link from "next/link";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import { makeStyles } from "@material-ui/core/styles";
import withoutAuth from "../hocs/withoutAuth";
import Routes from "../constants/Routes";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import styles from "@/styles/register.module.css";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const useStyles = makeStyles(() => ({
  logInButton: {
    backgroundColor: "#40F113",
    margin: "20px 0px"
  },
  greenText: {
    color: "#40F113"
  }
}));

const LoginPage = () => {
  const [session] = useSession();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [result, setResult] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const { login } = useAuth();
  const router = useRouter();
  const classes = useStyles();

  const onFinishLog = async (formData) => {
    try {
      const userData = {
        ...formData,
      };
      const response = await login(userData);
      console.log("response", response);
      setResult("User logged in");
      reset();
      router.push(Routes.HOME);
    } catch (e) {
      const { response } = e;
      setResult("An error has occurred");

      if (response) {
        if (response.data.errors) {
          const errors = response.data.errors;
          // const errorList = Object.values(errors);
          const newErrorList = [];

          for (let field in errors) {
            newErrorList.push(...errors[field]);
          }
          setErrorsList(newErrorList);
        }
      }
    }
  };

  return (
    <div className={styles.RegisterPage}>
      <Title>If you already have an account here, just Log in!</Title>
      <form onSubmit={handleSubmit(onFinishLog)}>
        {session ? (
          <div>
            <Controller
              name="email"
              control={control}
              defaultValue={session.user.email}
              render={({ field }) => (
                <div>
                  <TextField
                    {...field}
                    disabled
                    type="email"
                    label="Email"
                    variant="standard"
                    size="small"
                  />
                  
                  <AccountCircleIcon />
                  
                </div>
              )}
            />
            <p>{errors.email?.message}</p>
          </div>
        ) : (
          <div>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <TextField
                    {...field}
                    type="email"
                    label="Email"
                    variant="standard"
                    size="small"
                    borderColor="white"
                  />
                  <AccountCircleIcon />
                </div>
              )}
            />
            <p>{errors.email?.message}</p>
          </div>
        )}
        <Button type="submit" variant="contained" className={classes.logInButton}>
          Log In
        </Button>
        <p>{result}</p>
        {errorsList.length > 0 && (
          <ul>
            {errorsList.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </form>{" "}
      <div>
        <p>
          <Typography variant="h6">
            Don´t have an account yet? {"   "}
            <Link href="/register" passHref>
              <MuiLink className={classes.greenText}>Register</MuiLink>
            </Link>
          </Typography>
        </p>
      </div>
    </div>
  );
};

export default withoutAuth(LoginPage);

const Title = styled.h1`
  font-weight: lighter;
  padding-bottom: 50px;
`;
