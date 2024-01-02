import { Box, Center, Heading, Spinner } from "@gluestack-ui/themed";
import { Card } from "./Card";
import React, { useCallback, useMemo } from "react";
import { useAppSelector } from "@store/index";
import { selectSearch } from "../home.slice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFetchAllWorksUnreadQuery } from "@services/okami";
import { compareDesc } from "date-fns";
import { FlatList } from "react-native";
import { type HomeRoutesParams } from "@routes/home.routes";

const EmptyList = ({ isLoading }: { isLoading: boolean }) => (
  <Box h="$full" mt="$10">
    <Center flex={1}>
      {isLoading ? (
        <Spinner size="large" color="$secondary100" />
      ) : (
        <Heading size="sm" color="$secondary100">
          Novas atualizações aparecerão aqui 📖...
        </Heading>
      )}
    </Center>
  </Box>
);

export const WorkList: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeRoutesParams>>();

  const { data: works, refetch, isFetching } = useFetchAllWorksUnreadQuery(null);

  const search = useAppSelector(selectSearch);

  const filteredWorks = useMemo(
    () =>
      works
        ?.filter((work) => work.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => compareDesc(new Date(a.updatedAt), new Date(b.updatedAt))),
    [works, search]
  );

  useFocusEffect(
    useCallback(() => {
      void refetch();
    }, [])
  );

  return (
    <FlatList
      ListEmptyComponent={<EmptyList isLoading={isFetching} />}
      onRefresh={refetch}
      refreshing={isFetching}
      style={{ marginBottom: 50, marginTop: 8 }}
      contentContainerStyle={{ paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
      data={filteredWorks}
      renderItem={({ item }) => (
        <Card
          onClickCard={() => {
            navigation.push("UpdateWorkPage", { workId: item.id });
          }}
          onClickMarRead={() => {
            navigation.push("UpdateChapter", {
              chapter: item.chapter,
              workId: item.id,
            });
          }}
          data={item}
        />
      )}
      ItemSeparatorComponent={() => <Box my="$2" />}
      keyExtractor={(item) => item.id}
    />
  );
};
