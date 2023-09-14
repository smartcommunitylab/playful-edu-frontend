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
  useListContext,
  BulkDeleteButton,
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

const PostBulkActionButtons = () => {
  const translate = useTranslate();
  const listContext = useListContext();

  const selectedIdsCount = listContext.selectedIds.length;
  const resourceName = translate(
    `resources.modules.${selectedIdsCount === 1 ? "singular" : "plural"}`
  );

  const title = translate("ra.message.bulk_delete_title", {
    name: resourceName,
    smart_count: selectedIdsCount,
  });

  const content = translate("ra.message.bulk_delete_content", {
    name: resourceName,
    smart_count: selectedIdsCount,
  });

  return (
    <BulkDeleteButton
      mutationMode="pessimistic"
      confirmTitle={title}
      confirmContent={content}
    />
  );
};

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
        //filters={ModuleFilters}
        queryOptions={{ meta: { domainId, learningScenarioId } }}
        title="titlePages.modules.list"
        sx={{ justifyContent: "center" }}
        pagination={false}
      >
        <Datagrid bulkActionButtons={<PostBulkActionButtons />}>
          <TextField
            source="title"
            label="resources.modules.title"
            sortable={false}
          />
          <TextField
            source="desc"
            label="resources.modules.description"
            sortable={false}
          />
          <TextField
            source="level"
            label="resources.modules.level"
            sortable={false}
          />
          <DateField
            source="dateFrom"
            label="resources.modules.dateFrom"
            sortable={false}
          />
          <DateField
            source="dateTo"
            label="resources.modules.dateTo"
            sortable={false}
          />
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
