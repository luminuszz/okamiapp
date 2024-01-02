import React, { useEffect } from "react";

import { Navbar } from "@components/Navbar";
import { SearchBar } from "@features/home/components/SearchBar";
import { VStack } from "@gluestack-ui/themed";
import { type HomeRoute } from "@routes/home.routes";
import { useAppDispatch } from "@store/index";
import Container from "../../components/Container";
import { WorkList } from "./components/WorkList";
import { homeActions } from "./home.slice";

interface Props extends HomeRoute<"HomeScreen"> {}

const HomePage: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    homeActions.setSearch("");

    return () => {
      dispatch(homeActions.setSearch(""));
    };
  }, []);

  return (
    <Container>
      <Navbar />

      <VStack space="xl" mt="$10">
        <SearchBar />
        <WorkList />
      </VStack>
    </Container>
  );
};

export default HomePage;
