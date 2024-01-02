import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonIcon,
  Input,
  InputField,
  InputIcon,
} from "@gluestack-ui/themed";
import { useAppDispatch, useAppSelector } from "@store/index";
import { setSearch, selectSearch } from "../home.slice";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";

export const SearchBar: React.FC = () => {
  const [inputIsShwoing, setInputIsShowing] = useState(false);

  const search = useAppSelector(selectSearch);

  const dispatch = useAppDispatch();

  const handleChange = (value: string): void => {
    dispatch(setSearch(value));
  };

  const closeInput = () => {
    setInputIsShowing(false);
  };

  return inputIsShwoing ? (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Input size="sm">
        <InputIcon marginLeft="$1" as={<Feather name="search" size={20} color="white" />} />
        <InputField placeholder="Pesquisar..." color="white" value={search} w="$full" onChangeText={handleChange} />

        {search.length > 0 && (
          <Pressable
            onPress={() => {
              closeInput();
              dispatch(setSearch(""));
            }}
          >
            <InputIcon as={<AntDesign name="close" size={20} color="white" />} mr="$1" />
          </Pressable>
        )}
      </Input>
    </Box>
  ) : (
    <Box flex={1} justifyContent="center" alignItems="flex-start">
      <Button
        bgColor="transparent"
        onPress={() => {
          setInputIsShowing(true);
        }}
      >
        <ButtonIcon as={() => <Feather name="search" size={20} color="white" />}></ButtonIcon>
      </Button>
    </Box>
  );
};
