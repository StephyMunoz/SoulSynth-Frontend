import { Button, Link as MuiLink, TextField } from "@material-ui/core";
import Link from "next/link";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import withoutAuth from "../hocs/withoutAuth";
import Routes from "../constants/Routes";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

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
  const [userInfo, setUserInfo] = useState(null);
  const { login } = useAuth();
  const router = useRouter();

  const onFinishLog = async (formData) => {
    try {
      const userData = {
        ...formData,
      };
      const response = await login(userData);
      console.log("response", response);
      setUserInfo(response.data);

      setResult("User logged in");
      reset();
      router.push(Routes.HOME);
    } catch (e) {
      console.log("e", e.response);
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
          console.log("errorList", newErrorList);

          setErrorsList(newErrorList);
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onFinishLog)}>
        {session ? (
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
                  variant="outlined"
                  size="small"
                />
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
                <TextField
                  {...field}
                  type="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                />
              )}
            />
            <p>{errors.email?.message}</p>
          </div>
        )}
        <Button type="submit" color="primary" variant="contained">
          Log In
        </Button>
        <p>{result}</p>
        {userInfo && <div></div>}
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
          Don´t have an account yet? {"   "}
          <Link href="/register" passHref>
            <MuiLink>Register</MuiLink>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default withoutAuth(LoginPage);
