import Header from "@/components/ui/header";
import styled from "styled-components";
import "tailwindcss/tailwind.css";


Cart.displayName = "Cart";
export default function Cart() {
  return (
    <>
      <Container className="grow">
        <Header />
      </Container>

    </>
  );
}

const Container = styled.div``;
