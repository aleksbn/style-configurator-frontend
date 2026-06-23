import React from "react";
import styled from "styled-components";
import type { IModel } from "../../models/Model";
import type { ICartItem } from "../../models/Cart";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10%;
  border: 1px solid black;
  border-radius: 50px;
  width: 100%;
  height: calc(100svh - 240px);
  overflow-y: auto;
  gap: 16px;
  position: relative;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 1px;
  position: absolute;
  top: 3%;
  left: 50%;
  transform: translateX(-50%);
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const Name = styled.span`
  font-size: 1.2rem;
  margin-right: 10px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
`;

const Image = styled.img`
  height: 48px;
`;

export default function Cart({
  selectItem,
  cartRedux,
  allModels,
}: {
  selectItem: (item: ICartItem) => void;
  cartRedux: { items: ICartItem[] };
  allModels: IModel[];
}) {
  return (
    <Container>
      <Title>Selected items</Title>
      {cartRedux.items.map((item) => {
        const selectedModel = allModels.find(
          (model) => model.id === item.configKey.split(":")[0],
        );
        return (
          Object.keys(item).length > 1 && (
            <CartItem
              key={item.configKey + item.size}
              onClick={() => selectItem(item)}
            >
              {
                <>
                  <Name>
                    {selectedModel?.name} - {item.size}
                  </Name>
                  <ImageContainer>
                    <Image src={selectedModel?.sketch} />
                  </ImageContainer>
                </>
              }
            </CartItem>
          )
        );
      })}
    </Container>
  );
}
