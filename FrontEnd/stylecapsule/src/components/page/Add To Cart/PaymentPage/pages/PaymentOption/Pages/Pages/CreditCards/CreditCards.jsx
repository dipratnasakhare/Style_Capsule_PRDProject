
import {
  Box,
  Input,
  Text,
  Flex,
  Grid,
  Spacer,
  Button,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
export const CreditCards = ({ setOrderPlace, SetOrderDetails, CartData }) => {
  const [CardNo, setCardNo] = useState("");
  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [Cvv, setCvv] = useState("");
  const toast = useToast()

  const HandelCheckout = () => {
console.log(CartData)

    if(CartData.length === 0){
      toast({
        position:"top",
        description: "Please add product in cart",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return 
    }


    if(CardNo !== "" && Name !== "" && Date !== "" && Cvv !== "" ){
      setOrderPlace(true)
      SetOrderDetails()
    }else{
      toast({
        position: 'top',
        title: 'Please fields all inputs',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  return (
    <Grid gap="8px" >
      <Grid
      gap="5px"
      >
        <Box justifyContent={"flex-start"} display="grid">
          <Text>Credit card number</Text>
        </Box>

        <Box>
          <Input
            bgRepeat={"no-repeat"}
            bgPos="right"
            bgSize={"30px"}
            bgImage={
              "https://th.bing.com/th/id/OIP.9TNqDBKi08Xz_DhwKXnwdQHaHa?pid=ImgDet&rs=1"
            }
            // placeholder="Enter Your Number"
            isInvalid={CardNo === ""}
            onChange={(e) => setCardNo(e.target.value)}
            errorBorderColor="red.300"
            size="sm"
            value={CardNo}
            id="ccn"
            type="number"
            inputmode="numeric"
            pattern="[0-9\s]{13,19}"
            autocomplete="cc-number"
            maxlength="19"
            placeholder="xxxx xxxx xxxx xxxx"
          />
        </Box>
      </Grid>

      <Grid gap="5px">
        <Box justifyContent={"flex-start"} display="grid">
          <Text>Credit card name</Text>
        </Box>
        <Box>
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            size="sm"
            value={Name}
            isInvalid={Name === ""}
            errorBorderColor="red.300"
          />
        </Box>
      </Grid>

      <Flex display={["grid", "grid", "flex"]}>
        <Box>
          <Text mb="15px">Expiry date (MM / YY)</Text>
          <Box>
            <Input
              onChange={(e) => setDate(e.target.value)}
              value={Date}
              type="date"
              isInvalid={Date === ""}
              errorBorderColor="red.300"
            />
          </Box>
        </Box>

        <Spacer />
        <Box>
          <Box>
            <Text mb="15px">CVV</Text>
          </Box>
          <Box>
            <Input
              value={Cvv}
              onChange={(e) => setCvv(e.target.value)}
              type="password"
              isInvalid={Cvv === ""}
              errorBorderColor="red.300"
              w="8rem"
              bgRepeat={"no-repeat"}
              bgPos="right"
              bgSize={"30px"}
              bgImage={
                "https://moneymall.ae/credit-blog/wp-content/uploads/2020/09/cvv.png"
              }
            />
          </Box>
        </Box>
      </Flex>

      <Flex>
        {" "}
        <Checkbox
          size="lg"
          ml="8px"
          colorScheme="green"
          mr="8px"
        ></Checkbox>{" "}
        <Text>Save this card for faster checkout</Text>
      </Flex>

      <Box m="30px" justifyContent={"flex-start"} display="grid">
        <Button
           onClick={() => HandelCheckout()}
          _hover={"none"}
          borderRadius={"0px"}
          bg="#ef534e"
        >
          Pay Now
        </Button>
      </Box>
    </Grid>
  );
};
