import { AntDesign, Feather } from "@expo/vector-icons";
import { Box, Button, ButtonIcon, Input, InputField, InputIcon } from "@gluestack-ui/themed";
import { searchInputAtom } from "@store/searchInput";
import { useAtom } from "jotai";
import React, { useState } from "react";

export const SearchBar: React.FC = () => {
  const [inputIsShwoing, setInputIsShowing] = useState(false);

  const [searchInput, setSearchInput] = useAtom(searchInputAtom);
  const handleChange = (value: string) => {
    setSearchInput(value.trim());
  };

  const closeInput = () => {
    setInputIsShowing(false);
  };

  return inputIsShwoing ? (
    <Box flex={1} justifyContent="center" alignItems="center" pt="$5">
      <Input size="sm">
        <InputIcon marginLeft="$1">
          <Feather name="search" size={20} color="white" />
        </InputIcon>
        <InputField placeholder="Pesquisar..." color="white" value={searchInput} w="$full" onChangeText={handleChange} />

        {searchInput.length > 0 && (
          <InputIcon
            mr="$1"
            onPress={() => {
              closeInput();
              setSearchInput("");
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
        <ButtonIcon as={() => <Feather name="search" size={20} color="white" />}></ButtonIcon>
      </Button>
    </Box>
  );
};
