import React from "react";
import { render } from "@testing-library/react-native";
import Accordion, {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "./accordion";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Text from "../../atoms/text/text";

jest.useFakeTimers();

describe("Molecules/Accordion", () => {
  it("passes the snapshot test with default props", () => {
    const tree = render(
      <ThemeProvider>
        <Accordion>
          <AccordionItem>
            <AccordionButton>
              <Text>Test</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>Test</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test with multiple items", () => {
    const tree = render(
      <ThemeProvider>
        <Accordion>
          <AccordionItem>
            <AccordionButton>
              <Text>Test</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>Test</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Text>Test</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>Test</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test with allowMultiple prop", () => {
    const tree = render(
      <ThemeProvider>
        <Accordion allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Text>Test</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>Test</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Text>Test</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>Test</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test with allowToggle prop", () => {
    const tree = render(
      <ThemeProvider>
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Text>Test</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>Test</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
