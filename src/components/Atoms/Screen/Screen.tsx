import React, { useState } from "react";
import Box, { BoxProps } from "../Box/Box";
import {
  SafeAreaView,
  StatusBar,
  Platform,
  RefreshControl,
} from "react-native";
import { useAtomicComponentConfig } from "../../../hooks/useAtomicComponentConfig";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "../../../hooks/useTheme";

export type ScreenProps = BoxProps &
  Omit<
    KeyboardAwareScrollViewProps,
    | "refresh"
    | "scrollEnabled"
    | "showsHorizontalScrollIndicator"
    | "showsVerticalScrollIndicator"
  > & {
    /** The size of the screen */
    size?: string;
    /** The variant of the screen */
    variant?: string;
    /** Whether the screen is scrollable */
    scrollable?: boolean;
    /** Whether to show the vertical scrollbar if the Screen is scrollable */
    showScrollBar?: boolean;
    /** Method to execute when a pull-to-refresh action is performed */
    onPullToRefresh?: Function;
    /** The colors (at least one) that will be used to draw the refresh indicator (Android only) */
    refreshIndicatorColors?: string[];
    /** Progress view top offset */
    refreshProgressBackgroundColor?: string;
    /** The background color of the refresh indicator */
    refreshProgressViewOffset?: number;
    /** Size of the refresh indicator (Android only) */
    refreshIndicatorSize?: "default" | "large";
    /** The color of the refresh indicator (iOS only) */
    refreshTintColor?: string;
    /** The title displayed under the refresh indicator (iOS only) */
    refreshTitle?: string;
    /** The color of the refresh indicator title (iOS only) */
    refreshTitleColor?: string;
  };

// TODO: Add Custom Pull-to-Refresh components and animations

/** A layout component that you can use to wrap all the views in your app. */
const Screen: React.FC<ScreenProps> = ({
  children,
  size,
  variant,
  ...rest
}) => {
  const { colorMode } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const props = useAtomicComponentConfig("Screen", rest, {
    size: size,
    variant: variant,
  });

  const onRefresh = React.useCallback(async () => {
    if (nativeProps.onPullToRefresh) {
      setRefreshing(true);
      const functionValue = nativeProps.onPullToRefresh();
      let isPromise = functionValue instanceof Promise;
      if (isPromise)
        Promise.resolve(functionValue).then(() => {
          setRefreshing(false);
        });
      else {
        setRefreshing(false);
      }
    }
  }, []);

  const { style, ...nativeProps } = props;

  return (
    <>
      <StatusBar
        backgroundColor={props.style.backgroundColor}
        barStyle={colorMode === "light" ? "dark-content" : "light-content"}
      />
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          backgroundColor: props.style.backgroundColor,
        }}
      >
        <KeyboardAwareScrollView
          {...nativeProps}
          enableOnAndroid
          bounces={true}
          extraHeight={100}
          scrollEnabled={nativeProps.scrollable}
          showsVerticalScrollIndicator={nativeProps.showScrollBar}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            nativeProps.onPullToRefresh ? (
              <RefreshControl
                colors={nativeProps.refreshIndicatorColors}
                progressBackgroundColor={
                  nativeProps.refreshProgressBackgroundColor
                }
                progressViewOffset={nativeProps.refreshProgressViewOffset}
                size={nativeProps.refreshIndicatorSize === "large" ? 0 : 1}
                tintColor={nativeProps.refreshTintColor}
                title={nativeProps.refreshTitle}
                titleColor={nativeProps.refreshTitleColor}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            ) : undefined
          }
        >
          <Box flex={1} flexDirection="column" style={props.style}>
            {children}
          </Box>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default Screen;
