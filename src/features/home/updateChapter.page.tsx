import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import { Box, Button, ButtonIcon, ButtonSpinner, ButtonText, Heading, HStack, Input, InputField, VStack } from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";
import { useAppToast } from "@components/Toast";
import { type HomeRoute } from "@routes/home.routes";
import { useMutation } from "@tanstack/react-query";
import { okamiService } from "@services/okami/api";

interface Props extends HomeRoute<"UpdateChapter"> {}

const UpdateChapterPage: React.FC<Props> = ({ route, navigation }) => {
  const { chapter: currentChapter, workId } = route.params;
  const [chapter, setChapter] = useState(currentChapter.toString());

  const toast = useAppToast();

  const { mutate: markAsRead, status, isPending } = useMutation({ mutationFn: okamiService.markWorkRead, mutationKey: ["markWorkRead"] });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleMarkAsRead = () => {
    markAsRead({ id: workId, chapter: Number(chapter) });
  };

  useEffect(() => {
    if (status === "success") {
      navigation.push("HomeScreen");
      toast.show("Marcado como lido", "success");
    }

    if (status === "error") {
      toast.show("Houve um erro ao marcar como lido", "error");
    }
  }, [status]);

  return (
    <Container>
      <Box mt="$10" px="$4">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading color="$secondary100" justifyContent="center">
            Marcar como lido
          </Heading>

          <Button onPress={handleGoBack} bgColor="transparent">
            <ButtonIcon as={() => <AntDesign name="arrowleft" size={24} color="white" />} />
          </Button>
        </HStack>

        <VStack mt="$10" space="lg">
          <Input>
            <InputField
              onChangeText={(text: string) => {
                setChapter(text);
              }}
              value={chapter}
              type="text"
              keyboardType="number-pad"
              placeholder="Pesquise"
              color="white"
              w="$full"
              height={40}
            />
          </Input>
          <Button onPress={handleMarkAsRead} isDisabled={isPending} backgroundColor="$green500">
            {isPending ? (
              <ButtonSpinner mr="$1" />
            ) : (
              <ButtonText fontWeight="$medium" fontSize="$sm">
                Marcar
              </ButtonText>
            )}
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default UpdateChapterPage;
