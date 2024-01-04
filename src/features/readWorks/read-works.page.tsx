import Container from "@components/Container";
import { Navbar } from "@components/Navbar";
import { WorkList } from "@components/WorkList";
import { SearchBar } from "@features/home/components/SearchBar";
import { VStack } from "@gluestack-ui/themed";
import { okamiService } from "@services/okami/api";
import { clearSearchInputAtom, parsedInputValueAtom } from "@store/searchInput";
import { useQuery } from "@tanstack/react-query";
import { compareDesc } from "date-fns";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useMemo } from "react";

const ReadWorksList = () => {
  const {
    data = [],
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["works", "read"],
    queryFn: async () => await okamiService.fetchAllWorks({ filter: "read" }),
  });

  const search = useAtomValue(parsedInputValueAtom);

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

export default ReadWorksList;
