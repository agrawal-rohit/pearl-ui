// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title:
      "Pearl UI - Build consistent cross-platform mobile apps at lightning speed",
    tagline:
      "Pearl UI is a user-friendly UI library for React Native, offering ready-to-use components, framer-motion-like animations, dark mode, and responsive design. With its design-first approach and intuitive styling system, Pearl UI greatly enhances developer efficiency, simplifying and accelerating app development.",
    url: "https://docs.pearl-ui.dev/",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "agrawal-rohit", // Usually your GitHub org/user name.
    projectName: "pearl-ui", // Usually your repo name.
    plugins: ["docusaurus-plugin-react-native-web"],
    themes: ["@docusaurus/theme-live-codeblock"],
    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            sidebarCollapsible: false,
            editUrl:
              "https://github.com/agrawal-rohit/pearl-ui/tree/main/docs/",
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
      ],
    ],
    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        colorMode: {
          defaultMode: "light",
          disableSwitch: false,
          respectPrefersColorScheme: false,
        },
        image: "img/logo.png",
        algolia: {
          // deepcode ignore HardcodedNonCryptoSecret: <please specify a reason of ignoring this>
          apiKey: "92c72ce8bc4acdda47492dbbe56f0e2d",
          indexName: "pearl-ui",
          contextualSearch: true,
          appId: "BH4D9OD16A",
          searchParameters: {},
        },
        metadatas: [
          { name: "og:type", content: "website" },
          {
            name: "og:title",
            content: "Pearl UI",
          },
          {
            name: "og:description",
            content:
              "Pearl UI is a user-friendly UI library for React Native, offering ready-to-use components, framer-motion-like animations, dark mode, and responsive design. With its design-first approach and intuitive styling system, Pearl UI greatly enhances developer efficiency, simplifying and accelerating app development.",
          },
          { name: "og:image", content: "img/logo.png" },
          { name: "og:url", content: "https://docs.pearl-ui.dev" },
          { name: "og:site_name", content: "Pearl UI" },

          { name: "twitter:title", content: "Pearl UI" },
          {
            name: "twitter:description",
            content:
              "Pearl UI is a user-friendly UI library for React Native, offering ready-to-use components, framer-motion-like animations, dark mode, and responsive design. With its design-first approach and intuitive styling system, Pearl UI greatly enhances developer efficiency, simplifying and accelerating app development.",
          },
          { name: "twitter:image", content: "img/logo.png" },
          { name: "twitter:site", content: "https://pearl-ui.vercel.app" },
          { name: "twitter:creator", content: "@_rohitagrawal_" },
        ],
        navbar: {
          logo: {
            alt: "Pearl UI Logo",
            src: "img/logo.png",
            srcDark: "img/logoDark.png",
          },
          items: [
            {
              to: "/docs/overview/getting-started/introduction",
              label: "Overview",
              position: "left",
              className: "nav-overview-link",
              activeBasePath: "docs/overview",
            },
            {
              to: "/docs/components/components",
              label: "Components",
              position: "left",
              className: "nav-components-link",
              activeBasePath: "docs/components",
            },
            {
              to: "/docs/utils/hooks/useTheme",
              label: "Utils",
              position: "left",
              className: "nav-utils-link",
              activeBasePath: "docs/utils",
            },
            {
              href: "https://github.com/agrawal-rohit/pearl-ui",
              position: "right",
              className: "header-github-link",
              "aria-label": "GitHub repository",
            },
            {
              href: "https://twitter.com/_rohitagrawal_",
              position: "right",
              className: "header-twitter-link",
              "aria-label": "Twitter account",
            },
          ],
        },
        footer: {
          copyright: `Proudly built in <span style="margin-left: 5px; margin-right: 5px">🇮🇳</span>  by <a href="https://twitter.com/_rohitagrawal_" target="_blank" style="text-decoration: underline">Rohit Agrawal</a>.`,
        },
        prism: {
          theme: require("prism-react-renderer/themes/vsDark"),
          darkTheme: require("prism-react-renderer/themes/vsDark"),
        },
      }),
    scripts: [
      {
        src: "https://snack.expo.dev/embed.js",
      },
    ],
  }
);
