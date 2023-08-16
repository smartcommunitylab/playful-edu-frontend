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
  ResourceContextProvider,
} from "react-admin";
import { ImportButton } from "react-admin-import-csv";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { Box, Typography } from '@mui/material';
const ListActions = () => (
  <TopToolbar>
    <CreateConceptButton />
    <ExportButton />
    <ImportButton />
  </TopToolbar>
);
const conceptFilters = [<TextInput label="Search" source="title" alwaysOn />];

export const ConceptList =() => {
  const params = useParams();
  return (
  <ResourceContextProvider value="concepts">
      <List empty={<Empty />} actions={<ListActions/>} filter={{ domainId:params.domainId}}  queryOptions={{ meta: { domainId:params.domainId } }}>
      <Datagrid>
      <TextField source="title" />
        <EditConceptButton />
        <ShowConceptButton />
      </Datagrid>
  </List>
  </ResourceContextProvider>
  )
}



const EditConceptButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
    const domainId = params.domainId;
  const to = `/concepts/d/${domainId}/${record.id}/edit`;
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
  const params = useParams();
    const domainId = params.domainId;
  const to = `/concepts/d/${domainId}/${record.id}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};

const CreateConceptButton = () => {
  const params = useParams();
  const domainId =params.domainId;
  const to = `/concepts/d/${domainId}/create`;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};
const Empty = () => {
  const params = useParams();
  const domainId =params.domainId;
  const translate = useTranslate();
const to = `/concepts/d/${domainId}/create`;
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