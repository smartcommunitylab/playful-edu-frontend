import { createContext, useContext } from "react";
import { Identifier } from "react-admin";

interface ModuleContextValue {
  onRowClick: (fragmentId: Identifier) => void;
  selectedFragmentId: Identifier;
  hideActivityList: (data: any[]) => void;
  setInitialState: (data: any[]) => void;
  updateXArrow: () => void;
  setIsLoadingActivities: (isLoading: boolean | undefined) => void;
}

export const ModuleContext = createContext<ModuleContextValue | undefined>(
  undefined
);

export const useModuleContex = () => {
  const moduleContext = useContext(ModuleContext);
  if (moduleContext === undefined) {
    throw new Error("useModuleContext must be inside a provider");
  }
  return moduleContext;
};
