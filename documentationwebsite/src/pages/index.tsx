import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import useThemeContext from "@theme/hooks/useThemeContext"; //docs: https://v2.docusaurus.io/docs/2.0.0-alpha.69/theme-classic#usethemecontext
import { AiFillBuild } from "react-icons/ai";
import { HiLightningBolt } from "react-icons/hi";
import { MdMovie } from "react-icons/md";
import { IoColorPaletteSharp, IoAccessibility, IoMoon } from "react-icons/io5";

function HomepageHeader() {
  const { isDarkTheme } = useThemeContext();

  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>
          Build accessible mobile apps with a{" "}
          <span style={{ color: "var(--ifm-color-primary)" }}>
            design-first
          </span>{" "}
          approach
        </h1>
        <p className={styles.heroDescription}>
          Pearl UI is a powerful UI toolkit that helps you build beautiful
          production-ready mobile apps right out of the box. Skip the designer,
          write cleaner code, and get your product to market faster!
        </p>
        <Link
          className={clsx(
            "button button--primary button--lg",
            styles.heroButton
          )}
          to="/docs/getting-started/introduction"
          style={{ marginRight: 10 }}
        >
          Get Started
        </Link>

        <a
          className={clsx(
            "button button--secondary button--lg",
            styles.heroButton
          )}
          href="https://github.com/agrawal-rohit/pearl-ui"
          target="_blank"
        >
          Github
        </a>

        <br />
        <br />
        <a
          href="https://www.producthunt.com/posts/pearl-ui?utm_source=badge-review&utm_medium=badge&utm_souce=badge-pearl-ui#discussion-body"
          target="_blank"
        >
          <img
            src={`https://api.producthunt.com/widgets/embed-image/v1/review.svg?post_id=319078&theme=${
              isDarkTheme ? "dark" : "light"
            }`}
            alt="Pearl UI - Design system driven UI framework for React Native | Product Hunt"
            style={{ width: 250, height: 54 }}
            width="250"
            height="54"
          />
        </a>
      </div>
    </header>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Customizable",
      description:
        "Customize every component to fit your design needs. The entire theme can be controlled via a single config file.",
      icon: <IoColorPaletteSharp fontSize={30} />,
    },
    {
      title: "Accessible",
      description:
        "All components follow the official Android and Apple accessibility guidelines, while providing support for screen readers.",
      icon: <IoAccessibility fontSize={30} />,
    },
    {
      title: "Dark Mode",
      description:
        "Out of the box support for multiple color modes. Let it be light, dark, or based on users' system preferences.",
      icon: <IoMoon fontSize={30} />,
    },
    {
      title: "Animations",
      description:
        "Built-in animations to enhance your UI. Smooth and responsive animations are readily available for a dynamic user experience.",
      icon: <MdMovie fontSize={30} />,
    },
    {
      title: "Developer Experience",
      description:
        "Boost your productivity during development with the help of style props and modular components",
      icon: <HiLightningBolt fontSize={30} />,
    },
    {
      title: "Extendable",
      description:
        "Follows the <a href='https://atomicdesign.bradfrost.com/' target='_blank'>Atomic Design</a> methodology to provide you with modular components that can be used to build complex interfaces.",
      icon: <AiFillBuild fontSize={30} />,
    },
  ];

  const renderFeatureCards = (features) => {
    return features.map((feature, key) => (
      <div key={key} className="col col--4">
        <div className={clsx("card", styles.featureCard)}>
          <div className={clsx("card__header", styles.featureCardTitle)}>
            <div className={styles.featureCardIcon}>{feature.icon}</div>
            <h3>{feature.title}</h3>
          </div>
          <div className={clsx("card__body", styles.featureCardBody)}>
            <p dangerouslySetInnerHTML={{ __html: feature.description }}></p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section>
      <div className="container">
        <div className="row">{renderFeatureCards(features)}</div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="Pearl UI is a design-system-driven framework for developers to build
      beautiful, accessible mobile apps straight out of the box. Take your
      idea from a design mockup to a finished product at the speed of light!"
    >
      {/* <Head>
        <script async src="https://snack.expo.dev/embed.js"></script>
      </Head> */}
      <HomepageHeader />
      <br />
      <FeaturesSection />
      <br />
      <br />
    </Layout>
  );
}
