import React from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Button,
  ButtonIcon,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useGetCurrentUserQuery } from "@services/okami";
import { getCalendars } from "expo-localization";
import { MaterialIcons } from "@expo/vector-icons";
import { getHours } from "date-fns";
import { useAppDispatch } from "@store/index";
import { logout } from "@features/auth/auth.slice";
import { utcToZonedTime } from "date-fns-tz";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeRoutesParams } from "@routes/home.routes";

const currentTimezone = getCalendars()?.[0]?.timeZone ?? "";

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<HomeRoutesParams>>();
  const currentHour = getHours(utcToZonedTime(new Date(), currentTimezone));

  const { data: user } = useGetCurrentUserQuery(null);

  const avatarName = user?.name?.slice(0, 2)?.toUpperCase() ?? "";

  const handleLogout = () => dispatch(logout());

  console.log({
    user,
  });

  const subTitle = currentHour >= 12 ? "Boa tarde" : currentHour >= 18 ? "Boa noite" : "Bom dia";

  return (
    <Box px="$2" py="$2">
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <HStack alignItems="center" space="md">
          <Pressable onPress={() => navigation.navigate("UserDetails")}>
            <Avatar borderRadius="$full">
              <AvatarFallbackText>{avatarName}</AvatarFallbackText>
              {user?.avatarImageUrl && <AvatarImage alt="avatar image" source={{ uri: user.avatarImageUrl }} />}
              <AvatarBadge />
            </Avatar>
          </Pressable>

          <VStack>
            <Text color="$secondary200" fontWeight="bold">
              {subTitle}
            </Text>
            <Text fontSize="$md" color="$secondary100" fontWeight="bold">
              {user?.name}
            </Text>
          </VStack>
        </HStack>

        <Button bgColor="transparent" onPress={handleLogout}>
          <ButtonIcon as={() => <MaterialIcons name="logout" size={25} color="white" />} />
        </Button>
      </Box>
    </Box>
  );
};
