// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title:
      "Pearl UI - Build accessible mobile apps with a design-first approach",
    tagline:
      "Pearl UI is a powerful UI toolkit that helps you build beautiful production-ready mobile apps right out of the box. Skip the designer, write cleaner code, and get your product to market faster!",
    url: "https://www.pearl-ui.dev/",
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
              "https://github.com/agrawal-rohit/pearl-ui/tree/main/documentationwebsite/",
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
              "Pearl UI is a powerful UI toolkit for building beautiful, production-ready mobile apps. It offers a design-first approach, ready-to-use components, and accelerates your time to market.",
          },
          { name: "og:image", content: "img/logo.png" },
          { name: "og:url", content: "https://www.pearl-ui.dev" },
          { name: "og:site_name", content: "Pearl UI" },

          { name: "twitter:title", content: "Pearl UI" },
          {
            name: "twitter:description",
            content:
              "Pearl UI is a powerful UI toolkit for building beautiful, production-ready mobile apps. It offers a design-first approach, ready-to-use components, and accelerates your time to market.",
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
              to: "/docs/getting-started/introduction", // ./docs/Intro.md
              label: "Docs",
              position: "left",
              activeBasePath: "docs",
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
          copyright: `Proudly built in <span style="margin-left: 5px">🇮🇳</span>  by <a href="https://twitter.com/_rohitagrawal_" target="_blank" style="text-decoration: underline">Rohit Agrawal</a>.`,
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
