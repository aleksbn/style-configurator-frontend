import type { IModel } from "../models/Model";

/** One configured part within a config key, e.g. "shirtColor-ff0000-collarA" -> { code: "shirtColor", value: "ff0000", typeCode: "collarA" }. */
interface IConfigKeyPart {
  code: string;
  value: string;
  typeCode?: string;
}

interface IParsedConfigKey {
  modelId: string;
  parts: IConfigKeyPart[];
}

function parsePart(raw: string): IConfigKeyPart {
  const [code, value, typeCode] = raw.split("-");
  return typeCode === undefined ? { code, value } : { code, value, typeCode };
}

function stringifyPart(part: IConfigKeyPart): string {
  return `${part.code}-${part.value}${part.typeCode ? `-${part.typeCode}` : ""}`;
}

/** A config key looks like "modelId:code-value[-typeCode]:code-value[-typeCode]:...". */
function parseConfigKey(configKey: string): IParsedConfigKey {
  const [modelId, ...rawParts] = configKey.split(":");
  return { modelId, parts: rawParts.map(parsePart) };
}

function stringifyConfigKey(parsed: IParsedConfigKey): string {
  return [parsed.modelId, ...parsed.parts.map(stringifyPart)].join(":");
}

function getModelIdFromConfigKey(configKey: string): string {
  return configKey.split(":")[0];
}

/** Builds a config key from a model's currently selected options and colors. */
function buildConfigKey(model: IModel | null): string {
  if (!model) return "";
  const parts: IConfigKeyPart[] = Object.values(model.options).map(
    (option) => {
      const selectedMultiOption = option.multi_option_type?.find(
        (type) => type.value === option.selected_type,
      );
      const part: IConfigKeyPart = {
        code: option.code,
        value: option.value ?? option.default_value,
      };
      if (selectedMultiOption) part.typeCode = selectedMultiOption.code;
      return part;
    },
  );
  return stringifyConfigKey({ modelId: model.id, parts });
}

export type { IConfigKeyPart, IParsedConfigKey };
export {
  parseConfigKey,
  stringifyConfigKey,
  getModelIdFromConfigKey,
  buildConfigKey,
};
