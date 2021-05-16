import React, { useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";
import slugify from "slugify";
import { Box, Image, Select, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const MarvelGrid = () => {
  const [showVars, setShowVars] = useState({
    page: 1,
    limit: 48,
  });
  const base = "https://gateway.marvel.com/";
  let apiVariables = `?offset=${
    (showVars.page - 1) * showVars.limit
  }&limit=48&apikey=bac0261e17798de947618f7e19ad79db`;

  const fetcher = (url) => {
    // console.log("axios", apiVariables);
    axios.get(base + url + apiVariables).then((res) => res.data.data);
  };
  const { data, error } = useSWR("v1/public/characters", fetcher);

  return (
    <p>
      {console.log("render")}
      {!data && !error && <p>Loading</p>}
      {error && <p>error</p>}
      {data && (
        <>
          {console.log("render data")}
          <Select
            placeholder="Go to page"
            mb={5}
            onChange={(e) => {
              setShowVars((showVars) => ({
                ...showVars,
                page: e.target.value,
              }));

              console.log("apiVariables", apiVariables);
              console.log("showVars", showVars);
              // mutate("v1/public/characters");
              mutate();
              console.log("after mutate");
            }}
          >
            {[...Array(Math.ceil(data.total / showVars.limit))].map((a, i) => (
              <option key={"page_" + i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={5}>
            {data.results.map((hero) => (
              <Box key={hero.id}>
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
                </Link>
                <Text>{hero.name}</Text>
              </Box>
            ))}
          </SimpleGrid>
          {/* {[...Array(Math.ceil( data.total/48 ))].map((a, i) => <p>{i}</p>)} */}
        </>
      )}
    </p>
  );
};
