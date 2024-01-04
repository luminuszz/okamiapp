import { MaterialIcons } from "@expo/vector-icons";
import { RefreshWorksButton } from "@features/home/components/RefreshWorksButton";
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage, Box, Button, ButtonIcon, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { type HomeRoutesParams } from "@routes/home.routes";
import { okamiService } from "@services/okami/api";
import { setTokenToNullAtom } from "@store/auth";
import { useQuery } from "@tanstack/react-query";
import { getHours } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { getCalendars } from "expo-localization";
import { useSetAtom } from "jotai";
import React from "react";
import { Pressable } from "react-native";

const currentTimezone = getCalendars()?.[0]?.timeZone ?? "";

export const Navbar: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeRoutesParams>>();
  const currentHour = getHours(utcToZonedTime(new Date(), currentTimezone));
  const logout = useSetAtom(setTokenToNullAtom);

  const { data: user } = useQuery({ queryKey: ["userDetails"], queryFn: okamiService.getCurrentUser });

  const avatarName = user?.name?.slice(0, 2)?.toUpperCase() ?? "";

  const subTitle = currentHour >= 12 ? "Boa tarde" : currentHour >= 18 ? "Boa noite" : "Bom dia";

  return (
    <Box py="$6" flexDirection="row" justifyContent="space-between">
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <HStack alignItems="center" space="md">
          <Pressable
            onPress={() => {
              navigation.navigate("UserDetails");
            }}
          >
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
      </Box>

      <HStack alignItems="center" space="xs">
        <RefreshWorksButton />
        <Button bgColor="transparent" onPress={logout}>
          <ButtonIcon as={() => <MaterialIcons name="logout" size={25} color="white" />} />
        </Button>
      </HStack>
    </Box>
  );
};
