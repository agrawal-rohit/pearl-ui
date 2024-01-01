import React from "react";
import { render } from "@testing-library/react-native";
import List, { OrderedList, UnorderedList } from "./list";
import { ThemeProvider } from "../../../theme/src/theme-context";
import Text from "../text/text";

jest.useFakeTimers();

describe("Atoms/List", () => {
  it("passes the snapshot test for List", () => {
    const tree = render(
      <ThemeProvider>
        <List>
          <Text>Test Item 1</Text>
          <Text>Test Item 2</Text>
          <Text>Test Item 3</Text>
        </List>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for OrderedList", () => {
    const tree = render(
      <ThemeProvider>
        <OrderedList>
          <Text>Test Item 1</Text>
          <Text>Test Item 2</Text>
          <Text>Test Item 3</Text>
        </OrderedList>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("passes the snapshot test for UnorderedList", () => {
    const tree = render(
      <ThemeProvider>
        <UnorderedList>
          <Text>Test Item 1</Text>
          <Text>Test Item 2</Text>
          <Text>Test Item 3</Text>
        </UnorderedList>
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
