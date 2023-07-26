// @mui
import {
  Box,
  Card,
  Typography,
  Stack,
  Chip,
  Rating,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { alpha } from "@mui/material/styles";
import { IProduct } from "@/constant";

// ----------------------------------------------------------------------
const styledImage: any = {
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
};

const StyledProductImg = styled("img")(styledImage);

// ----------------------------------------------------------------------

interface IShopProductCard {
  product: IProduct;
  onSelect: CallableFunction;
}

export default function ShopProductCard({ product, onSelect }: IShopProductCard) {
  const { name, cover, price, colors, status, priceSale } = product;
  const [loaded, setLoaded] = useState<boolean>(false);
  
  const renderActionList = () => {
    return (
      <div className="flex flex-col shadow-sm list-button-action" role="group">
        <button
          onClick={() => onSelect(product)}
          type="button"
          className="px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-sm rounded-r-sm hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <Icon icon="fluent:cart-24-regular" width="25"/>
        </button>
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <Icon icon="carbon:view" width="25" />
        </button>
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-sm rounded-l-sm hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <Icon icon="ion:call-outline" width="25" />
        </button>
      </div>
    );
  };

  return (
    <Card className={"product_card"}>
      <Box
        sx={{
          pt: "100%",
          position: "relative",
          cursor: "pointer",
        }}
        className="card_content"
      >
        {status && (
          <Chip
            label={status}
            color={(status === "sale" && "error") || "primary"}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          />
        )}
        <StyledProductImg
          alt={name}
          src={cover}
          sx={{
            "&:hover": {
              opacity: 0.6,
              transition: "0.3s",
            },
          }}
        />
        {renderActionList()}
      </Box>

      <Stack spacing={2} sx={{ p: 2 }} direction="column">
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "uppercase", color: "darkslategray" }}
        >
          {"Fashion shoes"}
        </Typography>
        <ProductName>{name}</ProductName>
        <Rating name={name} value={4} readOnly />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <ColorPreview colors={colors} sx={{ minWidth: "25px" }} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: "text.disabled",
                textDecoration: "line-through",
              }}
            >
              {priceSale && `${priceSale}.k`}
            </Typography>
            &nbsp;
            {`${price}.k`}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

const ProductName = styled("div")({
  marginTop: "2px !important",
  fontSize: "16px",
});

export function ColorPreview({
  colors,
  limit = 3,
  sx,
}: {
  colors: string[];
  limit?: number;
  sx?: any;
}) {
  const showColor = colors.slice(0, limit);
  const moreColor = colors.length - limit;

  return (
    <Stack
      component="div"
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      sx={sx}
    >
      {showColor.map((color, index) => (
        <Box
          key={color + index}
          sx={{
            ml: -0.75,
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: (theme) => `solid 2px ${theme.palette.background.paper}`,
            boxShadow: (theme) =>
              `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
            bgcolor: color,
          }}
        />
      ))}

      {colors.length > limit && (
        <Typography variant="subtitle2">{`+${moreColor}`}</Typography>
      )}
    </Stack>
  );
}
