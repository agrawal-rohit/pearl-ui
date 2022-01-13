import _ from "lodash";
import { Dimensions, FinalPearlTheme } from "../../theme/src/types";
import { getKeys } from "../../theme/utils/typeHelpers";

export const checkKeyAvailability = (
  key: string,
  object: object,
  objectVarName: string | undefined = undefined
) => {
  if (!object.hasOwnProperty(key)) {
    throw new Error(
      `Key '${key}' does not exist in ${objectVarName ? objectVarName : object}`
    );
  }
};

export const filterStyledProps = (props: any, omitList: any) => {
  const omittedProp = omitList.reduce((acc: any, prop: any) => {
    acc[prop] = true;
    return acc;
  }, {});

  return getKeys(props).reduce((acc: any, key: any) => {
    if (!omittedProp[key]) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
};

export const buildFinalStyleProps = (
  props: Record<string, any>,
  buildStyleProperties: any,
  { theme, dimensions }: { theme: FinalPearlTheme; dimensions: Dimensions }
) => {
  const coreVisualStyle = buildStyleProperties.buildStyle(props, {
    theme,
    dimensions,
  });

  const cleanStyleProps = filterStyledProps(
    props,
    buildStyleProperties.properties
  );

  cleanStyleProps.style = { ...coreVisualStyle, ...props.style };
  return cleanStyleProps;
};

export const composeMotiProps = (
  props: Record<string, any>,
  buildStyleProperties: any,
  { theme, dimensions }: { theme: FinalPearlTheme; dimensions: Dimensions }
) => {
  let motiStyleProps = buildFinalStyleProps(props, buildStyleProperties, {
    theme,
    dimensions,
  });
  motiStyleProps = { ...motiStyleProps, ...motiStyleProps.style };
  motiStyleProps = _.omit(motiStyleProps, ["style", "display", "shadowOffset"]);
  return motiStyleProps;
};
