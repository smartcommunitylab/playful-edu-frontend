import { createContext, useContext } from "react";
import { Identifier, RaRecord } from "react-admin";

interface ModuleContextValue {
  onRowClick: (record: RaRecord<Identifier> | undefined) => void;
  selectedFragmentId: Identifier;
  isFragmentSingleton?: boolean | undefined;
  hideActivityList: (data: any[]) => void;
  handleFragmentListChanges: (data: any[]) => void;
  updateXArrow: () => void;
  setAreLoadingActivities: (areLoading: boolean | undefined) => void;
  isScenarioRunning?: boolean;
}

export const ModuleContext = createContext<ModuleContextValue | undefined>(
  undefined
);

export const useModuleContext = () => {
  const moduleContext = useContext(ModuleContext);
  if (moduleContext === undefined) {
    throw new Error("useModuleContext must be inside a provider");
  }
  return moduleContext;
};
