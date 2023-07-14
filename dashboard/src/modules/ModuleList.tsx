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
} from "react-admin";

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
  const [gameId, setGameId] = useStore("Module.selected");
  if (!record) return null;
  return (
    <>
      <Button
        label={record.title}
        onClick={() => {
          setGameId(record.id);
          redirect("/users/" + record.id + "/show");
        }}
      ></Button>
      <TextField source="description" />
      <TextField source="type" />
      <TextField source="language" />
      <TextField source="tool" />
      <TextField source="difficulty" />
    </>
  );
};
