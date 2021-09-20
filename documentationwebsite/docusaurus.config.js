const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: "Pearl UI",
  tagline:
    "A simple and modular UI framework for building gorgeous mobile apps",
  url: "https://pearl-ui.vercel.app",
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
      metadatas: [
        { name: "og:type", content: "website" },
        {
          name: "og:title",
          content: "Pearl UI",
        },
        {
          name: "og:description",
          content:
            "A simple and accessible UI toolkit for cross platform mobile apps",
        },
        { name: "og:image", content: "img/logo.png" },
        { name: "og:url", content: "https://pearl-ui.vercel.app" },
        { name: "og:site_name", content: "Pearl UI" },

        { name: "twitter:title", content: "Pearl UI" },
        {
          name: "twitter:description",
          content:
            "A simple and accessible UI toolkit for cross platform mobile apps",
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
            to: "/docs/introduction", // ./docs/Intro.md
            label: "Docs",
            position: "left",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
          },
          {
            href: "https://github.com/agrawal-rohit/pearl-ui",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Pearl UI, Inc. Proudly built in <span style="margin-right: 5px">🇮🇳</span>  by Rohit Agrawal.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
