// @mui
import { styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
import Iconify from "../utils/iconify";

// ----------------------------------------------------------------------

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

interface IAppWidgetSummary {
  title: string;
  total: number;
  color: string;
  sx?: any;
  icon: string | any;
  bgColor: string;
  iconColor: string;
}

export default function AppWidgetSummary({
  title,
  total,
  icon,
  color,
  bgColor,
  iconColor,
  sx,
  ...other
}: IAppWidgetSummary) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        color: color,
        backgroundColor: bgColor,
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: color,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, rgba(${iconColor}, 0) 0%, rgba(${iconColor}, 0.24) 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon>

      <Typography variant="h3">{total}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
