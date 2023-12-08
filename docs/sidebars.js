/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  overview: [
    {
      type: "category",
      label: "Getting Started",
      items: [
        "overview/getting-started/introduction",
        "overview/getting-started/installation",
        "overview/getting-started/design-principles",
      ],
    },
    {
      type: "category",
      label: "Core Features",
      items: [
        "overview/core-features/style-props",
        "overview/core-features/dark-mode",
        "overview/core-features/animation-support",
        "overview/core-features/responsivity",
        "overview/core-features/extensibility",
      ],
    },
    {
      type: "category",
      label: "Theming",
      items: [
        "overview/theming/default-theme",
        "overview/theming/customize-theme",
        "overview/theming/typescript-support",
      ],
    },
  ],
  components: [
    "components/components",
    {
      type: "category",
      label: "Layout",
      items: [
        "components/layout/Box",
        "components/layout/Center",
        "components/layout/Divider",
        "components/layout/Stack",
        "components/layout/Screen",
        "components/layout/Spacer",
      ],
    },
    {
      type: "category",
      label: "Typography",
      items: ["components/typography/Text"],
    },
    {
      type: "category",
      label: "Forms",
      items: [
        "components/forms/Pressable",
        "components/forms/Button",
        "components/forms/Icon Button",
        "components/forms/Input",
        "components/forms/Textarea",
        "components/forms/CheckBox",
        "components/forms/Radio",
        "components/forms/Switch",
        "components/forms/Text Link",
      ],
    },
    {
      type: "category",
      label: "Media",
      items: [
        "components/media/Icon",
        "components/media/Avatar",
        "components/media/Image",
        "components/media/Video",
      ],
    },
    {
      type: "category",
      label: "Feedback",
      items: [
        "components/feedback/Spinner",
        "components/feedback/Skeleton",
        "components/feedback/Progress",
        "components/feedback/Badge",
      ],
    },
    {
      type: "category",
      label: "Transitions",
      items: [
        "components/transitions/Fade",
        "components/transitions/Scale Fade",
        "components/transitions/Slide",
        "components/transitions/Slide Fade",
        "components/transitions/Collapse",
      ],
    },
  ],
  utils: [
    {
      type: "category",
      label: "Hooks",
      items: [
        "utils/hooks/useTheme",
        "utils/hooks/useStyleProps",
        "utils/hooks/useMotiWithStyleProps",
        "utils/hooks/useDimensions",
        "utils/hooks/useColorScheme",
        "utils/hooks/useColorModeValue",
        "utils/hooks/useResponsiveProp",
        "utils/hooks/useAccessibleColor",
        "utils/hooks/useAtomicComponentConfig",
        "utils/hooks/useMolecularComponentConfig",
        "utils/hooks/useAnimationState",
        "utils/hooks/useDynamicStateStyle",
        "utils/hooks/useCheckedState",
        "utils/hooks/useDisabledState",
        "utils/hooks/useFocusedState",
        "utils/hooks/useInvalidState",
        "utils/hooks/usePressedState",
        "utils/hooks/pearl",
      ],
    },
    {
      type: "category",
      label: "Others",
      items: ["utils/others/generatePalette", "utils/others/style-functions"],
    },
  ],
};
