/* eslint-disable @next/next/no-img-element */
import { styled } from "@mui/material/styles";
const listImage: string[] = [
  "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FsVxYFDY%2Fproduct-cat-1.png&w=96&q=75",
  "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FxHFpQTV%2Fproduct-cat-2.png&w=96&q=75",
  "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FS0GjZdp%2Fproduct-cat-3.png&w=96&q=75",
  "https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2Fg3YK8H2%2Fproduct-cat-4.png&w=96&q=75",
  "	https://shofy-client.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FD9qfYWX%2Fproduct-cat-5.png&w=96&q=75",
];

export default function CategoryShow() {
  return (
    <div className="container mx-auto">
      <div
        className="row row-cols-xl-5 row-cols-lg-5 row-cols-md-4 p-8"
        style={{ display: "flex" }}
      >
        {listImage.map((el, index) => (
          <ColItem key={index}>
            <div className="tp-product-category-item text-center mb-10">
              <div className="category-thumb fix">
                <a className="cursor-pointer">
                  <img
                    alt="product-category"
                    loading="lazy"
                    width="76"
                    height="98"
                    decoding="async"
                    data-nimg="1"
                    src={el}
                    style={{ color: "transparent" }}
                    className="category-image"
                  />
                </a>
              </div>
              <div className="tp-product-category-content">
                <h3 className="tp-product-category-title">
                  <a className="cursor-pointer">Headphones</a>
                </h3>
                <p>3 Product</p>
              </div>
            </div>
          </ColItem>
        ))}
      </div>
    </div>
  );
}
const ColItem = styled("div")({
  width: "20%",
  flex: "0 0 auto",
  display: "flex",
  justifyContent: "center",
});
