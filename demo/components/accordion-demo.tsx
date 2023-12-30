import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  VStack,
  Box,
} from "../../src";
import DemoSection from "./demo-section";

const AccordionDemo = () => {
  return (
    <VStack spacing="6">
      <DemoSection label="Basic">
        <Accordion>
          <AccordionItem>
            <AccordionButton>
              <Text>Accordion Section 1</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>
                This is the content for the first section of the accordion. It
                can be replaced with any content you like.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Text>Accordion Section 2</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>
                This is the content for the second section of the accordion. It
                can be replaced with any content you like.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </DemoSection>

      <DemoSection label="With Multiple">
        <Accordion allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Text>Accordion Section 1</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>
                This is the content for the first section of the accordion. It
                can be replaced with any content you like.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Text>Accordion Section 2</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>
                This is the content for the second section of the accordion. It
                can be replaced with any content you like.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </DemoSection>

      <DemoSection label="With Toggle">
        <Accordion allowToggle allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Text>Accordion Section 1</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>
                This is the content for the first section of the accordion. It
                can be replaced with any content you like.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Text>Accordion Section 2</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>
                This is the content for the second section of the accordion. It
                can be replaced with any content you like.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </DemoSection>

      <DemoSection label="Disabled">
        <Accordion>
          <AccordionItem>
            <AccordionButton isDisabled>
              <Text>Accordion Section 1</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>
                This is the content for the first section of the accordion. It
                can be replaced with any content you like.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton isDisabled>
              <Text>Accordion Section 2</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>
                This is the content for the second section of the accordion. It
                can be replaced with any content you like.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </DemoSection>

      <DemoSection label="Reduced motion">
        <Accordion reduceMotion>
          <AccordionItem>
            <AccordionButton>
              <Text>Accordion Section 1</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>
                This is the content for the first section of the accordion. It
                can be replaced with any content you like.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Text>Accordion Section 2</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>
                This is the content for the second section of the accordion. It
                can be replaced with any content you like.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </DemoSection>

      <DemoSection label="Internal state access">
        <Accordion>
          <AccordionItem>
            <AccordionButton>
              <Text>Accordion Section 1</Text>
            </AccordionButton>
            <AccordionPanel>
              <Text>
                This is the content for the first section of the accordion. It
                can be replaced with any content you like.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            {(isExpanded) => (
              <>
                <AccordionButton
                  bgColor={isExpanded ? "neutral.200" : undefined}
                >
                  <Text>Accordion Section 2</Text>
                </AccordionButton>
                <AccordionPanel>
                  <Text>
                    This is the content for the second section of the accordion.
                    It can be replaced with any content you like.
                  </Text>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      </DemoSection>
    </VStack>
  );
};

export default AccordionDemo;
