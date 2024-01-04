import React from "react";

import { Box, Center, Heading, Spinner } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { type Work } from "@services/okami/types";
import { FlatList } from "react-native";
import { Card } from "../features/home/components/Card";

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

interface Props {
  works: Work[];
  isLoading: boolean;
  retry: () => void;
}

export const WorkList: React.FC<Props> = ({ isLoading, works, retry }) => {
  const navigation = useNavigation<any>();

  return (
    <FlatList
      ListEmptyComponent={<EmptyList isLoading={false} />}
      onRefresh={retry}
      refreshing={isLoading}
      style={{ marginBottom: 50, marginTop: 8 }}
      contentContainerStyle={{ paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
      data={works}
      renderItem={({ item }) => (
        <Card
          onClickCard={() => {
            navigation.navigate("Home", {
              screen: "UpdateWorkPage",
              params: { workId: item.id },
              initial: false,
            });
          }}
          onClickMarRead={() => {
            navigation.navigate("Home", {
              screen: "UpdateChapter",
              params: { workId: item.id, chapter: item.chapter },
              initial: false,
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
