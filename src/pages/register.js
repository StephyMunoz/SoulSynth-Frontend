import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Link as MuiLink, TextField } from "@material-ui/core";
import Link from "next/link";
import { useAuth } from "@/contexts/auth";
import withoutAuth from "../hocs/withoutAuth";

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  country: yup.string().required(),
  displayName: yup.string().required(),
});

const RegisterPage = () => {
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
    <div>
      <div>
        <p>
          ¿Already have han account?
          <Link href="/login" passHref>
            <MuiLink>Log In</MuiLink>
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
                variant="outlined"
                size="small"
              />
            )}
          />
          <p>{errors.username?.message}</p>
        </div>
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
        <div>
          <Controller
            name="country"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Country"
                variant="outlined"
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
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="DisplayName"
                variant="outlined"
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
          Register
        </Button>
      </form>
    </div>
  );
};

export default withoutAuth(RegisterPage);
