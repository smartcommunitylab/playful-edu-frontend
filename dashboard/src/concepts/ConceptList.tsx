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
import { ImportButton } from "react-admin-import-csv";
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from "react-router-dom";
import { Box, Typography } from '@mui/material';
const ListActions = () => (
  <TopToolbar>
    <CreateConceptButton />
    <ExportButton />
    <ImportButton />
  </TopToolbar>
);
const conceptFilters = [<TextInput label="Search" source="title" alwaysOn />];
export const ConceptList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const translate = useTranslate();
  return (
    <List
    empty={<Empty />}
      actions={<ListActions />}
      filters={conceptFilters}
      queryOptions={{ meta: { domainId } }}
    >
      <Datagrid>
        <TextField source="title" />
        <EditConceptButton />
        <ShowConceptButton />
      </Datagrid>
    </List>
  );
};

const EditConceptButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const to = `/concepts/${record.id}/edit?${DOMAIN_URL_PARAM}=${domainId}`;
  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowConceptButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const to = `/concepts/${record.id}/show?${DOMAIN_URL_PARAM}=${domainId}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};

const CreateConceptButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const to = `/concepts/create?${DOMAIN_URL_PARAM}=${domainId}`;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};
const Empty = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const translate = useTranslate();
const to = `/concepts/create?${DOMAIN_URL_PARAM}=${domainId}`;
  return (<Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
      {translate('resources.educator.empty')}
      </Typography>
      <Typography variant="body1">
      {translate('resources.educator.addOne')}
      </Typography>
      <CreateButton to={to}/>
  </Box>)
};