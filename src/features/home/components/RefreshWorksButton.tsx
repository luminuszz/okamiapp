import { useAppToast } from "@components/Toast";
import { EvilIcons } from "@expo/vector-icons";
import { Button, ButtonIcon, Spinner } from "@gluestack-ui/themed";
import { okamiService } from "@services/okami/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

export const RefreshWorksButton: React.FC = () => {
  const toast = useAppToast();

  const {
    status,
    isLoading: isRefreshingWorks,
    refetch,
  } = useQuery({
    queryKey: ["refreshWorks"],
    queryFn: () => okamiService.refreshWorks,
    enabled: false,
  });

  useEffect(() => {
    if (status === "success") {
      toast.show("Obras sendo atualizadas", "success");
    }

    if (status === "error") {
      toast.show("Erro ao atualizar obras", "error");
    }
  }, [status]);

  return isRefreshingWorks ? (
    <Spinner color="gray.100" size="large" />
  ) : (
    <Button size="xs" bgColor="transparent" isDisabled={isRefreshingWorks} onPress={async () => await refetch()}>
      <ButtonIcon as={() => <EvilIcons name="refresh" size={40} color="white" />}></ButtonIcon>
    </Button>
  );
};
