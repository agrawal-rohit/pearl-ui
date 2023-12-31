import { VStack, Alert } from "../../src";
import DemoSection from "./demo-section";

const AlertDemo = () => {
  return (
    <VStack spacing="6">
      <DemoSection label="Alert Variants">
        <Alert
          variant="success"
          title="Operation Successful"
          description="Your changes have been successfully saved."
        />

        <Alert
          variant="info"
          title="Note"
          description="Your password will expire in 3 days."
        />

        <Alert
          variant="warning"
          title="Caution"
          description="Your account will be locked after 5 more unsuccessful attempts."
        />

        <Alert
          variant="danger"
          title="Uh oh!"
          description="Unable to connect to the server. Please check your internet connection."
        />
      </DemoSection>

      <DemoSection label="With Close Button">
        <Alert
          withCloseButton
          title="Operation Successful"
          description="Your changes have been successfully saved."
        />
      </DemoSection>

      <DemoSection label="Alert Composition">
        <Alert
          py={4}
          spacing="3"
          direction="vertical"
          atoms={{
            stack: {
              alignItems: "center",
              justifyContent: "center",
            },
            description: {
              textAlign: "center",
            },
          }}
          title="Operation Successful"
          description="Your changes have been successfully saved."
        />
      </DemoSection>
    </VStack>
  );
};

export default AlertDemo;
