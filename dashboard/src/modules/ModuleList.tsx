import {
  List,
  Datagrid,
  TextField,
  TopToolbar,
  CreateButton,
  ExportButton,
  EditButton,
  ShowButton,
  TextInput,
  useTranslate,
  useStore,
  Button,
  useRedirect,
  useRecordContext,
  DateField,
} from "react-admin";
import { DOMAIN_KEY, MODULO_KEY, SCENARIO_KEY } from "../constants";

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);
const ModuleFilters = [<TextInput label="Search" source="name" alwaysOn />];
export const ModuleList = ({scenarioId}:{scenarioId:string}) => {
  const [domainId] = useStore(DOMAIN_KEY);
  const [storeLearningScenarioId] = useStore(SCENARIO_KEY);
  const learningScenarioId=scenarioId?scenarioId:storeLearningScenarioId;
  const translate = useTranslate();
  return (
    <List actions={<ListActions />} filters={ModuleFilters} queryOptions={{ meta: { domainId, learningScenarioId} }}>
      <Datagrid>
        <ModuleButton></ModuleButton>
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  );
};
const ModuleButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const [gameId, setModuleId] = useStore(MODULO_KEY);
  
  if (!record) return null;
  return (
    <>
      <Button
        label={record.title}
        onClick={() => {
          setModuleId(record.id);
          redirect("/modules/" + record.id + "/show");
        }}
      ></Button>
      <TextField source="desc" />
      <TextField source="level" />
      <TextField source="language" />
      <DateField source="dateFrom" />
      <DateField source="dateFrom" />
    </>
  );
};
