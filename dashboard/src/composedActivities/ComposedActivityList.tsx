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
  ResourceContextProvider,
} from "react-admin";
import {
  ACTIVITY_URL_PARAM,
  COMPOSED_ACTIVITY_URL_PARAM,
  DOMAIN_URL_PARAM,
  FRAGMENT_URL_PARAM,
  MODULO_URL_PARAM,
  SCENARIO_URL_PARAM,
} from "../constants";
import { useParams } from "react-router-dom";
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
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const moduloId = params.moduloId;
  const fragmentId = params.fragmentId;

  return (
    <ResourceContextProvider value="composed-activities">

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
    </ResourceContextProvider>
  );
};
const ComposedActivityButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const moduleId = params.moduleId;
  const fragmentId = params.fragmentId;
  if (!record) return null;
  return (
    <>
      <Button
        label={record.title}
        onClick={() => {
          redirect(
            `/composed-activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}/ca/${record.id}`
          )}}
      ></Button>
      <TextField source="type" />
    </>)
};

const EditComposedActivityButton = () => {
    const redirect = useRedirect();
    const record = useRecordContext();
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId = params.learningScenarioId;
    const moduleId = params.moduleId;
    const fragmentId = params.fragmentId;
    const to=`/composed-activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}/ca/${record.id}/edit`;
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
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const moduleId = params.moduleId;
  const fragmentId = params.fragmentId;
    const to=`/composed-activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}/ca/${record.id}`;
    if (!record)
        return null;
    return (
        <>
              <ShowButton to={to}></ShowButton>
        </>
    );
};

const CreateComposedActivityButton = () => {
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const moduleId = params.moduleId;
  const fragmentId = params.fragmentId;
  const to = `/composed-activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}/create`;
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
    const translate = useTranslate();
const to = `/composed-activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}/create`;
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