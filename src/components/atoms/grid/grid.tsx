import React from "react";
import Box, { BoxProps } from "../box/box";
import {
  FinalPearlTheme,
  ResponsiveValue,
  spacingStyleFunction,
} from "../../../theme";
import { useStyleProps } from "../../../hooks";

export type GridProps = BoxProps & {
  /**
   * Number of columns in the grid.
   *
   * @default 1
   */
  numCols?: number;
  /**
   * The spacing between the grid elements.
   *
   * @default 3
   */
  spacing?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
  /** The column spacing between the grid elements. */
  spacingX?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
  /** The row spacing between the grid elements. */
  spacingY?: ResponsiveValue<keyof FinalPearlTheme["spacing"]>;
};

/**
 * Grid is a layout component that arranges its children into rows and columns.
 * Each child is given an equal amount of space.
 */
const Grid = React.memo(
  React.forwardRef(
    (
      {
        children,
        numCols = 1,
        spacing = "3",
        spacingX,
        spacingY,
        ...props
      }: GridProps,
      ref: any
    ) => {
      const computedSpacingStyle = useStyleProps(
        {
          paddingHorizontal: spacingX ?? spacing,
          paddingVertical: spacingY ?? spacing,
        },
        spacingStyleFunction
      );

      const renderRows = () => {
        const rows: React.ReactElement[][] = [];

        React.Children.forEach(children, (child, index) => {
          const rowIndex = Math.floor(index / numCols);
          if (!rows[rowIndex]) {
            rows[rowIndex] = [];
          }
          rows[rowIndex].push(
            <Box
              key={index}
              width={`${100 / numCols}%`}
              style={{
                paddingLeft:
                  index % numCols !== 0
                    ? computedSpacingStyle.style.paddingHorizontal / 2
                    : 0,
                paddingRight:
                  index % numCols !== numCols - 1
                    ? computedSpacingStyle.style.paddingHorizontal / 2
                    : 0,
                paddingTop:
                  rowIndex !== 0
                    ? computedSpacingStyle.style.paddingVertical / 2
                    : 0,
                paddingBottom: computedSpacingStyle.style.paddingVertical / 2,
              }}
            >
              {child}
            </Box>
          );
        });

        return rows.map((row, index) => (
          <Box key={index} flexDirection="row">
            {row}
          </Box>
        ));
      };

      return (
        <Box {...props} ref={ref}>
          {renderRows()}
        </Box>
      );
    }
  )
);

Grid.displayName = "Grid";

export default Grid;
