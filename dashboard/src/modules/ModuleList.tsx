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
  ResourceContextProvider,
} from "react-admin";
import { DOMAIN_URL_PARAM, MODULO_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const ListActions = () => (
  <TopToolbar>
    <CreateModuleButton />
    <ExportButton />
  </TopToolbar>
);
const ModuleFilters = [<TextInput label="Search" source="name" alwaysOn />];
export const ModuleList = () => {
  const params = useParams();
const domainId =params.domainId;
const learningScenarioId = params.learningScenarioId;
console.log(domainId,learningScenarioId);
  const translate = useTranslate();
  return (
    <ResourceContextProvider value="modules">
    <List empty={<Empty />} actions={<ListActions />} filters={ModuleFilters} queryOptions={{ meta: { domainId, learningScenarioId} }}>
      <Datagrid>
        <ModuleButton></ModuleButton>
        <EditModuleButton />
        <ShowModuleButton />
      </Datagrid>
    </List>
    </ResourceContextProvider>
  );
};
const ModuleButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  if (!record) return null;
  return (
    <>
      <Button
        label={record.title}
        onClick={() => {
          redirect(`/modules/d/${domainId}/s/${learningScenarioId}/m/${record.id}`);
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

const EditModuleButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/m/${record.id}/edit`;
  if (!record)
      return null;
  return (
      <>
          <EditButton  to={to}></EditButton>
      </>
  );

};

const ShowModuleButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/m/${record.id}`;
   if (!record)
      return null;
  return (
      <>
            <ShowButton to={to}></ShowButton>
      </>
  );
};
const CreateModuleButton = () => {
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/create`;
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
  const learningScenarioId = params.learningScenarioId;
const to = `/modules/d/${domainId}/s/${learningScenarioId}/create`;
  return (<Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
      {translate('resources.modulo.empty')}
      </Typography>
      <Typography variant="body1">
      {translate('resources.modulo.addOne')}
      </Typography>
      <CreateButton to={to}/>
  </Box>)
};