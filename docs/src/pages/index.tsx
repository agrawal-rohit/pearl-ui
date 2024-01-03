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
import axios from "axios";
import { IoColorPaletteSharp, IoAccessibility, IoMoon } from "react-icons/io5";

function HomepageHeader() {
  const { isDarkTheme } = useThemeContext();
  const [githubStars, setGithubStars] = React.useState(null);

  React.useEffect(() => {
    const fetchGithubStars = async () => {
      const response = await axios.get(
        "https://api.github.com/repos/agrawal-rohit/pearl-ui"
      );
      setGithubStars(response.data.stargazers_count);
    };

    fetchGithubStars();
  }, []);

  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>
          Build consistent cross-platform mobile apps at{" "}
          <span style={{ color: "var(--ifm-color-primary)" }}>
            lightning speed
          </span>
        </h1>
        <p className={styles.heroDescription}>
          Pearl UI is a user-friendly UI library for React Native, offering
          ready-to-use components, framer-motion-like animations, dark mode, and
          responsive design. With its design-first approach and intuitive
          styling system, Pearl UI greatly enhances developer efficiency,
          simplifying and accelerating app development.
        </p>
        <Link
          className={clsx(
            "button button--primary button--lg",
            styles.heroButton
          )}
          to="/docs/overview/getting-started/introduction"
          style={{ marginRight: 10, color: "white" }}
        >
          Read the docs
        </Link>

        <a
          className={clsx(
            "button button--secondary button--lg",
            styles.heroButton
          )}
          href="https://github.com/agrawal-rohit/pearl-ui"
          target="_blank"
        >
          <img
            src="data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%234d4d4d' d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/%3E%3C/svg%3E"
            alt="Github logo"
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          <span style={{ fontWeight: 500 }}>Star</span>
          <span
            style={{
              marginLeft: 5,
              fontWeight: 500,
              fontSize: "0.85rem",
              color: "#686b6e",
            }}
          >
            ({githubStars})
          </span>
        </a>

        <br />
        <br />
        <a
          href="https://www.producthunt.com/posts/pearl-ui?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-pearl&#0045;ui"
          target="_blank"
        >
          <img
            src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=319078&theme=${
              isDarkTheme ? "neutral" : "light"
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

function ExpoQRCodeSection() {
  const { isDarkTheme } = useThemeContext();

  return (
    <section>
      <div className="container">
        <main
          className={`${styles.showcaseContainer} ${
            isDarkTheme
              ? styles.darkShowcaseContainer
              : styles.lightShowcaseContainer
          }`}
        >
          <section>
            <h1>Check out Pearl UI in action!</h1>
            <p>
              Simply scan the QR code using the Expo app on your device. This
              will launch a live demo showcasing the wide array of ready-to-use
              components and intuitive animations that Pearl UI offers.
            </p>
            <img
              src={require("@site/static/img/showcase-qr-code.png").default}
              style={{
                width: 180,
                height: 180,
                padding: 10,
                marginTop: 20,
                borderRadius: 8,
                backgroundColor: "white",
              }}
            />
          </section>
          <img
            src={require("@site/static/img/showcase.png").default}
            style={{
              width: 200,
              display: "flex",
              height: "auto",
              marginRight: 8,
            }}
          />
        </main>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="Pearl UI is a user-friendly UI library for React Native, offering ready-to-use components, framer-motion-like animations, dark mode, and responsive design. With its design-first approach and intuitive styling system, Pearl UI greatly enhances developer efficiency, simplifying and accelerating app development."
    >
      {/* <Head>
        <script async src="https://snack.expo.dev/embed.js"></script>
      </Head> */}
      <HomepageHeader />
      <br />
      <FeaturesSection />
      <br />
      <br />
      <ExpoQRCodeSection />
      <br />
      <br />
    </Layout>
  );
}
