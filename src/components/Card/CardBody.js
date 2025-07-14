import { Box, useStyleConfig } from "@chakra-ui/react";
import PropTypes from "prop-types";

function CardBody(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("CardBody", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

CardBody.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CardBody;
