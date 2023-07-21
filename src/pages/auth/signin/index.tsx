export const metadata = {
  title: "Sign In - Simple",
  description: "Page description",
};

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistorySlice, useLoginSlice } from "@/store";
import { ILoginForm } from "@/store/type";
import { selectAuth } from "@/store/selectors";
import {
  APP_HOME_URL,
  AUTH_EMAIL,
  AUTH_INFO,
  AUTH_PASSWORD,
  RequestStatus,
} from "@/constant";
import { useLocalStorage } from "@/hook";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import { PAGE } from "@/constant";
import _ from "lodash";
import { BootstrapInput } from "@/components/utils/Input"
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ILoginForm>();
  // const { status, data: session } = useSession();
  const router = useRouter();
  const [keepMe, setKeepMe] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { loginRequest, resetLoginStatus } = useLoginSlice().actions;
  const [emailLocal, setEmailLocal] = useLocalStorage(AUTH_EMAIL, "");
  const [passwordLocal, setPasswordLocal] = useLocalStorage(AUTH_PASSWORD, "");
  const { loginStatus, userInfo } = useSelector(selectAuth);
  const [authInfo, setAuthInfo] = useLocalStorage(AUTH_INFO, "");
  const { createHistoryRequest } = useHistorySlice().actions;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (!_.isEmpty(emailLocal) && !_.isEmpty(passwordLocal)) {
      setKeepMe(true);
      setValue("email", emailLocal);
      setValue("password", passwordLocal);
      router.push(PAGE.DASHBOARD);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loginStatus === RequestStatus.SUCCESS) {
      if (!keepMe) {
        setEmailLocal("");
        setPasswordLocal("");
      }
      const dataSave = {
        authorId: Number(authInfo.id),
        authorUrl: authInfo.avatarUrl,
        action: `${authInfo.name} has login to Admin`,
        categoryName: "Authentication",
        fullName: authInfo.fullName,
      };
      dispatch(createHistoryRequest(dataSave));
      router.push(PAGE.DASHBOARD);
    }

    dispatch(resetLoginStatus());
  }, [
    dispatch,
    keepMe,
    loginStatus,
    resetLoginStatus,
    setEmailLocal,
    setPasswordLocal,
    userInfo,
    router,
    authInfo.id,
    authInfo.avatarUrl,
    authInfo.fullName,
    createHistoryRequest,
    authInfo.name,
  ]);

  const handleLoginWithGoogle = useCallback(async () => {
    const data = await signIn("google", {
      callbackUrl: APP_HOME_URL,
    });
  }, []);

  const handleLoginWithGithub = useCallback(async () => {
    const data = await signIn("github", {
      callbackUrl: APP_HOME_URL,
    });
  }, []);

  const onSubmit: SubmitHandler<ILoginForm> = useCallback(
    async (data) => {
      dispatch(loginRequest(data));
    },
    [dispatch, loginRequest],
  );
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <section style={{backgroundColor: "#FBFBFD"}}>
      <div className="h-screen max-w-3xl mx-auto px-4 sm:px-6 middle-form ">
        <div className="login-form">
          {/* Header Tile of form */}
          <div className="max-w-3xl mx-auto text-center pb-4">
            <h3 className="h3">
              Admin Login
            </h3>
          </div>
 
            <h4 className="h4 max-w-3xl mx-auto text-center pb-6 font-medium">
              Hey, Enter your account information to access the system
            </h4>
    
          {/* Form */}
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <BootstrapInput
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    id="email"
                    type="email"
                    className="w-full text-gray-800"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-end">
                  </div>
                  <BootstrapInput
                    {...register("password", {
                      required: true,
                      maxLength: 200,
                    })}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full text-gray-800"
                    placeholder="Enter your password"
                    endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={keepMe}
                        onChange={() => setKeepMe(!keepMe)}
                      />
                      <span className="text-gray-600 ml-2">
                        Keep me signed in
                      </span>
                    </label>
                    <Link
                      href="/auth/reset-password"
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      Having trouble signing in?
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </form>
            <div className="flex items-center my-6">
              <div
                className="border-t border-gray-300 grow mr-3"
                aria-hidden="true"
              ></div>
              <div className="text-gray-600 italic">Or try with</div>
              <div
                className="border-t border-gray-300 grow ml-3"
                aria-hidden="true"
              ></div>
            </div>
            <div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                  <button
                    type="button"
                    onClick={handleLoginWithGithub}
                    className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                    </svg>
                    <span className="flex-auto pl-16 pr-8 -ml-16">
                      Continue with GitHub
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full px-3">
                  <button
                    type="button"
                    className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
                    onClick={(event) => {
                      event.preventDefault();
                      handleLoginWithGoogle();
                    }}
                  >
                    <svg
                      className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                    </svg>
                    <span className="flex-auto pl-16 pr-8 -ml-16">
                      Continue with Google
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="text-gray-600 text-center mt-6">
              Don&apos;t you have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-600 hover:underline transition duration-150 ease-in-out"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
