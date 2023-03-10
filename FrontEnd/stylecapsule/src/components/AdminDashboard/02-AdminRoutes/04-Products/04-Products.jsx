import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PaginationBox } from "../../../page/Valentine/Pagination/PaginationBox";
import { SinglePage } from "./pages/01-SinglePage";
import { DrawerAddProduct } from "./pages/02-DrawerAddProduct";

export const Products = () => {
  const [Loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const [list, setList] = useState([]);

  const [name, setName] = useState(false);
  const [price, setPrice] = useState(false);

  const GetData = async () => {
    try {
      setLoading(true)
      let res = await axios.get(
        `${process.env.REACT_APP_MAIN_SERVER_URL}/flower-data/?page=${page}&limit=8&Type=Valentine Flowers`
      );
      setLoading(false)
      console.log(res)
      setList(res.data.data);
      setTotal(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const HandelEditProduct = async (ProductName, productId, ProductPrice) => {
    const data = {
      ProductName,
      ProductPrice,
      productId,
    };

    console.log(data)

    try {
      return await axios.post(
        `${process.env.REACT_APP_MAIN_SERVER_URL}/flower-data/edit`,
        data
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetData();
  }, [page]);

  return (
    <Box   backgroundSize={"cover"}
    backgroundImage={
      "https://images.pexels.com/photos/7130540/pexels-photo-7130540.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
    pt="1rem"
    pb="2rem">
      {Loading ? (
        <Box
          h="40rem"
          display="grid"
          justifyContent={"center"}
          alignContent="center"
        >
          {" "}
          <Box>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        </Box>
      ) : (
        <Box
        
        >
          <Box textAlign={"center"}>
            <DrawerAddProduct GetData={GetData} />
          </Box>

          <Box pt="1rem" pb="2rem" w="90%" m="auto">
            <SimpleGrid columns={[1, 2, 2, 4]} spacing={10}>
              {list.map((product, i) => {
                return (
                  <SinglePage
                    GetData={GetData}
                    HandelEditProduct={HandelEditProduct}
                    Price={price}
                    setPrice={setPrice}
                    name={name}
                    setName={setName}
                    product={product}
                    i={i}
                  />
                );
              })}
            </SimpleGrid>
            <Box
              mb="2rem"
              display={"grid"}
              justifyContent={"center"}
              m="auto"
              mt="1rem"
              w="80%"
            >
              {" "}
              <PaginationBox page={page} setPage={setPage} total={total} />
            </Box>{" "}
          </Box>
        </Box>
      )}
    </Box>
  );
};
