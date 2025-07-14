import { Box, useStyleConfig } from "@chakra-ui/react";
import PropTypes from "prop-types";

function PanelContent(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("PanelContent", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

PanelContent.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PanelContent;
