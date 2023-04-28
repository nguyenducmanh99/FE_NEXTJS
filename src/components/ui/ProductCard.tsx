// @mui
import { Box, Card, Link, Typography, Stack, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";
import { alpha } from "@mui/material/styles";

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
  product: any;
}

export default function ShopProductCard({ product }: IShopProductCard) {
  const { name, cover, price, colors, status, priceSale } = product;
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <Card className={"product_card"}>
      <Box
        sx={{
          pt: "100%",
          position: "relative",
          cursor: "pointer",
        }}
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
          // fill={true}
          // priority={true}
          sx={{
            // display: loaded ? "" : "none",
            "&:hover": {
              opacity: 0.6,
              transition: "0.3s",
            },
          }}
          // onLoadingComplete={() => setLoaded(true)}
        />
        {/* <Skeleton variant="rounded" sx={styledImage} /> */}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <ColorPreview colors={colors} />
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
      component="span"
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
