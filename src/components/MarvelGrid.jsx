import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import slugify from "slugify";
import { Box, Image, Select, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const MarvelGrid = () => {
  const [showVars, setShowVars] = useState({
    page: 1,
    limit: 48,
  });

  const apiUrl = `https://gateway.marvel.com/v1/public/characters?limit=${
    showVars.limit
  }
                    &offset=${(showVars.page - 1) * showVars.limit}
                    &apikey=bac0261e17798de947618f7e19ad79db`;

  const fetcher = (url) => axios.get(url).then((resp) => resp.data.data);

  const { data, error } = useSWR(apiUrl, fetcher);

  return (
    <>
      {!data && !error && <p>loading</p>}
      {error && <p>error</p>}
      {data && (
        <>
          <Select
            mb={5}
            defaultValue={showVars.page}
            onChange={(e) => {
              setShowVars((prevShowVars) => ({
                ...prevShowVars,
                page: parseInt(e.target.value),
              }));
            }}
          >
            {[...Array(Math.ceil(data.total / showVars.limit))].map((a, i) => (
              <option key={"page_" + i} value={i + 1}>
                page {i + 1}
              </option>
            ))}
          </Select>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={5}>
            {data.results.map((hero) => (
              <Box key={hero.id} position="relative">
                <Link
                  to={`${hero.id}/${slugify(hero.name, {
                    replacement: "-",
                    lower: true,
                    strict: true,
                  })}`}
                >
                  <Image
                    borderRadius="0.5rem"
                    src={`${hero.thumbnail.path}/standard_fantastic.${hero.thumbnail.extension}`}
                  />
                  <Text
                    position="absolute"
                    bottom="0"
                    backgroundColor="rgba(255, 255, 255, 0.75)"
                    width="100%"
                    padding={2}
                  >
                    {hero.name}
                  </Text>
                </Link>
              </Box>
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  );
};
