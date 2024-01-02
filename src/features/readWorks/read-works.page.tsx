import Container from "@components/Container";
import { Navbar } from "@components/Navbar";
import { WorkList } from "@components/WorkList";
import { SearchBar } from "@features/home/components/SearchBar";
import { selectSearch, setSearch } from "@features/home/home.slice";
import { VStack } from "@gluestack-ui/themed";
import { useFetchAllWorksReadQuery } from "@services/okami";
import { useAppDispatch, useAppSelector } from "@store/index";
import { compareDesc } from "date-fns";
import React, { useEffect, useMemo } from "react";

const ReadWorksList = (props) => {
  const { data = [], isFetching, isLoading, refetch } = useFetchAllWorksReadQuery(null);

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

export default ReadWorksList;
