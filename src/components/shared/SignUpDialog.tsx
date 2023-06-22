import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { useUserSlice } from "@/store";

const SignUpDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function SignUpDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface ISignUpDialogs {
  open: boolean;
  onClose: CallableFunction;
  isEdit: boolean;
}

interface IFieldOption {
  key: string;
  label: string;
  type: string;
}

const fieldOption: IFieldOption[] = [
  {
    key: "fullName",
    label: "Full Name",
    type: "text",
  },
  {
    key: "name",
    label: "User Name",
    type: "text",
  },
  {
    key: "email",
    label: "Email",
    type: "text",
  },
  {
    key: "phone",
    label: "Phone",
    type: "text",
  },

  {
    key: "description",
    label: "Role",
    type: "select",
  },
  {
    key: "address",
    label: "Address",
    type: "select",
  },
  {
    key: "dateOfBirth",
    label: "Birthday",
    type: "date",
  },
  {
    key: "password",
    label: "Password",
    type: "text",
  },
];
const roleOptions = ["Admin", "Employee"];
const cityOptions = [
  "Hanoi",
  "HoChiMinh",
  "HaiPhong",
  "Danang",
  "Thanhhoa",
  "Phutho",
  "Thaibinh",
  "Namdinh",
  "Ninhbinh",
  "Nghean",
];

type FormData = {
  fullName: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  address: string;
  dateOfBirth: string | Date | Dayjs;
  password: string;
  avatarUrl: string;
};

export default function SignUpDialogs(props: ISignUpDialogs) {
  const { open, onClose, isEdit } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const { createUserRequest } = useUserSlice().actions;
  const {
    control,
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: "",
      name: "",
      email: "",
      phone: "",
      description: "Employee",
      address: "Hanoi",
      dateOfBirth: dayjs("2000-01-1"),
      password: "",
      avatarUrl: "",
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleClose = () => {
    onClose();
  };

  const renderInput = React.useCallback(
    (
      type: string,
      key: string,
      isPassWord: boolean,
      typePassword: "text" | "password",
      field: ControllerRenderProps<FormData, keyof FormData> | any,
    ) => {
      const isNumber = key == "phone";
      switch (type) {
        case "date":
          return (
            <DatePickerSelect
              id={key}
              key={key}
              {...field}
              onChange={(date: any) =>
                field.onChange(dayjs(date).format("YYYY-MM-DD"))
              }
              selected={field.value}
            />
          );
        case "select":
          const optionRender = key === "address" ? cityOptions : roleOptions;
          return (
            <SelectField
              disablePortal
              {...field}
              onChange={(event: any, newValue: string | null) => {
                setValue(field.name, newValue);
              }}
              getOptionLabel={(option) => option || ""}
              id={`controllable-states-${key}`}
              options={optionRender}
              renderInput={(params) => <TextField {...params} />}
            />
          );
        default:
          return (
            <BootstrapInput
              {...field}
              {...register(field.name, {
                required: true,
                onChange: (event) => {
                  const value: string = event.target.value;
                  if (isNumber) {
                    const phoneNumberOnly = value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1");
                    setValue("phone", phoneNumberOnly);
                  }
                },
              })}
              id={key}
              fullWidth={true}
              type={isPassWord ? typePassword : "text"}
              endAdornment={
                isPassWord && (
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
                )
              }
            />
          );
      }
    },
    [register, setValue, showPassword],
  );

  const onSubmit = React.useCallback(
    (data: FormData) => {
      const { dateOfBirth } = data;
      data.dateOfBirth = dayjs(dateOfBirth).format("YYYY-MM-DD");
      data.avatarUrl =
        "https://freeiconshop.com/wp-content/uploads/edd/person-outline-filled.png";
      dispatch(createUserRequest(data));
    },
    [createUserRequest, dispatch],
  );

  return (
    <SignUpDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={"md"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <SignUpDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {isEdit ? "Edit User" : "Create New User"}
        </SignUpDialogTitle>
        <DialogContent dividers>
          <Grid container rowSpacing={2} columnSpacing={2} sx={{ p: 5 }}>
            {fieldOption.map((el) => {
              const { key, label, type } = el;
              const isPassWord = key === "password";
              const typePassword = showPassword ? "text" : "password";

              return (
                <Grid
                  item
                  key={key}
                  xs={6}
                  md={6}
                  sm={6}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <FormControl variant="standard" sx={{ width: "95%" }}>
                    <InputLabel shrink htmlFor="bootstrap-input">
                      {label}
                    </InputLabel>
                    <Controller
                      name={key as keyof FormData}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) =>
                        renderInput(type, key, isPassWord, typePassword, {
                          ...field,
                        })
                      }
                    />
                  </FormControl>
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            onClick={handleClose}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button type="submit" variant="outlined">
            Save changes
          </Button>
        </DialogActions>
      </form>
    </SignUpDialog>
  );
}
const DatePickerSelect = styled(DatePicker)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "45px",
    marginTop: "24px",
  },
  input: {
    "&::placeholder": {
      fontSize: "16px",
    },
  },
}));

const SelectField = styled(Autocomplete)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "45px",
    marginTop: "24px",
  },
  input: {
    padding: "1.5px 4px 7.5px 5px !important",
  },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputAdornment-root": {
    position: "absolute",
    right: "12px",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#fff",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
