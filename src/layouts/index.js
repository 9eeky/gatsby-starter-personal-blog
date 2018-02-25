import React from "react";
import injectSheet from "react-jss";
import { MuiThemeProvider } from "material-ui/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import theme from "../styles/theme";
import globals from "../styles/globals";

import { saveData, setNavigatorIsAside, setNavigatorInTransition } from "../state/store";

import Seo from "../components/common/Seo";
import Navigator from "../components/Navigator/";
import Info from "../components/Info/";
import BottomBar from "../components/BottomBar";

class Layout extends React.Component {
  componentWillMount() {
    // let isWideScreen =
    //   typeof window !== "undefined" ? document.documentElement.clientWidth > 776 : false;

    const posts = this.props.data.posts.edges;
    const pages = this.props.data.pages.edges;
    const parts = this.props.data.parts.edges;

    this.props.saveData({ posts, pages, parts });

    //this.props.setNavigatorIsAside(true);
    // if (typeof window !== `undefined`) {
    //   this.props.setNavigatorInTransition(true);

    //   setTimeout(() => {
    //     this.props.setNavigatorInTransition(false);
    //   }, isWideScreen ? 500 : 0);
    // }
  }

  render() {
    const { children } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Seo />
          {children()}
          <Navigator />
          <Info />
          <BottomBar />
        </div>
      </MuiThemeProvider>
    );
  }
}
Layout.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  saveData: PropTypes.func.isRequired,
  updatePostsData: PropTypes.func,
  setNavigatorIsAside: PropTypes.func,
  setNavigatorInTransition: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorIsAside: state.navigator.isAside,
    navigatorIsActive: state.posts.length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveData: data => dispatch(saveData(data)),
    setNavigatorIsAside: val => dispatch(setNavigatorIsAside(val)),
    setNavigatorInTransition: val => dispatch(setNavigatorInTransition(val))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(globals)(Layout));

//eslint-disable-next-line no-undef
export const guery = graphql`
  query LayoutQuery {
    posts: allMarkdownRemark(
      filter: { id: { regex: "//posts//" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
            title
            subTitle
            category
            cover {
              children {
                ... on ImageSharp {
                  resolutions(width: 90, height: 90) {
                    ...GatsbyImageSharpResolutions_withWebp_noBase64
                  }
                }
              }
            }
          }
        }
      }
    }
    pages: allMarkdownRemark(
      filter: { id: { regex: "//pages//" }, fields: { prefix: { regex: "/^\\d+$/" } } }
      sort: { fields: [fields___prefix], order: ASC }
    ) {
      edges {
        node {
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            menuTitle
          }
        }
      }
    }
    parts: allMarkdownRemark(filter: { id: { regex: "//parts//" } }) {
      edges {
        node {
          html
          frontmatter {
            title
            boxTitle
            boxTitleNote
          }
        }
      }
    }
  }
`;
