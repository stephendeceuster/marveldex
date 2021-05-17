import React, { useState } from "react";
// import { Flex, Heading, IconButton, Input } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MarvelGrid } from "./components/MarvelGrid";
import { MarvelCharacter } from "./components/MarvelCharacter";
import "./App.css";

const App = () => {
  const [showVars, setShowVars] = useState({
    page: 1,
    limit: 48,
  });

  return (
    <Router>
      <Heading fontSize="xl" mb={5}>
        Marveldex
      </Heading>

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
          <MarvelGrid showVars={showVars} setShowVars={setShowVars}/>
        </Route>
        <Route path="/:id/:name">
          <MarvelCharacter />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
