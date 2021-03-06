import { Button, IButtonProps } from "@components/generic";
import { useEventEmitter } from "@utility";
import { useState } from "react";
import { appEventEmitter } from "./app";

export const LoadingLink = ({ href, ...props }: IButtonProps) => {
  const [state, setState] = useState<"idle" | "loading">("idle");

  useEventEmitter(appEventEmitter, {
    "route-changed-started": (payload) => {
      if (payload.pathname === href) {
        setState("loading");
        return;
      }

      setState("idle");
    },
    "route-changed-completed": () => {
      setState("idle");
    },
  });

  return (
    <Button
      loading={state === "loading"}
      color="inherit"
      size="large"
      href={href}
      {...props}
    />
  );
};
