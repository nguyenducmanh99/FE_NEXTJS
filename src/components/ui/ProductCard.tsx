// @mui
import { Box, Card, Link, Typography, Stack, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";
// utils

// components

// ----------------------------------------------------------------------

const StyledProductImg = styled(Image)({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

interface IShopProductCard {
  product: any;
}

export default function ShopProductCard({ product }: IShopProductCard) {
  const { name, cover, price, colors, status, priceSale } = product;
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
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
        {loaded ? (
          <StyledProductImg
            alt={name}
            src={cover}
            fill={true}
            quality={80}
            priority={true}
            // onLoadingComplete={handle}
          />
        ) : (
          <Skeleton variant="rounded" width="100%" height="100%" />
        )}
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
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: "text.disabled",
                textDecoration: "line-through",
              }}
            >
              {priceSale && priceSale}
            </Typography>
            &nbsp;
            {price}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
