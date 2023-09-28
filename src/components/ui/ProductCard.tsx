// @mui
import { Box, Card, Typography, Stack, Chip, Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { useCallback, useState } from "react";
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

export default function ShopProductCard({
  product,
  onSelect,
}: IShopProductCard) {
  const { name, cover, price, colors, status, priceSale, id } = product;
  const [loaded, setLoaded] = useState<boolean>(false);

  const renderActionList = () => {
    return (
      <div
        className="flex flex-col shadow-sm list-button-action"
        role="group"
        id={`list-button-action${id}`}
      >
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-sm rounded-r-sm hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <Icon icon="fluent:cart-24-regular" width="25" />
        </button>
        <button
          onClick={() => onSelect(product)}
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
        id={`card_content${id}`}
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
  height: "48px"
});

export function ColorPreview({
  colors,
  limit = 3,
  edit = false,
  sx,
  onSelect
}: {
  colors: string[];
  limit?: number;
  sx?: any;
  edit?: boolean;
  onSelect?: CallableFunction;
}) {
  const showColor = colors.slice(0, limit);
  const moreColor = colors.length - limit;
  const [selected, setSelected] = useState<number>(0);
  
  const handleSelect = useCallback((index: number) => {
    setSelected(index);
    onSelect && onSelect(index);
  }, [onSelect])

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
          onClick={() => handleSelect(index) }
          sx={{
            ml: edit ? 2 : -0.75,
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: (theme) => `solid 2px ${theme.palette.background.paper}`,
            boxShadow: (theme) =>
              `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
            bgcolor: color,
            position: "relative",
            cursor: "pointer"
          }}
          
        >
          {edit && selected === index && (
            <div
              role="status"
              style={{left: "40%"}}
              className="absolute top-1/2 transform -translate-x-1/3 -translate-y-1/2"
            >
              <svg
                aria-hidden="true"
                className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </Box>
      ))}

      {colors.length > limit && (
        <Typography variant="subtitle2">{`+${moreColor}`}</Typography>
      )}
    </Stack>
  );
}
