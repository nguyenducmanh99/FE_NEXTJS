import PropTypes from "prop-types";
// @mui
import { Box, Checkbox } from "@mui/material";
import Icon from "./Icon";
//

// ----------------------------------------------------------------------

export interface IColorMultiPicker {
  name: string;
  sx?: any;
  colors: string[];
  onChangeColor: CallableFunction;
  selected: string[] | [];
}

export default function ColorMultiPicker({
  name,
  colors,
  selected,
  onChangeColor,
  sx,
  ...other
}: IColorMultiPicker) {
  return (
    <Box sx={sx}>
      {colors.map((color: string) => {
        const whiteColor = color === "#FFFFFF" || color === "white";

        return (
          <Checkbox
            key={color}
            size="small"
            value={color}
            color="default"
            checked={false}
            onChange={() => onChangeColor(color)}
            icon={<Icon whiteColor={whiteColor} />}
            checkedIcon={<Icon checked whiteColor={whiteColor} />}
            sx={{
              color,
              "&:hover": { opacity: 0.72 },
              "& svg": { width: 12, height: 12 },
            }}
            {...other}
          />
        );
      })}
    </Box>
  );
}
