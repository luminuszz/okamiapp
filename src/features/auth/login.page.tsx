import Container from "@components/Container";
import { useAppToast } from "@components/Toast";
import {
  Button,
  ButtonSpinner,
  ButtonText,
  Center,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Image,
  Input,
  InputField,
  VStack,
} from "@gluestack-ui/themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { type AuthRoute } from "@routes/auth.routes";
import { storageService } from "@services/localstorage";
import { useLoginMutation } from "@services/okami";
import { useAppDispatch } from "@store/index";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { setToken } from "./auth.slice";

const formSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6).max(100),
});

type FormSchema = z.infer<typeof formSchema>;

const loginImage = "https://raw.githubusercontent.com/luminuszz/okami/master/images/okami-logo.png";

interface Props extends AuthRoute<"LoginPage"> {}

const LoginPage: React.FC<Props> = () => {
  const { show } = useAppToast();
  const [makeLogin, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: FormSchema): void => {
    makeLogin(data)
      .unwrap()
      .then(async ({ token }) => {
        if (token) {
          dispatch(setToken(token));

          await storageService.multiSet([
            ["token", token],
            ["email", data.email],
          ]);
        }

        show("Login feito com sucesso", "success");
      })
      .catch((error) => {
        console.log({ error });
        show("Houve um erro ao tentar fazer login", "error");
      });
  };

  return (
    <Container>
      <Center w="$full" h="$full">
        <VStack px="$5" space="lg" width="$full">
          <Center>
            <Image
              borderRadius={"$full" as any}
              backgroundColor="$secondary200"
              source={{
                uri: loginImage,
              }}
              alt="Okami iamge"
              size="xl"
            />
          </Center>

          <Center mt="$4">
            <Heading color="$secondary200">Okami</Heading>
          </Center>

          <FormControl size="sm">
            <FormControlLabel mb="$1">
              <FormControlLabelText color="$secondary100">E-mail</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <Controller
                render={({ field }) => (
                  <InputField
                    {...field}
                    fontSize="$xs"
                    color="$secondary50"
                    type="text"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    onChangeText={field.onChange}
                  />
                )}
                name="email"
                control={control}
              />
            </Input>
          </FormControl>

          <FormControl size="sm">
            <FormControlLabel mb="$1">
              <FormControlLabelText color="$secondary100">Senha</FormControlLabelText>
            </FormControlLabel>

            <Controller
              render={({ field }) => (
                <Input>
                  <InputField
                    fontSize="$xs"
                    placeholder="Senha"
                    color="$secondary50"
                    {...field}
                    onChangeText={field.onChange}
                  />
                </Input>
              )}
              name="password"
              control={control}
            />
          </FormControl>

          <Button onPress={handleSubmit(handleLogin)} isDisabled={isLoading || !isValid} bgColor="$darkBlue600">
            {isLoading ? (
              <ButtonSpinner mr="$1" />
            ) : (
              <ButtonText fontWeight="$medium" fontSize="$sm">
                Login
              </ButtonText>
            )}
          </Button>
        </VStack>
      </Center>
    </Container>
  );
};

export default LoginPage;
