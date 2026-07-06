import { useEffect, useState } from "react";
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
import { RotateMessage } from "../components/style/Common.style";
import useBreakpoint from "../hooks/useBreakpoints";
import MobileCart from "./Final/MobileCart";
import MobilePriceBreakdownDisplay from "./Final/MobilePriceBreakdownDisplay";
import { FaChevronDown } from "react-icons/fa6";
import MobileMore from "./Final/MobileMore";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  width: 100%;
  height: calc(100svh - 140px);
  padding: 35px;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 2fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DisplayMobileCartButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  padding: 20px 12px 20px 0;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  border: 1px solid black;
  border-radius: 0 50px 50px 0;
  writing-mode: vertical-rl;
  text-orientation: upright;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 575px) {
    font-size: 1rem;
  }
`;

const MobileFooterFinal = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: none;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;

  @media (max-width: 575px) {
    display: flex;
  }
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
  const [smallerThan768px, setSmallerThan768px] = useState(
    window.innerWidth <= 768,
  );
  const [cartModalOpened, setCartModalOpened] = useState(false);
  const [priceModalOpened, setPriceModalOpened] = useState(false);
  const [moreModalOpened, setMoreModalOpened] = useState(false);
  const [creatingPdf, setCreatingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const breakpoint = useBreakpoint();
  const cartRedux = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const allModels = Object.values(useAppSelector((state) => state.models.data))
    .map((model) => model.options)
    .map((options) => Object.values(options))
    .flat() as IModel[];

  useEffect(() => {
    const handleResize = () => setSmallerThan768px(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    setCreatingPdf(true);
    setPdfError(null);
    try {
      const content = await arrangeContentForPDF(
        fullName,
        phone,
        email,
        fullAddress,
      );
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
    } catch (error) {
      console.error("Error generating PDF:", error);
      setPdfError("Error generating PDF. Please try again.");
    } finally {
      setCreatingPdf(false);
    }
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
    const pieces = [...fetchedContent.data];
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
      },
      orderDataPage: {
        title: "Order data",
        total: {
          title: "Total",
          price: totalPrice,
        },
        userData: {
          name: fullName,
          phone: phone,
          email: email,
          address: fullAddress,
        },
        companyData: {
          name: "Style Dial",
          phone: "123-456-7890",
          email: "style-dial@example.com",
          address: "123 Imaginary Street, Novi Sad, Serbia",
        },
      },
      backCoverPage: {
        title: "Thank you for your order!",
        image: LargeLogo,
      },
    };

    const items = await Promise.all(
      pieces.map(async (item, index) => {
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

    const chunkSize = 5;
    const itemSets = [];
    for (let i = 0; i < items.length; i += chunkSize) {
      const chunk = items.slice(i, i + chunkSize);
      const from = i + 1;
      const to = Math.min(i + chunkSize, items.length);
      itemSets.push({
        title: `List of items ${from}-${to}`,
        pieces: chunk,
      });
    }

    return {
      ...content,
      priceBreakdownPage: {
        ...content.priceBreakdownPage,
        itemSets,
      },
    };
  };

  return (
    <>
      <RotateMessage>Please rotate your device to portrait mode</RotateMessage>
      <Container>
        {!smallerThan768px && (
          <Cart
            selectItem={handleItemClick}
            cartRedux={cartRedux}
            allModels={allModels}
          />
        )}
        {smallerThan768px && (
          <DisplayMobileCartButton onClick={() => setCartModalOpened(true)}>
            Show cart
          </DisplayMobileCartButton>
        )}
        <AnimatePresence>
          {cartModalOpened && (
            <MobileCart
              selectItem={handleItemClick}
              cartRedux={cartRedux}
              allModels={allModels}
              onClose={() => setCartModalOpened(false)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {priceModalOpened && (
            <MobilePriceBreakdownDisplay
              allPrices={allPrices}
              totalPrice={totalPrice ?? { totalPrice: 0, note: "" }}
              loading={loading}
              onClose={() => setPriceModalOpened(false)}
            />
          )}
        </AnimatePresence>
        <CartItemDisplay
          selectItem={handleItemClick}
          selectedCartItem={selectedCartItem}
          allModels={allModels}
          isFirstInteraction={isFirstInteraction}
          smallerThan768px={smallerThan768px}
        />
        {breakpoint == "desktop" && (
          <PriceBreakdownDisplay
            allPrices={allPrices}
            totalPrice={totalPrice ?? { totalPrice: 0, note: "" }}
            loading={loading}
          />
        )}
      </Container>
      <Footer className="final-footer">
        {breakpoint == "desktop" && <div></div>}
        {breakpoint != "desktop" && (
          <Button
            type="secondary"
            style={{ justifySelf: "flex-start", marginLeft: "15px" }}
            onClick={() => setPriceModalOpened(true)}
          >
            Show prices
          </Button>
        )}
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
      <MobileFooterFinal onClick={() => setMoreModalOpened(true)}>
        <FaChevronDown />
        More
        <FaChevronDown />
      </MobileFooterFinal>
      <AnimatePresence>
        {downloadDialogOpen && (
          <DownloadDialog
            onClose={() => setDownloadDialogOpen(false)}
            onClick={handleDownloadClick}
            errorText={pdfError}
            creatingPdf={creatingPdf}
            buttonText={pdfError ? "Try again" : "Download PDF"}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {moreModalOpened && (
          <MobileMore
            onClose={() => setMoreModalOpened(false)}
            actions={[
              {
                label: "Show prices",
                onClick: () => {
                  setPriceModalOpened(true);
                  setMoreModalOpened(false);
                },
              },
              {
                label: "Clear cart",
                onClick: () => {
                  handleClearCartClick();
                  setMoreModalOpened(false);
                },
              },
              {
                label: "Download PDF receipt",
                onClick: () => {
                  setDownloadDialogOpen(true);
                  setMoreModalOpened(false);
                },
              },
            ]}
          />
        )}
      </AnimatePresence>
    </>
  );
}
