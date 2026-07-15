import type { IModel, IMultiOptionType } from "../models/Model";
import { parseConfigKey } from "./configKey";
import InterRegular from "../assets/fonts/Inter_Regular.ttf";
import InterBold from "../assets/fonts/Inter_Bold.ttf";
import InterMedium from "../assets/fonts/Inter_Medium.ttf";
import InterRegularItalic from "../assets/fonts/Inter_Regular_Italic.ttf";
import InterBoldItalic from "../assets/fonts/Inter_Bold_Italic.ttf";
import InterMediumItalic from "../assets/fonts/Inter_Medium_Italic.ttf";

const applyOptionsToSvg = async (
  model: IModel,
  configKey: string,
): Promise<string> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/svg?url=${encodeURIComponent(model.url)}`,
  );
  const svgText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const svg = doc.querySelector("svg")!;

  const { parts } = parseConfigKey(configKey);
  parts.forEach(({ code, value: color, typeCode: selectedType }) => {
    const option = Object.values(model.options).find((o) => o.code === code);
    if (option && color) {
      try {
        svg.querySelectorAll(`.${option.type_name}`).forEach((el) => {
          el.setAttribute("fill", `#${color}`);
        });
      } catch (error) {
        console.error(error);
      }
    }
    if (option && selectedType) {
      const allTypes = option.multi_option_type!;
      allTypes.forEach((type: IMultiOptionType) => {
        const typeCode = type.code;
        if (!typeCode) return;
        type.part_ids.forEach((partId) => {
          const element = svg.getElementById(partId);
          if (typeCode === selectedType) {
            element?.setAttribute("visibility", "visible");
          } else {
            element?.setAttribute("visibility", "hidden");
          }
        });
      });
    }
  });

  return new XMLSerializer().serializeToString(svg);
};

const svgToBase64Image = (svgString: string): Promise<string> => {
  return new Promise((resolve) => {
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, 512, 512);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    img.src = url;
  });
};

const loadFonts = async () => {
  const { Font } = await import("@react-pdf/renderer");
  Font.register({
    family: "Inter",
    fonts: [
      { src: InterRegular, fontWeight: 400, fontStyle: "normal" },
      { src: InterMedium, fontWeight: 500, fontStyle: "normal" },
      { src: InterBold, fontWeight: 700, fontStyle: "normal" },
      { src: InterRegularItalic, fontWeight: 400, fontStyle: "italic" },
      { src: InterMediumItalic, fontWeight: 500, fontStyle: "italic" },
      { src: InterBoldItalic, fontWeight: 700, fontStyle: "italic" },
    ],
  });
};

export { applyOptionsToSvg, svgToBase64Image, loadFonts };
