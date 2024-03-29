import React, { useState } from "react";
import { BoxProps } from "../box/box";
import { StatusBar, RefreshControl, RefreshControlProps } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";
import { pearl } from "../../../pearl";
import { AtomComponentProps } from "../../../theme/src/types";
import { SafeAreaView, View as MotiView } from "moti";
import { MOTI_PROPS } from "../../../hooks/utils/utils";
import { useTheme } from "../../../hooks/useTheme";
import _ from "lodash";

export type BaseScreenProps = Omit<
  BoxProps,
  keyof KeyboardAwareScrollViewProps
> &
  Omit<
    KeyboardAwareScrollViewProps,
    | "refresh"
    | "scrollEnabled"
    | "showsHorizontalScrollIndicator"
    | "showsVerticalScrollIndicator"
  > & {
    /**
     * Whether the screen is scrollable
     *
     * @default true
     */
    scrollable?: boolean;
    /**
     * Whether to show the vertical scrollbar if the Screen is scrollable
     *
     * @default false
     */
    showScrollBar?: boolean;
    /** Method to execute when a pull-to-refresh action is performed. Note: `scrollable` should be set as `true` to support pull-to-refresh. */
    onPullToRefresh?: Function;
    /** The colors (at least one) that will be used to draw the refresh indicator (Android only) */
    refreshIndicatorColors?: string[];
    /** Progress view top offset */
    refreshProgressBackgroundColor?: string;
    /** The background color of the refresh indicator */
    refreshProgressViewOffset?: number;
    /** Size of the refresh indicator (Android only) */
    refreshIndicatorSize?: RefreshControlProps["size"];
    /** The color of the refresh indicator (iOS only) */
    refreshTintColor?: string;
    /** The title displayed under the refresh indicator (iOS only) */
    refreshTitle?: string;
    /** The color of the refresh indicator title (iOS only) */
    refreshTitleColor?: string;
  };

// TODO: Add Custom Pull-to-Refresh components and animations
/**
 * CustomScreen is a functional component that returns a SafeAreaView component with specific styles based on the props.
 * It uses the forwardRef function from React to pass the ref to the KeyboardAwareScrollView component.
 * @param children The children to render inside the KeyboardAwareScrollView
 * @param size The size of the Screen component
 * @param variant The variant of the Screen component
 * @param scrollable Whether the screen is scrollable
 * @param showScrollBar Whether to show the vertical scrollbar if the Screen is scrollable
 * @param onPullToRefresh Method to execute when a pull-to-refresh action is performed
 * @param refreshIndicatorColors The colors (at least one) that will be used to draw the refresh indicator (Android only)
 * @param refreshProgressBackgroundColor Progress view top offset
 * @param refreshProgressViewOffset The background color of the refresh indicator
 * @param refreshIndicatorSize Size of the refresh indicator (Android only)
 * @param refreshTintColor The color of the refresh indicator (iOS only)
 * @param refreshTitle The title displayed under the refresh indicator (iOS only)
 * @param refreshTitleColor The color of the refresh indicator title (iOS only)
 * @returns A SafeAreaView component with a KeyboardAwareScrollView component inside
 */
const CustomScreen = React.memo(
  React.forwardRef(
    (
      {
        children,
        size,
        variant,
        scrollable,
        showScrollBar,
        onPullToRefresh,
        refreshIndicatorColors,
        refreshProgressBackgroundColor,
        refreshProgressViewOffset,
        refreshIndicatorSize,
        refreshTintColor,
        refreshTitle,
        refreshTitleColor,
        ...props
      }: AtomComponentProps<"Screen", BaseScreenProps>,
      ref: any
    ) => {
      const { colorMode } = useTheme();
      const [refreshing, setRefreshing] = useState(false);
      const animationProps = _.pick(props, MOTI_PROPS);
      const nativeProps = _.omit(props, [...MOTI_PROPS, "style"]);

      /**
       * Function to execute when a pull-to-refresh action is performed
       */
      const onRefresh = React.useCallback(async () => {
        if (onPullToRefresh) {
          setRefreshing(true);
          try {
            await onPullToRefresh();
          } catch (error) {
            console.error(error);
          } finally {
            setRefreshing(false);
          }
        }
      }, [onPullToRefresh]);

      const mainView = scrollable ? (
        <KeyboardAwareScrollView
          {...nativeProps}
          enableOnAndroid
          ref={ref}
          bounces={true}
          extraHeight={100}
          showsVerticalScrollIndicator={showScrollBar}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            onPullToRefresh ? (
              <RefreshControl
                colors={refreshIndicatorColors}
                progressBackgroundColor={refreshProgressBackgroundColor}
                progressViewOffset={refreshProgressViewOffset}
                size={refreshIndicatorSize}
                tintColor={refreshTintColor}
                title={refreshTitle}
                titleColor={refreshTitleColor}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            ) : undefined
          }
        >
          <MotiView {...(animationProps as any)} style={props.style}>
            {children}
          </MotiView>
        </KeyboardAwareScrollView>
      ) : (
        <MotiView
          {...(animationProps as any)}
          style={[{ flex: 1 }, props.style]}
        >
          {children}
        </MotiView>
      );

      return (
        <>
          <StatusBar
            backgroundColor={
              ((animationProps.animate as any) ?? {}).backgroundColor ??
              ((props.style as any) ?? {}).backgroundColor
            }
            barStyle={colorMode === "light" ? "dark-content" : "light-content"}
          />
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            {mainView}
          </SafeAreaView>
        </>
      );
    }
  )
);

/** A layout component that you can use to wrap all the views in your app. */
const Screen = pearl<BaseScreenProps, "atom">(CustomScreen, {
  componentName: "Screen",
  type: "atom",
  animatable: true,
});

export type ScreenProps = React.ComponentProps<typeof Screen>;

Screen.displayName = "Screen";

export default Screen;
