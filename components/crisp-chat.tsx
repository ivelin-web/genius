"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("938bd4c5-dc81-48ad-9d8f-f93bfbf81462");
  }, []);

  return null;
};
