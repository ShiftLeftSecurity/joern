import { Link } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import { Waypoint } from 'react-waypoint';
import pic01 from '../assets/images/pic01.jpg';
import picworkspace from '../assets/images/workspace.png';
import Header from '../components/Header';
import Layout from '../components/layout';
import Nav from '../components/Nav';
import { MDXRenderer } from "gatsby-plugin-mdx";

const Index = props => {
  const [stickyNav, setStickyNav] = React.useState(true);
  const toggleStickyNav = () => setStickyNav(prev => !prev);
  return (
    <Layout>
      <Helmet title="Joern - Open-Source Code Querying Engine" />
      <Header />
      <Waypoint onEnter={toggleStickyNav} onLeave={toggleStickyNav} />
      <Nav sticky={stickyNav} />

      <div id="main">
        <section id="intro" className="main">
          <div className="spotlight">
            <div className="content">
              <header className="major">
                <h2>An Interactive Shell for Code Analysis</h2>
              </header>
              <p>
          <MDXRenderer>{props.data.allMdx.edges.filter(x => x.node.frontmatter.slug === 'intro')[0].node.body}</MDXRenderer>
	      </p>
              <ul className="actions">
                <li>
                  <Link to="/docs" className="button">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <span className="image">
              <img src={picworkspace} alt="" width="60%"/>
            </span>
          </div>
        </section>

        <section id="first" className="main">
          <header className="major">
            <h2>Code Property Graphs</h2>
          </header>
	<p>
          <MDXRenderer>{props.data.allMdx.edges.filter(x => x.node.frontmatter.slug === 'cpgs')[0].node.body}</MDXRenderer>
          </p>  
        </section>
        <section id="second" className="main">
          <header className="major">
            <h2>Getting Started</h2>
          </header>
	  <p>
          <MDXRenderer>{props.data.allMdx.edges.filter(x => x.node.frontmatter.slug === 'getting-started')[0].node.body}</MDXRenderer>
          </p>
        </section>
        <section id="cta" className="main special">
          <header className="major">
            <h2>Community</h2>
            <p>
              Donec imperdiet consequat consequat. Suspendisse feugiat congue
              <br />
              posuere. Nulla massa urna, fermentum eget quam aliquet.
            </p>
          </header>
          <footer className="major">
            <ul className="actions">
              <li>
                <Link to="/generic" className="button special">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/generic" className="button">
                  Learn More
                </Link>
              </li>
            </ul>
          </footer>
        </section>
      </div>
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
query MyQuery {
  allMdx {
    edges {
      node {
        id
        body
        frontmatter {
         slug
        }
      }
    }
  }
} 
`
