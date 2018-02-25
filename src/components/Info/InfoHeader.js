import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Link from "gatsby-link";

import avatar from "../../images/avatar.jpg";

const styles = theme => ({
  header: {
    lineHeight: 1,
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      height: "140px",
      position: "relative"
    }
  },
  avatarLink: {
    willChange: "left, top",
    float: "left",
    display: "block",
    position: "relative",
    margin: "0 12px 0 0",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "0 20px 0 0"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      position: "absolute",
      top: "10px",
      left: "50%",
      marginLeft: "-30px",
      transition: "all .8s",
      transitionTimingFunction: "ease",
      ".navigatorInTransitionFrom.navigatorIsOpened &": {
        left: "50%"
      },
      ".navigatorInTransitionTo.navigatorIsOpened &, .navigatorIsAside.navigatorIsOpened &": {
        left: "8%",
        top: "0"
      }
    }
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "65% 75%",
    transition: "all .3s",
    transitionTimingFunction: "ease",
    display: "inline-block",
    overflow: "hidden",
    "& img": {
      maxWidth: "100%"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      width: "44px",
      height: "44px"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      width: "60px",
      height: "60px"
    },
    "@media (hover: hover)": {
      "&:hover": {
        borderRadius: "75% 65%"
      }
    }
  },
  title: {
    willChange: "transform, left, top",
    fontSize: `${theme.info.fonts.boxTitleSize}em`,
    margin: 0,
    float: "left",
    transitionTimingFunction: "ease",
    "& small": {
      display: "block",
      fontSize: ".6em",
      marginTop: ".3em"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      fontSize: `${theme.info.fonts.boxTitleSizeM}em`
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      fontSize: `${theme.info.fonts.boxTitleSizeL}em`,
      position: "absolute",
      top: "85px",
      textAlign: "center",
      left: "50%",
      transform: "translate(-50%)",
      transition: "all .8s",
      ".navigatorInTransitionFrom &": {
        left: "50%",
        top: "70px"
      },
      ".navigatorInTransitionTo &, .navigatorIsAside &": {
        left: "60%",
        top: `${1.9 - theme.info.fonts.boxTitleSizeL}em`,
        textAlign: "left"
      }
    }
  }
});

const InfoHeader = props => {
  const { classes, info, avatarOnClick } = props;
  const boxTitle = info.node.frontmatter.boxTitle;
  const boxTitleNote = info.node.frontmatter.boxTitleNote;

  return (
    <header className={classes.header}>
      <Link className={classes.avatarLink} onClick={avatarOnClick} to="/" title="back to Home page">
        <div className={classes.avatar}>
          <img src={avatar} alt="" />
        </div>
      </Link>
      <h1 className={classes.title}>
        {boxTitle.replace(/ /g, "\u00a0")}
        <small>{boxTitleNote}</small>
      </h1>
    </header>
  );
};

InfoHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  avatarOnClick: PropTypes.func.isRequired
};

export default injectSheet(styles)(InfoHeader);
