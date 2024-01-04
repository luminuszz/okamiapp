import React, { useEffect, useMemo } from "react";

import { Navbar } from "@components/Navbar";
import { SearchBar } from "@features/home/components/SearchBar";
import { VStack } from "@gluestack-ui/themed";
import { type HomeRoute } from "@routes/home.routes";
import { okamiService } from "@services/okami/api";
import { clearSearchInputAtom, searchInputAtom } from "@store/searchInput";
import { useQuery } from "@tanstack/react-query";
import { compareDesc } from "date-fns";
import { useAtomValue, useSetAtom } from "jotai";
import Container from "../../components/Container";
import { WorkList } from "../../components/WorkList";

interface Props extends HomeRoute<"HomeScreen"> {}

const HomePage: React.FC<Props> = () => {
  const {
    data = [],
    isFetching,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["works", "unread"],
    queryFn: async () => await okamiService.fetchAllWorks({ filter: "unread" }),
  });

  const search = useAtomValue(searchInputAtom);
  const clearInput = useSetAtom(clearSearchInputAtom);

  const filteredWorks = useMemo(
    () =>
      data
        ?.filter((work) => work.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => compareDesc(new Date(a.updatedAt), new Date(b.updatedAt))),
    [data, search]
  );

  useEffect(() => {
    return () => {
      clearInput();
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
