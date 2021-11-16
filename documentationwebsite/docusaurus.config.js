// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "Pearl UI",
    tagline:
      "Pearl UI is a design-system-driven framework for developers to build beautiful, accessible mobile apps straight out of the box. Take your idea from a design mockup to a finished product at the speed of light!",
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
            // Please change this to your repo.
            editUrl: "https://github.com/agrawal-rohit/pearl-ui",
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

          // Optional: see doc section below
          contextualSearch: true,

          // Optional: see doc section below
          appId: "BH4D9OD16A",

          // Optional: Algolia search parameters
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
              "Pearl UI is a design-system-driven framework for developers to build beautiful, accessible mobile apps straight out of the box. Take your idea from a design mockup to a finished product at the speed of light!",
          },
          { name: "og:image", content: "img/logo.png" },
          { name: "og:url", content: "https://pearl-ui.vercel.app" },
          { name: "og:site_name", content: "Pearl UI" },

          { name: "twitter:title", content: "Pearl UI" },
          {
            name: "twitter:description",
            content:
              "Pearl UI is a design-system-driven framework for developers to build beautiful, accessible mobile apps straight out of the box. Take your idea from a design mockup to a finished product at the speed of light!",
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
              href: "https://discord.gg/wxJsmG5k",
              position: "right",
              className: "header-discord-link",
              "aria-label": "Discord channel",
            },
            {
              href: "https://twitter.com/pearl_ui",
              position: "right",
              className: "header-twitter-link",
              "aria-label": "Twitter account",
            },
          ],
        },
        footer: {
          style: "dark",
          copyright: `Copyright © ${new Date().getFullYear()} Pearl UI, Inc. Proudly built in <span style="margin-right: 5px">🇮🇳</span>  by <a href="https://twitter.com/_rohitagrawal_" target="_blank">Rohit Agrawal</a>.`,
        },
        prism: {
          theme: require("prism-react-renderer/themes/palenight"),
          darkTheme: require("prism-react-renderer/themes/palenight"),
        },
      }),
    scripts: [
      {
        src: "https://snack.expo.dev/embed.js",
      },
    ],
  }
);
