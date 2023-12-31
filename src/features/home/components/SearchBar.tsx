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
import { homeActions, selectSearch } from "../home.slice";
import { AntDesign, Feather } from "@expo/vector-icons";

export const SearchBar: React.FC = () => {
  const search = useAppSelector(selectSearch);
  const [inputIsShwoing, setInputIsShowing] = useState(false);

  const dispatch = useAppDispatch();

  const handleChange = (value: string): void => {
    dispatch(homeActions.setSearch(value));
  };
  const closeInput = () => {
    setInputIsShowing(false);
  };

  return inputIsShwoing ? (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Input size="sm">
        <InputIcon marginLeft="$1">
          <Feather name="search" size={20} color="white" />
        </InputIcon>
        <InputField
          placeholder="Pesquisar..."
          color="white"
          value={search}
          w="$full"
          onChangeText={handleChange}
        />

        {search.length > 0 && (
          <InputIcon
            mr="$1"
            onPress={() => {
              closeInput();
              dispatch(homeActions.setSearch(""));
            }}
          >
            <AntDesign name="close" size={20} color="white" />
          </InputIcon>
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
        <ButtonIcon
          as={() => <Feather name="search" size={20} color="white" />}
        ></ButtonIcon>
      </Button>
    </Box>
  );
};
