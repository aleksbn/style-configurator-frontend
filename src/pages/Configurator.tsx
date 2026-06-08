import React, { useState } from "react";
import { PageWrap } from "../components/style/Common.style";
import styled from "styled-components";
import Footer from "../components/ui/Footer";
import Model from "./Configurator/Model";
import type { IModel, IOption } from "../models/Model";
import Options from "./Configurator/Options";
import ConfigureOptions from "./Configurator/ConfigureOptions";

const PageConfiguratorWrap = styled(PageWrap)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100svh - 140px);
  margin-top: 70px;
`;

const PageConfigurator = styled.div`
  grid-template-columns: 3fr 5fr 3fr;
  display: grid;
  width: 100%;
  height: calc(100svh - 240px);
`;

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  height: 100px;
`;

export default function Configurator({
  model,
  title,
  update_color,
  update_parts,
}: {
  model: IModel | null;
  title: string;
  update_color: (partid: string, color: string) => void;
  update_parts: (partid: string, partvalue: string) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<IOption | null>(
    Object.values(model?.options ?? {})[0] ?? null,
  );
  return (
    <>
      <PageConfiguratorWrap>
        <StyledTitle>{title}</StyledTitle>
        <PageConfigurator>
          <Options
            options={Object.values(model?.options ?? {})}
            setSelectedOption={setSelectedOption}
          />
          <Model model={model} />
          <ConfigureOptions
            selectedOption={
              selectedOption
                ? (model?.options[selectedOption.type_name] ?? null)
                : null
            }
            update_color={update_color}
            update_parts={update_parts}
          />
        </PageConfigurator>
      </PageConfiguratorWrap>
      <Footer>
        <div></div>
        <div>Add to cart</div>
        <div></div>
      </Footer>
    </>
  );
}
