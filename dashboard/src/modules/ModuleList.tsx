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
  Link,
} from "react-admin";
import {
  DOMAIN_URL_PARAM,
  MODULO_URL_PARAM,
  SCENARIO_URL_PARAM,
} from "../constants";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button as MuiButton,
} from "@mui/material";

const ListActions = () => (
  <TopToolbar>
    <CreateModuleButton />
    <ExportButton />
  </TopToolbar>
);

const ModuleFilters = [
  <TextInput label="ra.action.search" source="name" alwaysOn />,
];

export const ModuleList = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const translate = useTranslate();

  return (
    <ResourceContextProvider value="modules">
      <List
        empty={<Empty />}
        actions={<ListActions />}
        filters={ModuleFilters}
        queryOptions={{ meta: { domainId, learningScenarioId } }}
        title="titlePages.modules.list"
        sx={{ justifyContent: "center" }}
      >
        <Datagrid>
          <TextField source="title" label="resources.modules.title" />
          <TextField source="desc" label="resources.modules.description" />
          <TextField source="level" label="resources.modules.level" />
          <DateField source="dateFrom" label="resources.modules.dateFrom" />
          <DateField source="dateTo" label="resources.modules.dateTo" />
          <EditModuleButton />
          <ShowModuleButton />
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
};

const EditModuleButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/m/${record.id}/edit`;
  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowModuleButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/m/${record.id}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};

const CreateModuleButton = () => {
  const params = useParams();
  const domainId = params.domainId;
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
  const domainId = params.domainId;
  const translate = useTranslate();
  const learningScenarioId = params.learningScenarioId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/create`;

  return (
    <Box display="flex" alignItems="start" textAlign="center" mt={10}>
      <Card>
        <CardContent sx={{ padding: "33px !important" }}>
          <Typography variant="h4" paragraph>
            {translate("resources.modules.empty")}
          </Typography>
          <Typography variant="body1">
            {translate("resources.modules.addOne")}
          </Typography>

          <Box mt={3}>
            <Link to={to}>
              <MuiButton color="primary" variant="contained">
                {translate("ra.action.create")}
              </MuiButton>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
