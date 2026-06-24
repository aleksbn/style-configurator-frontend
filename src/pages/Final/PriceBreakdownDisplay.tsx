import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import type { ICartItem, IPrice } from "../../models/Cart";
import Api from "../../Api/ApiHelper";
import type { IModel } from "../../models/Model";
import DataLoadingSpinner from "../../components/ui/DataLoadingSpinner";

const PriceBreakdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 20px;
  margin: 40px 0px;
  height: calc(100svh - 240px);
  overflow-y: auto;
`;

const PriceListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const Part = styled.div`
  text-transform: uppercase;
  padding-bottom: 14px;
  letter-spacing: 0.1em;

  > span {
    font-style: italic;
    text-transform: lowercase;
  }

  &.total {
    font-weight: 700;
  }
`;

const PriceInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  width: 100%;
  padding-bottom: 8px;

  &.total {
    font-weight: 700;
  }
`;

const Underline = styled.div`
  width: 100%;
  height: 3px;
  background-color: rgba(0, 0, 0, 0.2);
  margin-bottom: 24px;
  flex-shrink: 0;

  &:last-child {
    margin-bottom: 8px;
  }
`;

const PriceLabel = styled.span``;

const Price = styled.span``;

const Note = styled.span`
  font-size: 0.8rem;
  font-style: italic;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default function PriceBreakdownDisplay({
  cartRedux,
  allModels,
}: {
  cartRedux: ICartItem[];
  allModels: IModel[];
}) {
  const [allPrices, setAllPrices] = useState<IPrice[]>([]);
  const [totalPrice, setTotalPrice] = useState<{
    totalPrice: number;
    note: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const totalPriceResponse = await Api.getCartPrices({ cart: cartRedux });
        const totalPriceData = totalPriceResponse.data;
        setTotalPrice(totalPriceData);
        const allPricesData: IPrice[] = [];
        for (let i = 0; i < cartRedux.length; i++) {
          const priceResponse = await Api.getSinglePrice(
            cartRedux[i].configKey,
          );
          allPricesData.push({
            Name:
              allModels.find(
                (model) => model.id === cartRedux[i].configKey.split(":")[0],
              )?.name ?? "",
            Size: cartRedux[i].size,
            Quantity: cartRedux[i].quantity,
            PricePerItem: priceResponse["Total price"],
            TotalPrice: priceResponse["Total price"] * cartRedux[i].quantity,
          });
        }
        setAllPrices(allPricesData);
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [cartRedux]);

  if (loading) {
    return (
      <PriceBreakdownContainer>
        <DataLoadingSpinner />
      </PriceBreakdownContainer>
    );
  }

  return (
    <PriceBreakdownContainer>
      <PriceListContainer>
        {allPrices.map((price) => (
          <Fragment key={price.Name + price.Size + price.Quantity}>
            <Part>
              {price.Name + " - " + price.Size} <span>x {price.Quantity}</span>
            </Part>
            <PriceInfoContainer>
              <PriceLabel>Price per item:</PriceLabel>
              <Price>${price.PricePerItem.toFixed(2)}</Price>
            </PriceInfoContainer>
            <PriceInfoContainer>
              <PriceLabel>Total:</PriceLabel>
              <Price>${price.TotalPrice.toFixed(2)}</Price>
            </PriceInfoContainer>
            <Underline />
          </Fragment>
        ))}
        <Part className="total">{`Total (${allPrices.reduce((acc, curr) => acc + curr.Quantity, 0)} item${allPrices.reduce((acc, curr) => acc + curr.Quantity, 0) > 1 ? "s" : ""})`}</Part>
        <PriceInfoContainer className="total">
          <PriceLabel>Full price (with discount):</PriceLabel>
          <Price>${totalPrice?.totalPrice.toFixed(2)}</Price>
        </PriceInfoContainer>
        <Note>{totalPrice?.note}</Note>
        <Underline />
      </PriceListContainer>
    </PriceBreakdownContainer>
  );
}
