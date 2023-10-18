import * as React from "react";
import { styled } from "@mui/material/styles";
import { ReactElement, memo } from "react";
import PropTypes from "prop-types";
import { Fab, useMediaQuery, Theme } from "@mui/material";
import ContentAdd from "@mui/icons-material/Add";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useTranslate, useResourceContext, useCreatePath } from "ra-core";
import isEqual from "lodash/isEqual";

import { Button, ButtonProps } from "react-admin";

const CreateButton = (props: CreateButtonProps) => {
  const {
    className,
    icon = defaultIcon,
    label = "ra.action.create",
    resource: resourceProp,
    scrollToTop = true,
    variant,
    ...rest
  } = props;

  const resource = useResourceContext(props);
  const createPath = useCreatePath();

  return (
    <StyledButton
      component={Link}
      to={createPath({ resource, type: "create" })}
      state={scrollStates[String(scrollToTop)]}
      className={clsx(CreateButtonClasses.root, className)}
      label={label}
      variant={variant}
      {...(rest as any)}
    >
      {icon}
    </StyledButton>
  );
};

// avoids using useMemo to get a constant value for the link state
const scrollStates: any = {
  true: { _scrollToTop: true },
  false: {},
};

const defaultIcon = <ContentAdd />;

interface Props {
  resource?: string;
  icon?: ReactElement;
  scrollToTop?: boolean;
}

export type CreateButtonProps = Props & ButtonProps;

CreateButton.propTypes = {
  resource: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.element,
  label: PropTypes.string,
};

const PREFIX = "RaCreateButton";

export const CreateButtonClasses = {
  root: `${PREFIX}-root`,
  floating: `${PREFIX}-floating`,
};

const StyledButton = styled(Button, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})({});

export default memo(CreateButton, (prevProps, nextProps) => {
  return (
    prevProps.resource === nextProps.resource &&
    prevProps.label === nextProps.label &&
    prevProps.translate === nextProps.translate &&
    prevProps.disabled === nextProps.disabled &&
    isEqual(prevProps.to, nextProps.to)
  );
});
