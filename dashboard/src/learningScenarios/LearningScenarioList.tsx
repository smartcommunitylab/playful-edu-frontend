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
  BooleanField,
} from "react-admin";
import { DOMAIN_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const ListActions = () => (
  <TopToolbar>
    <CreateScenarioButton />
    <ExportButton />
  </TopToolbar>
);
const LearningScenarioFilters = [
  <TextInput label="Search" source="name" alwaysOn />,
];
export const LearningScenarioList = () => {
  const params = useParams();
  const domainId = params.domainId;
  const translate = useTranslate();
  return (
    <ResourceContextProvider value="scenarios">
      <List
        empty={<Empty />}
        actions={<ListActions />}
        filters={LearningScenarioFilters}
        queryOptions={{ meta: { domainId } }}
      >
        <Datagrid>
          <TextField source="title" />
          <TextField source="desc" />
          <TextField source="language" />
          <BooleanField source="publicScenario" />
          <EditScenarioButton />
          <ShowScenarioButton />
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
};

const EditScenarioButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${record.id}/edit`;
  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

// const LearningScenarioButton = () => {

//     const redirect = useRedirect();
//     const record = useRecordContext();
//     const params = useParams();
//     const domainId =params.domainId;
//     if (!record)
//         return null;
//     return (
//         <>
//             <Button  label={record.title} onClick={() => {
//                 redirect(`/scenarios/d/${domainId}/s/${record.id}`);
//             }}></Button>
//             <TextField source="desc" />
//             <TextField source="language" />
//         </>
//     );

// };

const ShowScenarioButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${record.id}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};
const CreateScenarioButton = () => {
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/create`;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};
const Empty = () => {
  const params = useParams();
  const domainId = params.domainId;
  const translate = useTranslate();
  const to = `/scenarios/d/${domainId}/create`;
  return (
    <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
        {translate("resources.scenario.empty")}
      </Typography>
      <Typography variant="body1">
        {translate("resources.scenario.addOne")}
      </Typography>
      <CreateButton to={to} />
    </Box>
  );
};
