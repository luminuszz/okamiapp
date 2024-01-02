import React from "react";

import { Navbar } from "@components/Navbar";
import { SearchBar } from "@features/home/components/SearchBar";
import { VStack } from "@gluestack-ui/themed";
import { type HomeRoute } from "@routes/home.routes";
import Container from "../../components/Container";
import { WorkList } from "./components/WorkList";

interface Props extends HomeRoute<"HomeScreen"> {}

const HomePage: React.FC<Props> = () => {
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
