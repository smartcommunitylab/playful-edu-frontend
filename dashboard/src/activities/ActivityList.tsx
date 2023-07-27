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
  useRedirect,
  useRecordContext,
  BooleanField,
} from "react-admin";
import { useSearchParams } from "react-router-dom";
import { DOMAIN_URL_PARAM } from "../constants";

const ListActions = () => (
  <TopToolbar>
    <CreateActivityButton />
    <ExportButton />
  </TopToolbar>
);
const ActivityFilters = [<TextInput label="Search" source="name" alwaysOn />];
export const ActivityList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const translate = useTranslate();
  return (
    <List
      actions={<ListActions />}
      filters={ActivityFilters}
      queryOptions={{ meta: { domainId } }}
    >
      <Datagrid>
        <ActivityButton></ActivityButton>
        <EditActivityButton />
        <ShowActivityButton />
      </Datagrid>
    </List>
  );
};
const ActivityButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const [gameId, setGameId] = useStore("Activity.selected");
  if (!record) return null;
  return (
    <>
      <TextField source="title" />
      <TextField source="desc" />
      <BooleanField source="group" />
    </>
  );
};

const EditActivityButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const to = `/activities/${record.id}/edit?${DOMAIN_URL_PARAM}=${domainId}`;
  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowActivityButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const to = `/activities/${record.id}/show?${DOMAIN_URL_PARAM}=${domainId}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};
const CreateActivityButton = () => {
  const record = useRecordContext();
  const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const to = `/activities/create?${DOMAIN_URL_PARAM}=${domainId}`;
  if (!record) return null;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};
