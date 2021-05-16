import { useParams } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";
import { Heading, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const MarvelCharacter = () => {
  const { id } = useParams();
  const base = "https://gateway.marvel.com/";
  const key = "?apikey=bac0261e17798de947618f7e19ad79db";
  const fetcher = (url) =>
    axios.get(base + url + key).then((res) => res.data.data);
  const { data, error } = useSWR(`v1/public/characters/${id}`, fetcher);

  return (
    <>
      {!data && !error && <p>Loading</p>}
      {error && <p>error</p>}
      {data && (
        <>
          <Image
            mb={5}
            width="100%"
            borderRadius="0.5rem"
            src={`${data.results[0].thumbnail.path}/portrait_uncanny.${data.results[0].thumbnail.extension}`}
          />
          <Heading as="h1" mb={5}>
            {data.results[0].name}
          </Heading>
          <Text mb={5}>{data.results[0].description}</Text>
          <Link to="/">Back to home</Link>
        </>
      )}
    </>
  );
};
