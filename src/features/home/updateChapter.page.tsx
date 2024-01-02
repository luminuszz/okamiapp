import React, { useState } from "react";
import Container from "../../components/Container";
import {
  Box,
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
  Heading,
  HStack,
  Input,
  InputField,
  VStack,
} from "@gluestack-ui/themed";
import { useMarkWorkReadMutation } from "@services/okami";
import { AntDesign } from "@expo/vector-icons";
import { useAppToast } from "@components/Toast";
import { type HomeRoute } from "@routes/home.routes";

interface Props extends HomeRoute<"UpdateChapter"> {}

const UpdateChapterPage: React.FC<Props> = ({ route, navigation }) => {
  const toast = useAppToast();

  const { chapter: currentChapter, workId } = route.params;

  const [chapter, setChapter] = useState(currentChapter.toString());

  const [markAsRead, { isLoading: isMarkingRead }] = useMarkWorkReadMutation();

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  const handleMarkAsRead = (): void => {
    markAsRead({
      chapter: Number(chapter),
      id: workId,
    })
      .unwrap()
      .then(() => {
        toast.show("Marcado como lido", "success");

        navigation.push("HomeScreen");
      })
      .catch(() => {
        toast.show("Houve um erro ao marcar como lido", "error");
      });
  };

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
          <Button onPress={handleMarkAsRead} isDisabled={isMarkingRead} backgroundColor="$green500">
            {isMarkingRead ? (
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
