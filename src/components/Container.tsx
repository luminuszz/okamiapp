import React from "react";

import { Box } from "@gluestack-ui/themed";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <Box w="$full" h="$full" bgColor="$blueGray900" py="$8" px="$1">
      {children}
    </Box>
  );
};

export default Container;
