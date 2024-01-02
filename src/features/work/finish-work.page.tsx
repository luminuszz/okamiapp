import React from "react";
import Container from "@components/Container";
import {
  Button,
  ButtonText,
  Center,
  ChevronDownIcon,
  Heading,
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  VStack,
} from "@gluestack-ui/themed";
import { useFetchAllWorksReadQuery, useMarkWorkFinishedMutation } from "@services/okami";
import { useAppToast } from "@components/Toast";
import { type BottonTabRoute } from "@routes/app.routes";

type Props = BottonTabRoute<"FinishWork">;

const FinishWorkPage: React.FC<Props> = ({ navigation }) => {
  const [selectedWork, setSelectedWork] = React.useState<string | null>(null);
  const toast = useAppToast();

  const { data: works, isLoading } = useFetchAllWorksReadQuery(null);

  const [finishWork, { isLoading: isMutating }] = useMarkWorkFinishedMutation();

  const handleFinishWork = () => {
    if (!selectedWork) return;

    finishWork({ id: selectedWork })
      .unwrap()
      .then(() => {
        toast.show("Obra finalizada com sucesso", "success");
        navigation.navigate("Home");
      })
      .catch(() => {
        toast.show("Erro ao finalizar obra", "error");
      });
  };

  console.log(selectedWork);

  return (
    <Container>
      <Center>
        <Heading size="lg" color="$secondary100">
          Finalizar obra
        </Heading>
      </Center>

      <Center mt="$10">
        <VStack space="sm" w="$full">
          <Select
            onValueChange={(value) => {
              setSelectedWork(value);
            }}
          >
            <SelectTrigger variant="outline" size="md">
              <SelectInput color="$secondary200" placeholder="Seleciona a obra" />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>

                {works?.map((work) => (
                  <SelectItem key={work.id} isDisabled={work.isFinished} label={work.name} value={work.id} />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>

          <Button
            isDisabled={isLoading || isMutating || !selectedWork}
            mt="$4"
            onPress={() => {
              handleFinishWork();
            }}
          >
            <ButtonText>Finalizar</ButtonText>
          </Button>
        </VStack>
      </Center>
    </Container>
  );
};

export default FinishWorkPage;
