import styled from "styled-components";
import type { IModel } from "../../models/Model";
import type { ICartItem } from "../../models/Cart";
import { getModelIdFromConfigKey } from "../../helpers/configKey";
import {
  InlineLabel,
  PriceBreakdownContainer,
} from "../../components/style/Common.style";
import { motion } from "framer-motion";
import { animated } from "../../animations/Motion";
import { SlideRight } from "../../animations/Slide";
import Spinner from "../../components/ui/Spinner";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 45px;
  border: 1px solid black;
  border-radius: 50px;
  width: 100%;
  height: calc(100svh - 240px);
  overflow-y: auto;
  gap: 16px;
  position: relative;

  &::-webkit-scrollbar {
    width: 0px;
  }

  @media (max-width: 1024px) {
    padding: 45px 20px;
  }
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
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
  onClose = () => {
    // noop
  },
  loading,
  isInModal = false,
}: {
  selectItem: (item: ICartItem) => void;
  cartRedux: { items: ICartItem[] };
  allModels: IModel[];
  onClose?: () => void;
  loading?: boolean;
  isInModal?: boolean;
}) {
  const animation = !isInModal
    ? animated(SlideRight(1, 0, 0.5, 0.5, true, 500))
    : {};

  if (loading) {
    return (
      <PriceBreakdownContainer>
        <Spinner />
      </PriceBreakdownContainer>
    );
  }

  return (
    <Container as={motion.div} {...animation}>
      {cartRedux.items.map((item) => {
        const selectedModel = allModels.find(
          (model) => model.id === getModelIdFromConfigKey(item.configKey),
        );
        return (
          Object.keys(item).length > 1 && (
            <CartItem
              key={item.configKey + item.size}
              onClick={() => {
                selectItem(item);
                onClose();
              }}
            >
              {
                <>
                  <InlineLabel>
                    {selectedModel?.name} - {item.size}
                  </InlineLabel>
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
