//carousels/Responsive.js
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { styled } from "@mui/material/styles";

const listImage: string[] = [
  "https://i.ytimg.com/vi/s230oraI7sg/maxresdefault.jpg",
  "https://i.pinimg.com/originals/8e/f7/26/8ef726ffe903afa19aa545e23f3b9c72.png",
  "https://i.ytimg.com/vi/Vf8DeNkJztU/maxresdefault.jpg",
  "https://i0.wp.com/store.ave.com.bn/wp-content/uploads/2022/03/iPad_Air_Web_Banner_Avail_1400x700__SEA_FFH.png?fit=1400%2C700&ssl=1",
];

export default function SlideShow() {
  return (
    <section className="relative" style={{ maxHeight: "65vh" }}>
      <div className="w-full">
        <Carousel
          showArrows={true}
          showIndicators={true}
          infiniteLoop={true}
          dynamicHeight={false}
          className="carousel-root"
        >
          {listImage.map((item, index) => (
            <ImageShow
              className="banner-slide-show"
              key={index}
              srcImage={item}
            ></ImageShow>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
const ImageShow = styled("div")(({ srcImage }: { srcImage: string }) => ({
  backgroundImage: `url(${srcImage})`,
  backgroundSize: "auto",
  backgroundPosition: "center",
  height: "65vh",
}));
