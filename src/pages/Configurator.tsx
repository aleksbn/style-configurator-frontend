import React, { useState } from "react";
import { PageWrap } from "../components/style/Common.style";
import styled from "styled-components";
import Footer from "../components/ui/Footer";
import Model from "./Configurator/Model";
import type { IModel, IOption } from "../models/Model";
import Options from "./Configurator/Options";
import ConfigureOptions from "./Configurator/ConfigureOptions";
import { Button } from "../components/style/Buttons.style";

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
  height: calc(100svh - 140px);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
`;

const EmptyDiv = styled.div``;

export default function Configurator({
  model,
  update_color,
  update_parts,
  price,
}: {
  model: IModel | null;
  update_color: (partid: string, color: string) => void;
  update_parts: (partid: string, partvalue: string) => void;
  price: { [key: string]: number };
}) {
  const [selectedOption, setSelectedOption] = useState<IOption | null>(
    Object.values(model?.options ?? {})[0] ?? null,
  );
  return (
    <>
      <PageConfiguratorWrap>
        <Title>{model?.name}</Title>
        <PageConfigurator>
          <Options
            options={Object.values(model?.options ?? {})}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
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
            model={model}
            price={price}
          />
        </PageConfigurator>
      </PageConfiguratorWrap>
      <Footer>
        <EmptyDiv></EmptyDiv>
        <div style={{ overflow: "hidden" }}>
          <Button type="primary">Add to cart</Button>
        </div>
        <EmptyDiv></EmptyDiv>
      </Footer>
    </>
  );
}
