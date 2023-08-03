"use client";

import { Button } from "@/components/ui/button";
import axios, { AxiosResponse } from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

type SubscriptionButtonProps = {
  isPro: boolean;
};

export const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);

    try {
      const response: AxiosResponse<{ url: string }> = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button disabled={isLoading} onClick={onClick} variant={isPro ? "default" : "premium"}>
      {isPro ? "Manage Subscriptions" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
