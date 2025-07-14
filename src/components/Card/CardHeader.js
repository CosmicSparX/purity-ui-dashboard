import { Box, useStyleConfig } from "@chakra-ui/react";
import PropTypes from "prop-types";

function CardHeader(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("CardHeader", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

CardHeader.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CardHeader;
