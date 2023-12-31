import React from "react";
import { Box, Text, useToast } from "@gluestack-ui/themed";

type ToastStatus = "success" | "error" | "warning" | "info";

type ToastVariant = Record<ToastStatus, string>;

interface BaseToastProps {
  message: string;
  type: ToastStatus;
}

const toastVariants: ToastVariant = {
  error: "$red500",
  info: "$blue500",
  success: "$emerald500",
  warning: "$amber500",
};

interface UseToastType {
  show: (message: string, type: ToastStatus) => void;
}

const BaseToast: React.FC<BaseToastProps> = ({ message, type }) => {
  const colorVariant = toastVariants[type];

  return (
    <Box bg={colorVariant} px="$2" py="$1" rounded="$lg" mb={5}>
      <Text color="$secondary100">{message}</Text>
    </Box>
  );
};

export function useAppToast(): UseToastType {
  const toast = useToast();

  const show = (message: string, type: ToastStatus = "info"): void => {
    toast.show({
      render: () => <BaseToast message={message} type={type} />,
    });
  };

  return {
    show,
  };
}
