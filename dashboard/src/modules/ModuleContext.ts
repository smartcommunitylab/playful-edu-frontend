import { createContext } from "react";

export const ModuleContext = createContext({
  onRowClick: (e: any, fragmentId: string) => {},
});
