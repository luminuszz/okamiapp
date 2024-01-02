import React from "react";
import { Input as GlueStackInput, InputField } from "@gluestack-ui/themed";
import { Controller } from "react-hook-form";
import { type TextInputProps } from "react-native";

interface Props extends TextInputProps {
  control: any;
  name: string;
  color?: string;
}

const Input: React.FC<Props> = ({ name, control, ...inputProps }) => {
  return (
    <GlueStackInput>
      <Controller
        render={({ field }) => (
          <InputField
            fontSize="$xs"
            color="$gray200"
            {...inputProps}
            {...field}
            onChangeText={field.onChange}
          />
        )}
        name={name}
        control={control}
      />
    </GlueStackInput>
  );
};

export default Input;
