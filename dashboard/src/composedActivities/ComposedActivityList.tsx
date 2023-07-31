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
  Button,
  useRedirect,
  useRecordContext,
} from "react-admin";
import {
  ACTIVITY_URL_PARAM,
  COMPOSED_ACTIVITY_URL_PARAM,
  DOMAIN_URL_PARAM,
  FRAGMENT_URL_PARAM,
  MODULO_URL_PARAM,
  SCENARIO_URL_PARAM,
} from "../constants";
import { useSearchParams } from "react-router-dom";
import { Box, Typography } from '@mui/material';
const ListActions = () => (
  <TopToolbar>
    <CreateComposedActivityButton />
    <ExportButton />
  </TopToolbar>
);
const ComposedActivityFilters = [
  <TextInput label="Search" source="name" alwaysOn />,
];
export const ComposedActivityList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const learningScenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduloId = searchParams.get(MODULO_URL_PARAM);
  const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);

  return (
<List
empty={<Empty />}
      actions={<ListActions />}
      filters={ComposedActivityFilters}
      queryOptions={{
        meta: { domainId, learningScenarioId, moduloId, fragmentId },
      }}
    >
  <Datagrid>
        <ComposedActivityButton></ComposedActivityButton>
        <EditComposedActivityButton />
        <ShowComposedActivityButton />
      </Datagrid>
    </List>
  );
};
const ComposedActivityButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduleId = searchParams.get(MODULO_URL_PARAM);
  const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
  if (!record) return null;
  return (
    <>
      <Button
        label={record.title}
        onClick={() => {
          redirect(
            `/composed-activities/${record.id}/show?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}&${MODULO_URL_PARAM}=${moduleId}&${FRAGMENT_URL_PARAM}=${fragmentId}&${COMPOSED_ACTIVITY_URL_PARAM}=${record.id}`
          )}}
      ></Button>
      <TextField source="type" />
    </>)
};

const EditComposedActivityButton = () => {
    const redirect = useRedirect();
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
    const moduleId = searchParams.get(MODULO_URL_PARAM);
    const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
    const to=`/composed-activities/${record.id}/edit?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}&${MODULO_URL_PARAM}=${moduleId}&${FRAGMENT_URL_PARAM}=${fragmentId}`;
    if (!record)
        return null;
    return (
        <>
                    <EditButton  to={to}></EditButton>
        </>
    );
};

const ShowComposedActivityButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduleId = searchParams.get(MODULO_URL_PARAM);
  const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
    const to=`/composed-activities/${record.id}/show?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}&${MODULO_URL_PARAM}=${moduleId}&${FRAGMENT_URL_PARAM}=${fragmentId}&${COMPOSED_ACTIVITY_URL_PARAM}=${record.id}`;
    if (!record)
        return null;
    return (
        <>
              <ShowButton to={to}></ShowButton>
        </>
    );
};

const CreateComposedActivityButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduleId = searchParams.get(MODULO_URL_PARAM);
  const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
  const to = `/composed-activities/create?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}&${MODULO_URL_PARAM}=${moduleId}&${FRAGMENT_URL_PARAM}=${fragmentId}`;
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
const to = `/composed-activities/create?${DOMAIN_URL_PARAM}=${domainId}`;
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