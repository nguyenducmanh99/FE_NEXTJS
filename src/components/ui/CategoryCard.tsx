// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
} from "@mui/material";
import SvgColor from "../utils/SvgColor";
import Iconify from "../utils/iconify";
// ----------------------------------------------------------------------

const StyledCardMedia = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 40,
  height: 38,
  position: "absolute",
  left: theme.spacing(2.6),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

export default function CategoryCard({ post, index }: any) {
  const { cover, title, view, comment, share, author, createdAt } = post;

  const POST_INFO = [
    { number: comment, icon: "eva:message-circle-fill" },
    { number: view, icon: "eva:eye-fill" },
    { number: share, icon: "eva:share-fill" },
  ];

  return (
    <Grid item xs={12} sm={4} md={4}>
      <Card sx={{ position: "relative" }}>
        <StyledCardMedia>
          <SvgColor
            color="paper"
            src="https://cdn-icons-png.flaticon.com/512/147/147133.png"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: "absolute",
              color: "background.paper",
            }}
          />
          <StyledAvatar alt={author.name} src={author.avatarUrl} />

          <StyledCover alt={title} src={cover} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: "text.disabled", display: "block" }}
          >
            {createdAt}
          </Typography>

          <StyledTitle color="inherit" variant="subtitle2" underline="hover">
            {title}
          </StyledTitle>

          <StyledInfo>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  ml: index === 0 ? 0 : 1.5,
                }}
              >
                <Iconify
                  icon={info.icon}
                  sx={{ width: 16, height: 16, mr: 0.5 }}
                />
                <Typography variant="caption">{info.number}</Typography>
              </Box>
            ))}
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}
