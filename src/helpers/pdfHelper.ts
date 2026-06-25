import type { IModel, IMultiOptionType } from "../models/Model";

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

  const parts = configKey.split(":").slice(1);
  parts.forEach((part) => {
    const [code, color, selectedType] = part.split("-");
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

export { applyOptionsToSvg, svgToBase64Image };
