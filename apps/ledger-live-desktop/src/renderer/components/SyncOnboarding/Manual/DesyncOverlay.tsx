import React, { useEffect, useState } from "react";
import { Button, Flex, InfiniteLoader, Text, Box } from "@ledgerhq/react-ui";
import { useTheme } from "styled-components";
import { CloseMedium } from "@ledgerhq/react-ui/assets/icons";

type Props = {
  isOpen: boolean;
  delay?: number;
};

export const DesyncOverlay = ({ isOpen, delay = 0 }: Props) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const { colors } = useTheme();
  console.log(useTheme());

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setShowContent(true);
      }, delay);
    }
  }, [isOpen, delay]);

  useEffect(() => {
    if (!isOpen) {
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen || !showContent) {
    return null;
  }

  return (
    <Flex
      zIndex={100}
      position="absolute"
      backgroundColor={colors.constant.overlay}
      top={0}
      left={0}
      height="100%"
      width="100%"
      flexDirection="column"
    >
      <Flex justifyContent="flex-end" mr={6} mt={6}>
        <Box backgroundColor={colors.neutral.c30} borderRadius="9999px">
          <Button Icon={CloseMedium} iconSize={24} />
        </Box>
      </Flex>
      <Flex position="absolute" width="100%" justifyContent="flex-end" bottom={0} padding={4}>
        <Flex
          width="400px"
          backgroundColor={colors.warning}
          borderRadius="8px"
          p={4}
          mr={4}
          mb={4}
          flexDirection="row"
          alignItems="center"
        >
          <Box flexShrink={1}>
            <Text pr={3} variant="body" color={colors.palette.constant.black}>
              {`It looks like connection to your Nano was lost. We're trying to reconnect.`}
            </Text>
          </Box>
          <InfiniteLoader color="black" size={24} />
        </Flex>
      </Flex>
    </Flex>
  );
};