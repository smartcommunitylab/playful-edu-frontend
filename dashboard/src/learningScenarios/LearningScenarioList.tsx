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
  Link,
  useListContext,
  BulkDeleteButton,
} from "react-admin";
import { DOMAIN_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
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
    <CreateScenarioButton />
    <ExportButton />
  </TopToolbar>
);

const LearningScenarioFilters = [
  <TextInput label="ra.action.search" source="name" alwaysOn />,
];

const PostBulkActionButtons = () => {
  const translate = useTranslate();
  const listContext = useListContext();

  const selectedIdsCount = listContext.selectedIds.length;
  const resourceName = translate(
    `resources.learningScenarios.${
      selectedIdsCount === 1 ? "singular" : "plural"
    }`
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

export const LearningScenarioList = () => {
  const params = useParams();
  const domainId = params.domainId;

  return (
    <ResourceContextProvider value="scenarios">
      <List
        empty={<Empty />}
        actions={<ListActions />}
        //filters={LearningScenarioFilters}
        queryOptions={{ meta: { domainId } }}
        title="titlePages.learningScenarios.list"
        sx={{ justifyContent: "center" }}
      >
        <Datagrid bulkActionButtons={<PostBulkActionButtons />}>
          <TextField source="title" label="resources.learningScenarios.title" />
          <TextField
            source="desc"
            label="resources.learningScenarios.description"
          />
          <TextField
            source="language"
            label="resources.learningScenarios.language"
          />
          <BooleanField
            source="publicScenario"
            label="resources.learningScenarios.publicScenario"
          />
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
  const to = `/scenarios/d/${domainId}/s/${record.id}/element/edit`;
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
  const to = `/scenarios/d/${domainId}/s/${record.id}/element`;
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
    <Box display="flex" alignItems="start" textAlign="center" mt={10}>
      <Card>
        <CardContent sx={{ padding: "33px !important" }}>
          <Typography variant="h4" paragraph>
            {translate("resources.learningScenarios.empty")}
          </Typography>
          <Typography variant="body1">
            {translate("resources.learningScenarios.addOne")}
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
