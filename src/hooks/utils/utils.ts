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
