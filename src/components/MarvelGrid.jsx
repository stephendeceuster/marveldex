import React from "react";
import axios from "axios";
import useSWR from "swr";
import slugify from "slugify";
import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const MarvelGrid = () => {
  const base = "https://gateway.marvel.com/";
  const key = "?limit=48&apikey=bac0261e17798de947618f7e19ad79db";
  const fetcher = (url) =>
    axios.get(base + url + key).then((res) => res.data.data);
  const { data, error } = useSWR("v1/public/characters", fetcher);

//   const pages = Math.ceil(data.total/48);
//   console.log(pages);

  return (
    <>
      {!data && !error && <p>Loading</p>}
      {error && <p>error</p>}
      {data && (<>
        <SimpleGrid columns={3} spacing={10}>
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
    </>
  );
};
