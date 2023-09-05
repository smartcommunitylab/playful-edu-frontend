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
} from "react-admin";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
const ListActions = () => (
  <TopToolbar>
    <CreateActivityButton />
    <ExportButton />
  </TopToolbar>
);
// const ActivityFilters = [<TextInput label="Search" source="title" alwaysOn />];
export const ActivityList = (props: any) => {
  const params = useParams();
  const record = useRecordContext();
  const translate = useTranslate();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.id;
  console.log(props.edit);
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
      >
        <Datagrid bulkActionButtons={props.edit}>
          <TextField source="title" />
          <TextField source="desc" />
          <SelectField
            source="type"
            choices={[
              {
                id: "concrete",
                name: translate("resources.activity.typeSelection.concrete"),
              },
              {
                id: "abstr",
                name: translate("resources.activity.typeSelection.abstract"),
              },
              {
                id: "group",
                name: translate("resources.activity.typeSelection.group"),
              },
            ]}
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
    <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
        {translate("resources.activity.empty")}
      </Typography>
      <Typography variant="body1">
        {translate("resources.activity.addOne")}
      </Typography>
      <CreateButton to={to} />
    </Box>
  );
};
