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
  SelectField,
  ReferenceArrayField,
  ChipField,
  SingleFieldList,
  ReferenceField,
  Link,
  FunctionField,
  useListContext,
  BulkDeleteButton,
} from "react-admin";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button as MuiButton,
} from "@mui/material";

const ListActions = () => (
  <TopToolbar sx={{ minHeight: "40px !important" }}>
    <CreateActivityButton />
    <ExportButton />
  </TopToolbar>
);

// const ActivityFilters = [<TextInput label="ra.action.search" source="title" alwaysOn />];

const PostBulkActionButtons = () => {
  const translate = useTranslate();
  const listContext = useListContext();

  const selectedIdsCount = listContext.selectedIds.length;
  const resourceName = translate(
    `resources.activities.${selectedIdsCount === 1 ? "singular" : "plural"}`
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

export const ActivityList = (props: any) => {
  const params = useParams();
  const record = useRecordContext();
  const translate = useTranslate();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.id;
  const title = " ";
  const bulkActionButtons = props.edit ? <PostBulkActionButtons /> : false;

  return (
    <ResourceContextProvider value="activities">
      <List
        empty={<Empty />}
        actions={props.edit ? <ListActions /> : <></>}
        // filters={ActivityFilters}
        queryOptions={{
          meta: {
            domainId,
            learningScenarioId,
            learningModuleId,
            learningFragmentId,
          },
        }}
        title={title}
        sx={{
          justifyContent: "center",
          width: "100%",
          "& .RaList-actions": {
            minHeight: "40px",
          },
        }}
        pagination={false}
      >
        <Datagrid
          bulkActionButtons={bulkActionButtons}
          sx={{
            "& .RaBulkActionsToolbar-topToolbar": {
              backgroundColor: "initial",
            },
          }}
        >
          <TextField
            source="title"
            label="resources.activities.title"
            sortable={false}
          />
          <TextField
            source="desc"
            label="resources.activities.description"
            sortable={false}
          />
          <FunctionField
            label="resources.activities.type"
            render={(record: any) =>
              record && record.type
                ? translate("resources.activities.typeSelection." + record.type)
                : ""
            }
          />
          {record.type === "abstr" && (
            <ReferenceArrayField
              label="Concepts"
              reference="concepts"
              source="concepts"
            >
              <SingleFieldList linkType={false}>
                <ChipField source="title" />
              </SingleFieldList>
            </ReferenceArrayField>
          )}
          {record.type === "group" && <TextField source="groupCorreletator" />}
          {record.type === "concrete" && (
            <ReferenceField
              source="externalActivityId"
              reference="xternal-activities"
            >
              <TextField source="title" />
              <TextField source="desc" />
            </ReferenceField>
          )}
          <EditActivityButton />
          <ShowActivityButton />
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
};

const EditActivityButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.id;
  const to = `/activities/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}/a/${record.id}/edit`;
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
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.id;
  const to = `/activities/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}/a/${record.id}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};

const CreateActivityButton = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.id;
  const to = `/activities/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}/a/create`;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};

const Empty = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.id;
  const translate = useTranslate();
  const to = `/activities/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}/a/create`;

  return (
    <Box display="flex" alignItems="start" textAlign="center">
      <Card>
        <CardContent sx={{ padding: "33px !important" }}>
          <Typography variant="h4" paragraph>
            {translate("resources.activities.empty")}
          </Typography>
          <Typography variant="body1">
            {translate("resources.activities.addOne")}
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
