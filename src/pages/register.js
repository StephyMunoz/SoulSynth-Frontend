import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Link as MuiLink, TextField } from "@material-ui/core";
import Link from "next/link";
import { useAuth } from "@/contexts/auth";
import withoutAuth from "../hocs/withoutAuth";
import PropTypes from "prop-types";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Routes from "../constants/Routes";
import styles from "@/styles/register.module.css";
import styled from "styled-components";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  country: yup.string().required(),
  displayName: yup.string().required(),
});

const RegisterPage = () => {
  const [session] = useSession();
  const router = useRouter();

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
  const [userInfo, setUserInfo] = useState(null);
  const { register } = useAuth();

  useEffect(() => {
    if (!session) {
      router.push(Routes.SignIn);
    }
  });

  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Sending data...");

    try {
      const userData = {
        ...formData,
      };
      const response = await register(userData);
      console.log("response", response);
      setUserInfo(response.data);

      setResult("User properly register");
      reset();
    } catch (e) {
      console.log("e", e.response);
      const { response } = e;
      setResult("An error has occurred :(");

      if (response) {
        if (response.data.errors) {
          const errors = response.data.errors;
          // const errorList = Object.values(errors);
          const newErrorList = [];

          for (let field in errors) {
            newErrorList.push(...errors[field]);
          }
          console.log("errorList", newErrorList);

          setErrorsList(newErrorList);
        }
      }
    }
  };

  return (
    <div className={styles.RegisterPage}>
      <Title>
        Almost there...just confirm this <br /> information and we`re good to go
      </Title>
      {!session && (
        <div>
          <div>
            <p>
              ¿Already have han account?
              <Link href="/login" passHref>
                <MuiLink> Log In</MuiLink>
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    variant="standard"
                    size="small"
                  />
                  // <Account
                )}
              />
              <p>{errors.username?.message}</p>
            </div>
            <div>
              <Controller
                name="email"
                control={control}
                defaultValue={session.user.email}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled
                    type="email"
                    label="Email"
                    variant="standard"
                    size="small"
                  />
                )}
              />
              <p>{errors.email?.message}</p>
            </div>
            <div>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    variant="standard"
                    size="small"
                  />
                )}
              />
              <p>{errors.country?.message}</p>
            </div>
            <div>
              <Controller
                name="displayName"
                control={control}
                defaultValue={session.user.name}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled
                    label="Display name"
                    variant="standard"
                    size="small"
                  />
                )}
              />
              <p>{errors.displayName?.message}</p>
            </div>

            <p>{result}</p>
            {userInfo && (
              <div>
                <div>Username: {userInfo.username}</div>
                <div>Token: {userInfo.token}</div>
              </div>
            )}

            {errorsList.length > 0 && (
              <ul>
                {errorsList.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}
            <Button type="submit" color="primary" variant="contained">
              ACCEPT
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default withoutAuth(RegisterPage);

RegisterPage.propTypes = {
  session: PropTypes.object,
};

const Title = styled.h1`
  font-weight: lighter;
  margin: 50px;
`;
