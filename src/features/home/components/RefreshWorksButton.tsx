import React, { useEffect } from "react";
import { useLazyRefreshWorksQuery } from "@services/okami";
import { Button, ButtonIcon, Spinner } from "@gluestack-ui/themed";
import { EvilIcons } from "@expo/vector-icons";
import { useAppToast } from "@components/Toast";

export const RefreshWorksButton: React.FC = () => {
  const toast = useAppToast();

  const [refreshWorks, { isLoading: isRefreshingWorks, isSuccess }] = useLazyRefreshWorksQuery();

  const handleRefreshWorks = (): void => {
    void refreshWorks(undefined);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.show("Obras sendo atualizadas", "success");
    }
  }, [isSuccess]);

  return isRefreshingWorks ? (
    <Spinner color="gray.100" size="large" />
  ) : (
    <Button size="xs" bgColor="transparent" isDisabled={isRefreshingWorks} onPress={handleRefreshWorks}>
      <ButtonIcon as={() => <EvilIcons name="refresh" size={40} color="white" />}></ButtonIcon>
    </Button>
  );
};
