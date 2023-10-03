import { createContext, useContext } from "react";
import { Identifier } from "react-admin";

interface ModuleContextValue {
  onRowClick: (e: any, fragmentId: Identifier) => void;
}

export const ModuleContext = createContext<ModuleContextValue | undefined>(undefined);

export const useModuleContex = () => {
  const moduleContext = useContext(ModuleContext);
  if (moduleContext === undefined) {
    throw new Error("useModuleContext must be inside a provider");
  }
  return moduleContext;
};
