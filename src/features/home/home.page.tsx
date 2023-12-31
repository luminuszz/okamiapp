import React, { useEffect, useMemo } from "react";

import { Navbar } from "@components/Navbar";
import { SearchBar } from "@features/home/components/SearchBar";
import { VStack } from "@gluestack-ui/themed";
import { type HomeRoute } from "@routes/home.routes";
import Container from "../../components/Container";
import { WorkList } from "../../components/WorkList";
import { useAppDispatch, useAppSelector } from "@store/index";
import { useFetchAllWorksUnreadQuery } from "@services/okami";
import { selectSearch, setSearch } from "./home.slice";
import { compareDesc } from "date-fns";

interface Props extends HomeRoute<"HomeScreen"> {}

const HomePage: React.FC<Props> = () => {
  const { data = [], isFetching, isLoading, refetch } = useFetchAllWorksUnreadQuery(null);

  const appDispatch = useAppDispatch();

  const search = useAppSelector(selectSearch);

  const filteredWorks = useMemo(
    () =>
      data
        ?.filter((work) => work.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => compareDesc(new Date(a.updatedAt), new Date(b.updatedAt))),
    [data, search]
  );

  useEffect(() => {
    return () => {
      appDispatch(setSearch(""));
    };
  }, []);

  return (
    <Container>
      <Navbar />
      <VStack space="xl" mt="$10">
        <SearchBar />
        <WorkList works={filteredWorks} retry={refetch} isLoading={isFetching || isLoading} />
      </VStack>
    </Container>
  );
};

export default HomePage;
