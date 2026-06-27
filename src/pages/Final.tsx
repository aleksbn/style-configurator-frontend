import React, { useEffect, useState } from "react";
import Cart from "./Final/Cart";
import CartItemDisplay from "./Final/CartItemDisplay";
import PriceBreakdownDisplay from "./Final/PriceBreakdownDisplay";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { IModel } from "../models/Model";
import type { ICartItem, IPrice } from "../models/Cart";
import { setConfiguration } from "../store/slices/configurationSlice";
import Footer from "../components/ui/Footer";
import { Button } from "../components/style/Buttons.style";
import { setCartToBeCleared } from "../store/slices/webSiteSlice";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import DownloadDialog from "./Final/DownloadDialog";
import { LogoMonochrome, PdfCover, LargeLogo } from "../helpers/imageImport";
import Api from "../Api/ApiHelper";
import ColorApi from "../Api/ColorApiHelper";
import {
  applyOptionsToSvg,
  loadFonts,
  svgToBase64Image,
} from "../helpers/pdfHelper";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  width: 100%;
  height: calc(100svh - 140px);
  padding: 35px;
`;

export default function Final() {
  const [selectedCartItem, setSelectedCartItem] = useState<ICartItem | null>(
    null,
  );
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [allPrices, setAllPrices] = useState<IPrice[]>([]);
  const [totalPrice, setTotalPrice] = useState<{
    totalPrice: number;
    note: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const cartRedux = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const allModels = Object.values(useAppSelector((state) => state.models.data))
    .map((model) => model.options)
    .map((options) => Object.values(options))
    .flat() as IModel[];

  const handleItemClick = (item: ICartItem | null) => {
    setIsFirstInteraction(false);
    setSelectedCartItem(item);
    dispatch(setConfiguration(item?.configKey));
  };

  const handleClearCartClick = () => {
    dispatch(setCartToBeCleared(true));
    navigate("/products");
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const totalPriceResponse = await Api.getCartPrices({
          cart: cartRedux.items,
        });
        const totalPriceData = totalPriceResponse.data;
        setTotalPrice(totalPriceData);
        const allPricesData: IPrice[] = [];
        for (let i = 0; i < cartRedux.items.length; i++) {
          const priceResponse = await Api.getSinglePrice(
            cartRedux.items[i].configKey,
          );
          allPricesData.push({
            Name:
              allModels.find(
                (model) =>
                  model.id === cartRedux.items[i].configKey.split(":")[0],
              )?.name ?? "",
            ConfigKey: cartRedux.items[i].configKey,
            Size: cartRedux.items[i].size,
            Quantity: cartRedux.items[i].quantity,
            PricePerItem: priceResponse["Total price"],
            TotalPrice:
              priceResponse["Total price"] * cartRedux.items[i].quantity,
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

  const getModelImageForPdf = async (
    model: IModel,
    configKey: string,
  ): Promise<string> => {
    const coloredSvg = await applyOptionsToSvg(model, configKey);
    return svgToBase64Image(coloredSvg);
  };

  const handleDownloadClick = async (
    fullName: string,
    phone: string,
    email: string,
    fullAddress: string,
  ) => {
    const content = await arrangeContentForPDF(
      fullName,
      phone,
      email,
      fullAddress,
    );
    // console.log(content);
    const { pdf } = await import("@react-pdf/renderer");
    const { default: PdfGenerator } = await import("./Final/PdfGenerator");
    await loadFonts();
    const pdfBlob = await pdf(
      <PdfGenerator
        footer={content.footer}
        frontCoverPage={content.frontCoverPage}
        priceBreakdownPage={content.priceBreakdownPage}
        orderDataPage={content.orderDataPage}
        backCoverPage={content.backCoverPage}
      />,
    ).toBlob();
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "style-dial-receipt.pdf";
    link.click();
  };

  const arrangeContentForPDF = async (
    fullName: string,
    phone: string,
    email: string,
    fullAddress: string,
  ) => {
    const fetchedContent = await Api.getPdfContent({
      cart: cartRedux.items,
    });
    const content = {
      frontCoverPage: {
        title: "Style speaks for itself!",
        image: PdfCover,
        description: "Created by you",
      },
      footer: {
        logo: LogoMonochrome,
      },
      priceBreakdownPage: {
        title: "Price list",
        items: {
          title: "List of all items",
          pieces: [...fetchedContent.data],
        },
        total: {
          title: "Total",
          price: totalPrice,
        },
      },
      orderDataPage: {
        title: "Order data",
        data: {
          name: fullName,
          phone: phone,
          email: email,
          address: fullAddress,
        },
      },
      backCoverPage: {
        title: "Thank you for your order!",
        image: LargeLogo,
      },
    };

    const items = await Promise.all(
      content.priceBreakdownPage.items.pieces.map(async (item, index) => {
        const model = allModels.find(
          (model) => model.id === item.configKey.split(":")[0],
        );
        if (model) {
          return {
            ...item,
            image: await getModelImageForPdf(model, item.configKey),
            pricePerItem: allPrices[index].PricePerItem,
            totalPrice: allPrices[index].TotalPrice,
            options: await Promise.all(
              item.options.map(async (option: { color: string }) => {
                if (option.color) {
                  return {
                    ...option,
                    colorDescription: (
                      await ColorApi.getColorName(option.color)
                    ).name.value,
                  };
                }
                return option;
              }),
            ),
          };
        }
      }),
    );

    return {
      ...content,
      priceBreakdownPage: {
        ...content.priceBreakdownPage,
        items: {
          ...content.priceBreakdownPage.items,
          pieces: items,
        },
      },
    };
  };

  return (
    <>
      <Container>
        <Cart
          selectItem={handleItemClick}
          cartRedux={cartRedux}
          allModels={allModels}
        />
        <CartItemDisplay
          selectItem={handleItemClick}
          selectedCartItem={selectedCartItem}
          allModels={allModels}
          isFirstInteraction={isFirstInteraction}
        />
        <PriceBreakdownDisplay
          allPrices={allPrices}
          totalPrice={totalPrice ?? { totalPrice: 0, note: "" }}
          loading={loading}
        />
      </Container>
      <Footer>
        <div></div>
        <Button type="secondary" onClick={handleClearCartClick}>
          Clear cart
        </Button>
        <Button
          type="secondary"
          className="right"
          onClick={() => setDownloadDialogOpen(true)}
        >
          Download PDF receipt
        </Button>
      </Footer>
      <AnimatePresence>
        {downloadDialogOpen && (
          <DownloadDialog
            onClose={() => setDownloadDialogOpen(false)}
            onClick={handleDownloadClick}
          />
        )}
      </AnimatePresence>
    </>
  );
}
