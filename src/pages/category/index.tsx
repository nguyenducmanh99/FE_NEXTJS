import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Button, Container, Stack, Typography } from "@mui/material";
// components

import CategoryCard from "@/components/ui/CategoryCard";
import Iconify from "@/components/utils/iconify";
import FullLayout from "@/layout/FullLayout";
import { ReactElement } from "react";

// ----------------------------------------------------------------------

export default function Category() {
  return (
    <>
      <Helmet>
        <title> Category </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Post
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {CATEGORY.map((post, index) => (
            <CategoryCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
Category.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};

const CATEGORY = [
  {
    id: 1,
    cover: `/images/cover_1.jpg`,
    title: "Whiteboard Templates By Industry Leaders",
    createdAt: "28/04/2023",
    view: 1000,
    comment: 20,
    share: 10,
    favorite: 234,
    author: {
      name: "Duc Manh",
      avatarUrl: `https://cdn-icons-png.flaticon.com/512/147/147133.png`,
    },
  },
  {
    id: 2,
    cover: `/images/cover_2.jpg`,
    title:
      "Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!",
    createdAt: "28/04/2023",
    view: 1000,
    comment: 20,
    share: 10,
    favorite: 234,
    author: {
      name: "Duc Manh",
      avatarUrl: `https://cdn-icons-png.flaticon.com/512/147/147133.png`,
    },
  },
  {
    id: 3,
    cover: `/images/cover_3.jpg`,
    title: "Designify Agency Landing Page Design",
    createdAt: "28/04/2023",
    view: 1000,
    comment: 20,
    share: 10,
    favorite: 234,
    author: {
      name: "Duc Manh",
      avatarUrl: `https://cdn-icons-png.flaticon.com/512/147/147133.png`,
    },
  },
  {
    id: 4,
    cover: `/images/cover_4.jpg`,
    title: "✨What is Done is Done ✨",
    createdAt: "28/04/2023",
    view: 1000,
    comment: 20,
    share: 10,
    favorite: 234,
    author: {
      name: "Duc Manh",
      avatarUrl: `https://cdn-icons-png.flaticon.com/512/147/147133.png`,
    },
  },
] as const;
