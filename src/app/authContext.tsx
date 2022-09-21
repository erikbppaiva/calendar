import React from "react";
import { IUser } from "./backend";

export const userContext = React.createContext<IUser>({
  name: "Anonimos",
  calendarId: 0,
  date: "",
  desc: "",
  email: "",
});
export const singOutContext = React.createContext<() => void>(() => {});
