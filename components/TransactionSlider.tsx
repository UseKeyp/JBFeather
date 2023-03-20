import React from "react";
import { Box, Button, Flex, HStack, Image, Stack } from "@chakra-ui/react";
import { useFormContext } from "../context/FormContext";

/**
 * @remarks - this component is used to determine the "type" of transaction. When user slides component, if it's within the constraints of 'container' id, the focused component gets brought into 'type' state
 * @returns - div containing scrollable buttons
 */
const TransactionSlider = () => {
  const { setType, type, renderReviewPage } = useFormContext();

  const handletype = (e: any) => {
    setType(e.target.id);
  };

  const renderButtons = () => {
    const btnValues = ["Send", "Request", "Fund", "Cash Out"];

    return btnValues.map((value) => {
      return (
        <Box key={value}>
          <Button
            onClick={handletype}
            id={value.toLowerCase().replace(" ", "")}
            variant="none"
            fontSize="60px"
            color="formBlueDark"
            opacity={type === value.toLowerCase().replace(" ", "") ? 1 : 0.5}
          >
            {value}
          </Button>
        </Box>
      );
    });
  };

  const handleScroll = (dir: string) => {
    const container = document.getElementById("container");
    const send = document.getElementById("send");
    const request = document.getElementById("request");
    const fund = document.getElementById("fund");
    const cashOut = document.getElementById("cashout");

    const sendStart = send?.getBoundingClientRect().left;
    const requestStart = request?.getBoundingClientRect().left;
    const fundStart = fund?.getBoundingClientRect().left;
    const cashOutStart = cashOut?.getBoundingClientRect().left;

    // left click actions
    if (dir === "left") {
      if (type === "cashout") {
        container?.scrollBy({
          left: fundStart,
          behavior: "smooth",
        });
        setType("fund");
      } else if (type === "fund") {
        container?.scrollBy({
          left: requestStart && requestStart - 55,
          behavior: "smooth",
        });
        setType("request");
      } else if (type === "request") {
        container?.scrollBy({
          left: sendStart && sendStart - 100,
          behavior: "smooth",
        });
        setType("send");
      }
    }

    // right click actions
    if (dir === "right") {
      if (type === "send") {
        container?.scrollBy({
          left: requestStart && requestStart - 25,
          behavior: "smooth",
        });
        setType("request");
      } else if (type === "request") {
        container?.scrollBy({
          left: fundStart && fundStart - 55,
          behavior: "smooth",
        });
        setType("fund");
      } else if (type === "fund") {
        container?.scrollBy({
          left: cashOutStart,
          behavior: "smooth",
        });
        setType("cashout");
      }
    }
  };

  return (
    <Flex direction="row" display={renderReviewPage ? "none" : "flex"}>
      {/* box for left arrow */}
      <Box
        display={type === "send" ? "none" : "block"}
        alignSelf="center"
        zIndex={1}
        transform="translateX(26px)"
        onClick={() => handleScroll("left")}
        w="fit-content"
      >
        <Image
          src="arrow-right.gif"
          alt=""
          transform="rotate(180deg)"
          opacity={0.5}
        />
      </Box>
      {/* scrollable buttons */}
      <HStack
        id="container"
        overflowX="scroll"
        py="1rem"
        w="450px"
        spacing="-1.5rem"
      >
        {renderButtons()}
      </HStack>
      {/* box for right arrow */}
      <Flex
        display={type === "cashout" ? "none" : "block"}
        transform="translateX(-36px)"
        alignSelf="center"
        zIndex={1}
        onClick={() => handleScroll("right")}
      >
        <Image src="arrow-right.gif" alt="" opacity={0.5} />
      </Flex>
    </Flex>
  );
};

export default TransactionSlider;