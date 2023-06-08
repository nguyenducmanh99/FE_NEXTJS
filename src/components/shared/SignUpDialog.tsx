import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FormControl, Grid, InputAdornment, InputLabel } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
}

interface IFieldOption {
  key: string;
  label: string;
  type: string;
}

const fieldOption: IFieldOption[] = [
  {
    key: "fullName",
    label: "First Name",
    type: "text",
  },
  {
    key: "name",
    label: "Last Name",
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
    type: "text",
  },
  {
    key: "address",
    label: "Address",
    type: "text",
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
export default function SignUpDialogs(props: ISignUpDialogs) {
  const { open, onClose } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <SignUpDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"md"}
      >
        <SignUpDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create New User
        </SignUpDialogTitle>
        <DialogContent dividers>
          <Grid container rowSpacing={2} columnSpacing={2} sx={{ p: 5 }}>
            {fieldOption.map((el) => {
              const { key, label, type } = el;
              const isPassWord = key === "password";
              const typePassword = showPassword ? "text" : "password";
              if (type === "text") {
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
                      <BootstrapInput
                        defaultValue=""
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
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }
                      />
                    </FormControl>
                  </Grid>
                );
              }
              if (type === "date") {
                return <DatePicker key={key} />;
              }
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </SignUpDialog>
    </div>
  );
}
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
