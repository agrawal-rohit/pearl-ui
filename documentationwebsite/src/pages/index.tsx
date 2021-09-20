import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

import { AiFillBuild } from "react-icons/ai";
import { HiLightningBolt } from "react-icons/hi";
import { IoColorPaletteSharp, IoAccessibility, IoMoon } from "react-icons/io5";

function HomepageHeader() {
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>
          Build elegant React Native apps without{" "}
          <span style={{ color: "var(--ifm-color-primary)" }}>a designer</span>
        </h1>
        <p className={styles.heroDescription}>
          Pearl UI is a design-system-driven framework for developers to build
          beautiful, accessible mobile apps straight out of the box. Take your
          idea from an MVP to a finished product at the speed of light!
        </p>
        <Link
          className={clsx(
            "button button--primary button--lg",
            styles.heroButton
          )}
          to="/docs/introduction"
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
        "Every components follows the official Android and Apple accessibility guidelines and provides screen reader support.",
      icon: <IoAccessibility fontSize={30} />,
    },
    {
      title: "Dark Mode",
      description:
        "Enable multiple color modes in your app. Let it be light, dark, or based on users' system preferences.",
      icon: <IoMoon fontSize={30} />,
    },
    {
      title: "Developer Experience",
      description:
        "Boost your productivity during development with the help of style functions and modular components",
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
    return features.map((feature) => (
      <div className="col col--4">
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
      idea from an MVP to a finished product at the speed of light!"
    >
      <HomepageHeader />
      <br />
      <br />
      <FeaturesSection />
      <br />
      <br />
    </Layout>
  );
}
