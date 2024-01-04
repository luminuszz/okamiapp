import Container from "@components/Container";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage, Box, Button, ButtonIcon, Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { type HomeRoute } from "@routes/home.routes";
import { okamiService } from "@services/okami/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface InfoProps {
  title: string;
  icon: React.ReactNode;
  quantity?: number;
}

const Info = ({ icon, title, quantity = 0 }: InfoProps) => {
  return (
    <Box alignItems="center">
      <Text size="xs" color="$secondary100">
        {title}
      </Text>
      <HStack alignItems="center" space="md">
        {icon}
        <Text fontSize="$md" color="$secondary400">
          {quantity}
        </Text>
      </HStack>
    </Box>
  );
};

interface Props extends HomeRoute<"UserDetails"> {}

const UserPage: React.FC<Props> = ({ navigation }) => {
  const { data: user } = useQuery({ queryKey: ["userDetails"], queryFn: okamiService.getCurrentUser });

  const username = user?.name ? user.name[0].toUpperCase() + user.name.substring(1) : "";

  return (
    <Container>
      <Box mt="$5" flex={1} justifyContent="flex-start" alignItems="center">
        <VStack space="md" alignItems="center">
          <Avatar size="2xl" borderRadius="$full">
            <AvatarFallbackText>{user?.name}</AvatarFallbackText>
            <AvatarImage alt="profiler" source={{ uri: user?.avatarImageUrl ?? "" }} />
            <AvatarBadge />
          </Avatar>

          <Heading size="lg" color="$secondary100">
            {username}
          </Heading>

          <Heading size="sm" color="$secondary400">
            {user?.email}
          </Heading>

          <HStack space="lg">
            <Info icon={<Feather name="eye" size={20} color="yellow" />} title="Acompanhando" quantity={user?.readingWorksCount} />
            <Info icon={<AntDesign name="check" size={20} color="green" />} title="Finalizados" quantity={user?.finishedWorksCount} />
          </HStack>

          <Button
            bgColor="transparent"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ButtonIcon as={() => <AntDesign name="arrowleft" size={30} color="white" />}></ButtonIcon>
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default UserPage;
