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
  Button,
  ResourceContextProvider,
} from "react-admin";
import { useParams } from "react-router-dom";
import { ACTIVITY_URL_PARAM, COMPOSED_ACTIVITY_URL_PARAM, DOMAIN_URL_PARAM, FRAGMENT_URL_PARAM, MODULO_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { Box, Typography } from '@mui/material';
const ListActions = () => (
  <TopToolbar>
    <CreateActivityButton />
    <ExportButton />
  </TopToolbar>
);
const ActivityFilters = [<TextInput label="Search" source="name" alwaysOn />];
export const ActivityList = () => {
  const params = useParams();
  const domainId =params.domainId;
  const translate = useTranslate();
  return (
    <ResourceContextProvider value="activities">
    <List
    empty={<Empty />}
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
    </ResourceContextProvider>
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
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const moduleId = params.moduleId;
  const fragmentId = params.fragmentId;
  const composedActivityId = params.composedActivityId;
  const to = `/activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}/ca/${composedActivityId}/a/${record.id}/edit`;
  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowActivityButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const moduleId = params.moduleId;
  const fragmentId = params.fragmentId;
  const composedActivityId = params.composedActivityId;
  if (!record) return null;
  return (
    <>
      <Button
        label={record.title}
        onClick={() => {
          redirect(
            `/activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}/ca/${composedActivityId}/a/${record.id}`
          );
        }}
      ></Button>
    </>
  );
};
const CreateActivityButton = () => {
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const moduleId = params.moduleId;
  const fragmentId = params.fragmentId;
  const composedActivityId = params.composedActivityId;
  const to = `/activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}/ca/${composedActivityId}/create`;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};

const Empty = () => {
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const moduleId = params.moduleId;
  const fragmentId = params.fragmentId;
  const composedActivityId = params.composedActivityId;
  const translate = useTranslate();
const to = `/activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}/ca/${composedActivityId}/create`;
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
