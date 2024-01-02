import Container from "@components/Container";
import Input from "@components/Input";
import { useAppToast } from "@components/Toast";
import { AntDesign } from "@expo/vector-icons";
import {
  Badge,
  BadgeText,
  Box,
  Button,
  ButtonSpinner,
  ButtonText,
  Center,
  FormControl,
  FormControlLabelText,
  Heading,
  HStack,
  Image,
  Pressable,
  Spinner,
  VStack,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { type HomeRoute } from "@routes/home.routes";
import { useGetOneWorkQuery, useUpdateWorkMutation } from "@services/okami";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props extends HomeRoute<"UpdateWorkPage"> {}

const schema = z.object({
  name: z.string().min(3),
  chapter: z.string().min(1).or(z.number().min(1)).transform(Number),
  url: z.string().url(),
});

type FormValues = typeof schema._input;

const UpdateWorkPage: React.FC<Props> = ({ navigation, route }) => {
  const toast = useAppToast();
  const { workId } = route.params;

  const [mutateWork, { isLoading: isEditingWork }] = useUpdateWorkMutation();

  const { data: work, isLoading } = useGetOneWorkQuery(workId);

  console.log({ route });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: {
      url: work?.url ?? "",
      chapter: String(work?.chapter) ?? "",
      name: work?.name ?? "",
    },
  });

  const handleEditWork = (values: FormValues) => {
    void mutateWork({
      id: workId,
      data: {
        name: values.name,
        chapter: 10000,
        url: values.url,
      },
    })
      .unwrap()
      .then(() => {
        toast.show("Obra atualizada com sucesso!", "success");
        navigation.goBack();
      })
      .catch(() => {
        toast.show("houve um erro ao atualizar a obra", "error");
      });
  };

  if (isLoading) {
    return (
      <Container>
        <Center>
          <Spinner />
        </Center>
      </Container>
    );
  }

  return (
    <Container>
      <Box px="$5">
        <HStack mt="$5" justifyContent="space-between">
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={30} color="white" />
          </Pressable>

          <Heading size="sm" color="$white">
            Detalhes da Obra
          </Heading>

          <AntDesign color="white" name="sharealt" size={24} />
        </HStack>

        <VStack mt="$10" space="md">
          <Box position="relative">
            <Image
              alt={work?.name}
              resizeMode="cover"
              borderRadius={"$3xl" as any}
              w="$full"
              h={200}
              source={{
                uri: work?.imageUrl ?? "https://okami-storage.s3.amazonaws.com/work-images/animes-default.jpg",
              }}
            />

            <Badge
              borderRadius="$2xl"
              px="$5"
              m="$2"
              left="$3"
              bottom="$3"
              position="absolute"
              size="md"
              variant="outline"
              action="info"
            >
              <BadgeText textTransform="none">{work?.category}</BadgeText>
            </Badge>
          </Box>

          <Center>
            <Heading textAlign="center" size="md" color="white">
              {work?.name}
            </Heading>
          </Center>

          <FormControl size="sm">
            <FormControlLabelText mb="$1" color="$secondary100">
              Titulo
            </FormControlLabelText>

            <Input color="$secondary200" control={control} name="name" />
          </FormControl>

          <FormControl size="sm">
            <FormControlLabelText mb="$1" color="$secondary100">
              Capítulo
            </FormControlLabelText>

            <Input color="$secondary200" control={control} name="chapter" keyboardType="number-pad" />
          </FormControl>

          <FormControl size="sm">
            <FormControlLabelText mb="$1" color="$secondary100">
              URL
            </FormControlLabelText>

            <Input color="$secondary200" keyboardType="url" control={control} name="url" />
          </FormControl>

          <Button isDisabled={!isValid} mt="$4" onPress={handleSubmit(handleEditWork)}>
            {isEditingWork ? <ButtonSpinner /> : <ButtonText>Editar</ButtonText>}
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default UpdateWorkPage;
