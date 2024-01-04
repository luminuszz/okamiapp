import Container from "@components/Container";
import { useAppToast } from "@components/Toast";
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
import { type BottonTabRoute } from "@routes/app.routes";
import { okamiService } from "@services/okami/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { filter } from "lodash";
import React, { useEffect } from "react";

type Props = BottonTabRoute<"FinishWork">;

const FinishWorkPage: React.FC<Props> = ({ navigation }) => {
  const [selectedWork, setSelectedWork] = React.useState<string | null>(null);
  const toast = useAppToast();

  const { data: works, isLoading } = useQuery({
    queryKey: ["works", "read"],
    queryFn: async () => await okamiService.fetchAllWorks({ filter: "read" }),
    select: (data) => filter(data, { isFinished: false }),
  });

  const {
    mutate: finishWork,
    isPending,
    status,
  } = useMutation({
    mutationKey: ["markWorkFinished"],
    mutationFn: okamiService.markWorkFinished,
  });

  const handleFinishWork = () => {
    if (!selectedWork) return;

    finishWork(selectedWork);
  };

  useEffect(() => {
    if (status === "success") {
      toast.show("Obra finalizada com sucesso", "success");
      navigation.navigate("Home");
    }

    if (status === "error") {
      toast.show("Erro ao finalizar obra", "error");
    }
  }, [status]);

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

                {works?.map((work) => <SelectItem key={work.id} isDisabled={work.isFinished} label={work.name} value={work.id} />)}
              </SelectContent>
            </SelectPortal>
          </Select>

          <Button
            isDisabled={isLoading || !selectedWork || isPending}
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
