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
} from "react-admin";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const translate = useTranslate();
  return (
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
  const redirect = useRedirect();
  const record = useRecordContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const learningScenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduleId = searchParams.get(MODULO_URL_PARAM);
  const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
  const composedActivityId = searchParams.get(COMPOSED_ACTIVITY_URL_PARAM);
  if (!record) return null;
  return (
    <>
      <Button
        label={record.title}
        onClick={() => {
          redirect(
            `/activities/${record.id}/show?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${learningScenarioId}&${MODULO_URL_PARAM}=${moduleId}&${FRAGMENT_URL_PARAM}=${fragmentId}}&${COMPOSED_ACTIVITY_URL_PARAM}=${composedActivityId}&${ACTIVITY_URL_PARAM}=${record.id}`
          );
        }}
      ></Button>
    </>
  );
};
const CreateActivityButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const learningScenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduleId = searchParams.get(MODULO_URL_PARAM);
  const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
  const composedActivityId = searchParams.get(COMPOSED_ACTIVITY_URL_PARAM);
  const to = `/activities/create?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${learningScenarioId}&${MODULO_URL_PARAM}=${moduleId}&${FRAGMENT_URL_PARAM}=${fragmentId}&${COMPOSED_ACTIVITY_URL_PARAM}=${composedActivityId}}`;
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
const to = `/activities/create?${DOMAIN_URL_PARAM}=${domainId}`;
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
