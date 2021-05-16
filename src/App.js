import React from "react";
// import { Flex, Heading, IconButton, Input } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MarvelGrid } from "./components/MarvelGrid";
import { MarvelCharacter } from "./components/MarvelCharacter";
import "./App.css";

const App = () => {
  // const base = "https://gateway.marvel.com/";
  // const key = "?limit=48&apikey=bac0261e17798de947618f7e19ad79db";

  // const fetcher = (url) =>
  //   axios.get(base + url + key).then((res) => res.data.data);

  // //  axios.get('https://gateway.marvel.com/v1/public/characters?apikey=bac0261e17798de947618f7e19ad79db').then(resp => console.log(resp));
  // const { data, error } = useSWR("v1/public/characters", fetcher);

  // console.log(data);

  return (
    <Router>
      <Heading fontSize="xl" mb={5}>Marveldex</Heading>
      
        {/* <form>
          <Flex mb="3rem">
            <Input type="text" w="calc(100% - 4rem)" h="3rem" mr="auto" />
            <IconButton
              w="3rem"
              h="3rem"
              aria-label="Search database"
              icon={<SearchIcon />}
            />
          </Flex>
        </form> */}
      
      <Switch>
        <Route exact path="/">
          <MarvelGrid />
        </Route>
        <Route path="/:id/:name">
          <MarvelCharacter />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
