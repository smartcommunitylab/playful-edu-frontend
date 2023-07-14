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
import { MODULO_KEY } from "../constants";

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);
const ModuleFilters = [<TextInput label="Search" source="name" alwaysOn />];
export const ModuleList = () => {
  const translate = useTranslate();
  return (
    <List actions={<ListActions />} filters={ModuleFilters}>
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
