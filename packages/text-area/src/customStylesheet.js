function getWebLightBorders(props, themeData) {
  const { isDisabled, hasFocus, hasHover } = props;
  if (hasFocus) {
    return themeData[`input.focus.borderBottomColor`];
  }
  if (hasHover && !isDisabled) {
    return themeData[`input.hover.borderBottomColor`];
  }
  return themeData[`input.borderColor`];
}

export default function stylesheetOverride(
  stylesheet,
  props,
  themeData,
  theme
) {
  const borderStyles =
    props.variant === `line`
      ? `rgba(128, 128, 128, 0.2)`
      : themeData[`input.borderColor`];
  const textAreaWrapper =
    theme === `hig-light`
      ? {
          ...stylesheet.wrapper,
          borderColor: getWebLightBorders(props, themeData),
          borderBottomColor: getWebLightBorders(props, themeData)
        }
      : {
          ...stylesheet.wrapper,
          borderLeftColor: borderStyles,
          borderRightColor: borderStyles,
          borderTopColor: borderStyles
        };
  const textArea = {
    ...stylesheet.input,
    display: `block`,
    resize: `none`,
    padding: `${themeData["input.verticalPadding"]}
      ${themeData["input.boxType.horizontalPadding"]}`
  };
  return {
    ...stylesheet,
    wrapper: textAreaWrapper,
    input: textArea
  };
}
