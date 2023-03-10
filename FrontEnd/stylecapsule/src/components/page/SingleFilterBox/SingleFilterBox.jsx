import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FilterBox } from "../Valentine/FilterBox/FilterBox";
import { SingleProductAddToCartBox } from "../SingleProductAddToCartBox/SingleProductAddToCartBox";
import { useParams } from "react-router-dom";
import { PaginationBox } from "../Valentine/Pagination/PaginationBox";

export const SingleFilterBox = () => {
  const [Loading, setLoading] = useState(false);
  const { url } = useParams();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const getData = async (url, page) => {
    try {
      return await axios.get(
        `${process.env.REACT_APP_MAIN_SERVER_URL}/flower-data/?page=${page}&limit=8&Type=${url}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(url)
    setLoading(true);
    getData(url, page)
      .then((res) => {
        setTotal(res.data.totalPages);
        console.log(res.data.data)
        setList(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page, url]);

  return (
    <>
      <Flex
        gap="8"
        display={["grid", "grid", "grid", "flex"]}
        w="95%"
        m="auto"
        mt="2rem"
      >
        <Box>
          <FilterBox />
        </Box>
        <Box w="80%" m="auto">
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
            <SimpleGrid columns={[1, 2, 2, 4]} spacing={10} display="grid">
              {list && list.map((product, i) => (
                <SingleProductAddToCartBox product={product} i={i} />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Flex>
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
      </Box>
    </>
  );
};
