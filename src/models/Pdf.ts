/** A single configured option as returned by POST /pdf: either a color part (partName/color) or a variant type (name/value). */
interface IPdfOption {
  color?: string;
  partName?: string;
  name?: string;
  value?: string;
  extraPrice: number;
  colorDescription?: string;
}

/** Raw per-cart-item shape returned by POST /pdf, before client-side image/price enrichment. */
interface IPdfCartItem {
  configKey: string;
  model: string;
  size: string;
  quantity: number;
  options: IPdfOption[];
}

/** Cart item enriched client-side with a rendered preview image and computed prices. */
interface IPdfPriceBreakdownItem extends IPdfCartItem {
  image: string;
  pricePerItem: number;
  totalPrice: number;
}

interface IPdfPriceBreakdownItemSet {
  title: string;
  pieces: IPdfPriceBreakdownItem[];
}

interface IPdfFooter {
  logo: string;
}

interface IPdfFrontCoverPage {
  title: string;
  image: string;
  description: string;
}

interface IPdfPriceBreakdownPage {
  title: string;
  itemSets: IPdfPriceBreakdownItemSet[];
}

interface IPdfOrderDataPage {
  title: string;
  total: {
    title: string;
    price: { totalPrice: number; note: string };
  };
  userData: { name: string; phone: string; email: string; address: string };
  companyData: { name: string; phone: string; email: string; address: string };
}

interface IPdfBackCoverPage {
  title: string;
  image: string;
}

interface IPdfGeneratorProps {
  footer: IPdfFooter;
  frontCoverPage: IPdfFrontCoverPage;
  priceBreakdownPage: IPdfPriceBreakdownPage;
  orderDataPage: IPdfOrderDataPage;
  backCoverPage: IPdfBackCoverPage;
}

export type {
  IPdfOption,
  IPdfCartItem,
  IPdfPriceBreakdownItem,
  IPdfPriceBreakdownItemSet,
  IPdfFooter,
  IPdfFrontCoverPage,
  IPdfPriceBreakdownPage,
  IPdfOrderDataPage,
  IPdfBackCoverPage,
  IPdfGeneratorProps,
};
