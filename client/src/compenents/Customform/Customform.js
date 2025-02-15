import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Customform.module.css";
import useInput from "../../hooks/use-input";
import Button from "@mui/material/Button";
import { changePassword, login, register } from "../../store/Auth/auth-actions";
import { authActions } from "../../store/Auth/auth-slice";
import { motion } from "framer-motion";
import {
  FilledInput,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import { LOGIN, REGISTER, CHANGEPASSWORD } from "../../utils";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { cn } from "../../utils"; // Assuming you have the cn utility from your main page

const Customform = ({ pageType }) => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth);

  const {
    value: name,
    isValid: isNameValid,
    hasError: hasNameError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "" && value.length < 10);
  const nameErrorMsg =
    "Name is necessary and should be less than 10 characters";

  const {
    value: username,
    isValid: isUserameValid,
    hasError: hasUsernameError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput(
    (value) => value.trim() !== "" && value.length >= 4 && value.length < 10
  );
  const usernameErrorMsg =
    "Username is necessary and should be Unique and less than 10 characters and greater than or equal to 4 characters";

  const {
    value: email,
    isValid: isEmailValid,
    hasError: hasEmailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
  );
  const emailErrorMsg =
    "Email is necessary and should be an valid Email and Unique";

  const {
    value: password,
    isValid: isPassValid,
    hasError: hasPassError,
    valueChangeHandler: passChangeHandler,
    inputBlurHandler: passBlurHandler,
    reset: resetPass,
  } = useInput((value) => value.length >= 6);
  const passErrorMsg =
    "Password is necessary and should be greater than or equal to 6 characters";

  const {
    value: oldPassword,
    isValid: isOldPassValid,
    hasError: hasOldPassError,
    valueChangeHandler: oldPassChangeHandler,
    inputBlurHandler: oldPassBlurHandler,
    reset: resetOldPass,
  } = useInput((value) => value.length >= 6);
  const oldPassErrorMsg =
    "Old Password is necessary and should be greater than or equal to 6 characters";

  const {
    value: passwordVer,
    isValid: isPassVerValid,
    hasError: hasPassVerError,
    valueChangeHandler: passVerChangeHandler,
    inputBlurHandler: passVerBlurHandler,
    reset: resetPassVer,
  } = useInput((value) => value.length >= 6 && value === password);
  const passVerErrorMsg =
    "Verify Password is necessary and should be same as Password";

  // emailUnameSelection: username, email
  const [emailUnameSelection, setEUSelection] = useState("username");

  useEffect(() => {
    resetName();
    resetUsername();
    resetEmail();
    resetPass();
    resetPassVer();
    resetOldPass();

    return () => dispatch(authActions.setError({ error: undefined }));
  }, [
    pageType,
    dispatch,
    resetName,
    resetUsername,
    resetEmail,
    resetPass,
    resetPassVer,
    resetOldPass,
  ]);

  // final validations for form
  const isRegisterFormValid =
    isNameValid &&
    isUserameValid &&
    isEmailValid &&
    isPassValid &&
    isPassVerValid;
  const isLoginFormValid =
    isPassValid &&
    (emailUnameSelection === "username" ? isUserameValid : isEmailValid);
  const isChangePassFormValid =
    isUserameValid &&
    isEmailValid &&
    isOldPassValid &&
    isPassValid &&
    isPassVerValid;

  let isFormValid;
  switch (pageType) {
    case REGISTER:
      isFormValid = isRegisterFormValid;
      break;
    case LOGIN:
      isFormValid = isLoginFormValid;
      break;
    case CHANGEPASSWORD:
      isFormValid = isChangePassFormValid;
      break;
    default:
      break;
  }

  const loginHandler = () => {
    emailUnameSelection === "username" &&
      dispatch(login(username, undefined, password));
    emailUnameSelection === "email" &&
      dispatch(login(undefined, email, password));
  };
  const registerHandler = () =>
    dispatch(register(name, username, email, password, passwordVer));
  const changePassHandler = () =>
    dispatch(changePassword(username, email, oldPassword, password));

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) return;
    switch (pageType) {
      case REGISTER:
        isFormValid = registerHandler();
        break;
      case LOGIN:
        isFormValid = loginHandler();
        break;
      case CHANGEPASSWORD:
        isFormValid = changePassHandler();
        break;
      default:
        break;
    }

    resetPass();
    resetPassVer();
    resetOldPass();
  };

  // Generate paths for background beams (simplified version)
  const paths = Array.from({ length: 20 }, (_, i) => {
    const offset = i * 8;
    return `M-${380 - offset} -${189 + offset}C-${380 - offset} -${
      189 + offset
    } -${312 - offset} ${216 - offset} ${152 - offset} ${343 - offset}C${
      616 - offset
    } ${470 - offset} ${684 - offset} ${875 - offset} ${684 - offset} ${
      875 - offset
    }`;
  });

  return (
    <Fragment>
      {/* Replace the old background with animated beams */}
      <div
        className={cn(
          "absolute h-full w-full inset-0 [mask-size:40px] [mask-repeat:no-repeat] flex items-center justify-center bg-neutral-950",
          classes.bgContainer
        )}
      >
        <svg
          className="z-0 h-full w-full pointer-events-none absolute"
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763"
            stroke="url(#paint0_radial_242_278)"
            strokeOpacity="0.05"
            strokeWidth="0.5"
          ></path>

          {paths.map((path, index) => (
            <motion.path
              key={`path-${index}`}
              d={path}
              stroke={`url(#linearGradient-${index})`}
              strokeOpacity="0.4"
              strokeWidth="0.5"
              initial={{
                opacity: 0.4,
              }}
            ></motion.path>
          ))}
          <defs>
            {paths.map((path, index) => (
              <motion.linearGradient
                id={`linearGradient-${index}`}
                key={`gradient-${index}`}
                initial={{
                  x1: "0%",
                  x2: "0%",
                  y1: "100%",
                  y2: "100%",
                }}
                animate={{
                  x1: ["0%", "100%"],
                  x2: ["0%", "95%"],
                  y1: ["0%", "100%"],
                  y2: ["0%", `${93 + Math.random() * 8}%`],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 0,
                }}
              >
                <stop stopColor="#EF4444" stopOpacity="0"></stop>
                <stop stopColor="#EF4444"></stop>
                <stop offset="32.5%" stopColor="#B91C1C"></stop>
                <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0"></stop>
              </motion.linearGradient>
            ))}
            <radialGradient
              id="paint0_radial_242_278"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
            >
              <stop offset="0.0666667" stopColor="#171717"></stop>
              <stop offset="0.243243" stopColor="#171717"></stop>
              <stop offset="0.43594" stopColor="black" stopOpacity="0"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Updated form container with new styling */}
      <div className={classes["Auth-form-container"]}>
        <form
          className={`${classes["Auth-form"]} bg-neutral-900 bg-opacity-80 border border-red-800 rounded-lg shadow-lg`}
          onSubmit={formSubmitHandler}
        >
          <div className={classes["Auth-form-content"]}>
            <h3
              className={`${classes["Auth-form-title"]} text-red-500 text-center text-xl font-bold mb-4`}
            >
              {(pageType === LOGIN && "Sign In") ||
                (pageType === REGISTER && "Sign Up") ||
                (pageType === CHANGEPASSWORD && "Change Password")}
            </h3>

            {(pageType === LOGIN || pageType === REGISTER) && (
              <div className="text-center text-gray-300 mb-4">
                {(pageType === LOGIN && "Don't have an account? ") ||
                  (pageType === REGISTER && "Already have an account ")}

                <Link
                  to={
                    (pageType === LOGIN && "/register") ||
                    (pageType === REGISTER && "/login")
                  }
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  {(pageType === LOGIN && "Sign Up") ||
                    (pageType === REGISTER && "Sign In")}
                </Link>
              </div>
            )}

            {pageType === REGISTER && (
              <CustomInput
                id="name"
                type="text"
                label="Name"
                value={name}
                placeholder="Less than 10 characters"
                blurHandler={nameBlurHandler}
                changeHandler={nameChangeHandler}
                hasError={hasNameError}
                errorMsg={nameErrorMsg}
              />
            )}

            {pageType === LOGIN && (
              <CustomRadioInput
                id="login-mode"
                value={emailUnameSelection}
                onChange={(event) => setEUSelection(event.target.value)}
                label="Select the login method you wish to use"
                radioBtnList={[
                  { value: "username", label: "Username" },
                  { value: "email", label: "Email" },
                ]}
              />
            )}

            {(pageType === REGISTER ||
              pageType === CHANGEPASSWORD ||
              emailUnameSelection === "username") && (
              <CustomInput
                id="username"
                type="text"
                label="Username"
                value={username}
                placeholder="4 <= username < 10"
                blurHandler={usernameBlurHandler}
                changeHandler={usernameChangeHandler}
                hasError={hasUsernameError}
                errorMsg={usernameErrorMsg}
              />
            )}

            {(pageType === REGISTER ||
              pageType === CHANGEPASSWORD ||
              emailUnameSelection === "email") && (
              <CustomInput
                id="email"
                type="email"
                label="Email"
                value={email}
                placeholder="Enter valid Email"
                blurHandler={emailBlurHandler}
                changeHandler={emailChangeHandler}
                hasError={hasEmailError}
                errorMsg={emailErrorMsg}
              />
            )}

            {pageType === CHANGEPASSWORD && (
              <CustomPasswordInput
                emailUnameSelection={emailUnameSelection}
                pageType={pageType}
                errorMsg={oldPassErrorMsg}
                hasError={hasOldPassError}
                id="oldPassword"
                value={oldPassword}
                changeHandler={oldPassChangeHandler}
                blurHandler={oldPassBlurHandler}
                label="Old Password"
                placeholder="Minimum Length 6"
              />
            )}

            <CustomPasswordInput
              emailUnameSelection={emailUnameSelection}
              pageType={pageType}
              errorMsg={passErrorMsg}
              hasError={hasPassError}
              id="password"
              value={password}
              changeHandler={passChangeHandler}
              blurHandler={passBlurHandler}
              label={`${pageType === CHANGEPASSWORD ? "New " : ""}Password`}
              placeholder="Minimum Length 6"
            />

            {(pageType === REGISTER || pageType === CHANGEPASSWORD) && (
              <CustomPasswordInput
                emailUnameSelection={emailUnameSelection}
                pageType={pageType}
                errorMsg={passVerErrorMsg}
                hasError={hasPassVerError}
                id="passwordVerify"
                value={passwordVer}
                changeHandler={passVerChangeHandler}
                blurHandler={passVerBlurHandler}
                label="Re-Enter Password"
                placeholder={`Same as ${
                  pageType === CHANGEPASSWORD ? "New " : ""
                }Password`}
              />
            )}

            <div className="d-grid gap-2 mt-4 mb-3">
              <Button
                type="submit"
                color="error"
                variant="contained"
                disabled={!isFormValid || loginState.isLoading}
                style={{
                  textTransform: "capitalize",
                  letterSpacing: "0.15rem",
                  fontSize: "1rem",
                  backgroundColor: "#B91C1C",
                  borderRadius: "0.5rem",
                  color: "white",
                  fontweight: "bold",
                }}
                className="hover:bg-red-700 transition-colors"
              >
                {pageType}
                {loginState &&
                  (loginState.isLoading || loginState.loggedIn) && (
                    <div className="spin" />
                  )}
              </Button>
            </div>

            {loginState && loginState.error && (
              <div className={`${classes.errormsg} text-red-500 text-center`}>
                {loginState.error}
              </div>
            )}

            <div className="text-gray-400 text-xs mt-4 text-center">
              Email/Username must be valid/Unique and Password length must be
              greater than or equal to 6 to submit.
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const CustomPasswordInput = ({
  emailUnameSelection,
  pageType,
  errorMsg,
  hasError,
  id,
  value,
  changeHandler,
  label,
  placeholder,
  blurHandler,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setShowPassword(false);
  }, [pageType, emailUnameSelection]);

  return (
    <div className="form-group mt-3">
      <FormControl sx={{ width: "100%" }} variant="filled">
        <InputLabel
          htmlFor={id}
          sx={{
            color: "rgba(229, 231, 235, 0.7)",
            "&.Mui-focused": { color: "#EF4444" },
          }}
        >
          {label}
        </InputLabel>
        <FilledInput
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
          placeholder={placeholder}
          sx={{
            backgroundColor: hasError
              ? "rgba(220, 38, 38, 0.1)"
              : "rgba(55, 65, 81, 0.3)",
            color: "rgba(229, 231, 235, 0.9)",
            borderBottom: "1px solid rgba(239, 68, 68, 0.5)",
            "&:hover": {
              backgroundColor: hasError
                ? "rgba(220, 38, 38, 0.2)"
                : "rgba(55, 65, 81, 0.4)",
            },
            "&.Mui-focused": {
              backgroundColor: hasError
                ? "rgba(220, 38, 38, 0.2)"
                : "rgba(55, 65, 81, 0.4)",
            },
            "& .MuiFilledInput-input": {
              color: "rgba(229, 231, 235, 0.9)",
            },
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                sx={{ color: "rgba(239, 68, 68, 0.7)" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {hasError && (
        <div className={`${classes.validError} text-red-500 text-xs mt-1`}>
          {errorMsg}
        </div>
      )}
    </div>
  );
};

const CustomInput = ({
  errorMsg,
  hasError,
  id,
  value,
  type,
  changeHandler,
  label,
  placeholder,
  blurHandler,
}) => {
  return (
    <div className="form-group mt-3">
      <FormControl sx={{ width: "100%" }} variant="filled">
        <InputLabel
          htmlFor={id}
          sx={{
            color: "rgba(229, 231, 235, 0.7)",
            "&.Mui-focused": { color: "#EF4444" },
          }}
        >
          {label}
        </InputLabel>
        <FilledInput
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
          sx={{
            backgroundColor: hasError
              ? "rgba(220, 38, 38, 0.1)"
              : "rgba(55, 65, 81, 0.3)",
            color: "rgba(229, 231, 235, 0.9)",
            borderBottom: "1px solid rgba(239, 68, 68, 0.5)",
            "&:hover": {
              backgroundColor: hasError
                ? "rgba(220, 38, 38, 0.2)"
                : "rgba(55, 65, 81, 0.4)",
            },
            "&.Mui-focused": {
              backgroundColor: hasError
                ? "rgba(220, 38, 38, 0.2)"
                : "rgba(55, 65, 81, 0.4)",
            },
            "& .MuiFilledInput-input": {
              color: "rgba(229, 231, 235, 0.9)",
            },
          }}
        />
      </FormControl>
      {hasError && (
        <div className={`${classes.validError} text-red-500 text-xs mt-1`}>
          {errorMsg}
        </div>
      )}
    </div>
  );
};

const CustomRadioInput = ({ id, value, onChange, label, radioBtnList }) => {
  return (
    <FormControl
      sx={{
        borderTop: "1px solid rgba(239, 68, 68, 0.3)",
        borderBottom: "1px solid rgba(239, 68, 68, 0.3)",
        marginTop: "0.5rem",
        padding: "0.5rem 0.7rem",
        color: "rgba(229, 231, 235, 0.9)",
      }}
    >
      <FormLabel id={id} sx={{ color: "rgba(229, 231, 235, 0.7)" }}>
        {label}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby={id}
        name={id}
        value={value}
        onChange={onChange}
      >
        {radioBtnList.map((btn) => (
          <FormControlLabel
            key={btn.value}
            value={btn.value}
            control={
              <Radio
                sx={{
                  color: "rgba(239, 68, 68, 0.7)",
                  "&.Mui-checked": {
                    color: "#EF4444",
                  },
                }}
              />
            }
            label={btn.label}
            sx={{ color: "rgba(229, 231, 235, 0.9)" }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Customform;
