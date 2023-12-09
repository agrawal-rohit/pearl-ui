import { useState } from "react";
import { Screen, Center, Text, Icon } from "../../src";

const ScreenDemo = () => {
  const [value, setValue] = useState("Before");

  return (
    <Screen
      p={0}
      onPullToRefresh={() => {
        return new Promise<void>((res) =>
          setTimeout(() => {
            if (value === "Before") setValue("After");
            else setValue("Before");
            res();
          }, 1000)
        );
      }}
    >
      <Center>
        <Text variant="h6">Pull me down to toggle value!</Text>
        <Icon mt="1" size="l" iconFamily="AntDesign" iconName="arrowdown" />
      </Center>

      <Center
        width="100%"
        height={150}
        marginTop="5"
        borderRadius="m"
        backgroundColor="primary.500"
      >
        <Text variant="p3" fontWeight="medium" color="white">
          {value}
        </Text>
      </Center>
    </Screen>
  );
};

export default ScreenDemo;
