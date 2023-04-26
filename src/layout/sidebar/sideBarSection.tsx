import PropTypes from "prop-types";
// @mui
import {
  Box,
  List,
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Icon,
} from "@mui/material";

// ----------------------------------------------------------------------
import { ISideBarConfig } from "./config";
export const StyledNavItem: any = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 60,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------
interface ISideBarSection {
  data: ISideBarConfig[];
}

export default function SideBarSection({
  data = [],
  ...other
}: ISideBarSection) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <SideBarItem key={item?.title || ""} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

SideBarItem.propTypes = {
  item: PropTypes.object,
};

interface ISideBarItem {
  item: ISideBarConfig;
}
function SideBarItem({ item }: ISideBarItem) {
  const { title, path, icon, info, id } = item;

  return (
    <StyledNavItem
      id={id}
      component={Link}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
        color: "#000",
      }}
    >
      <StyledNavItemIcon>
        <Icon component={icon}></Icon>
      </StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
