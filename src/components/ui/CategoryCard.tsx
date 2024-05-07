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
import { ICategory } from "@/store/category-slice/types";
// ----------------------------------------------------------------------
import dayjs from "dayjs";

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
  fontWeight: "bold",
  fontSize: "20px",
});

const StyledDescription = styled(Link)({
  height: 30,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  fontSize: "15px",
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
function generateRandomNumber50To90() {
  const randomNumber = Math.floor(Math.random() * (90 - 50 + 1)) + 50; // Tạo số nguyên ngẫu nhiên từ 50 đến 90
  return randomNumber;
}

function generateRandomNumbers1000To2000() {
  const numbers = [];
  for (let i = 0; i < 1; i++) {
    const randomNumber = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000; // Tạo số nguyên ngẫu nhiên từ 1000 đến 2000
    numbers.push(randomNumber);
  }
  return numbers;
}

export default function CategoryCard({
  category,
  index,
}: {
  category: ICategory | any;
  index: number;
}) {
  const {
    bannerUrl,
    title,
    view = generateRandomNumbers1000To2000(),
    comment = generateRandomNumber50To90(),
    share = generateRandomNumber50To90(),
    author,
    createAt,
    description,
  } = category;

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

          <StyledCover alt={title} src={bannerUrl} />
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
            {createAt && dayjs(createAt).format('YYYY-MM-DD HH:mm:ss')}
          </Typography>

          <StyledTitle color="inherit" variant="subtitle2" underline="hover">
            {title}
          </StyledTitle>

          <StyledDescription
            color="inherit"
            variant="subtitle2"
            underline="hover"
          >
            {description}
          </StyledDescription>
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
