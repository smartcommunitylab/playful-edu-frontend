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
  useGetRecordId,
  SelectField,
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
  <TopToolbar>
    <CreateFragmentButton />
    <ExportButton />
  </TopToolbar>
);

const FragmentFilters = [
  <TextInput label="ra.action.search" source="name" alwaysOn />,
];

const PostBulkActionButtons = () => {
  const translate = useTranslate();
  const listContext = useListContext();

  const selectedIdsCount = listContext.selectedIds.length;
  const resourceName = translate(
    `resources.learningFragments.${
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

export const FragmentList = () => {
  const params = useParams();
  const translate = useTranslate();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;

  return (
    <List
      empty={<Empty />}
      actions={<ListActions />}
      //filters={FragmentFilters}
      queryOptions={{
        meta: { domainId, learningScenarioId, learningModuleId },
      }}
      title="titlePages.learningFragments.list"
      sx={{ justifyContent: "center" }}
      pagination={false}
    >
      <Datagrid
        bulkActionButtons={<PostBulkActionButtons />}
        sx={{
          "& .RaBulkActionsToolbar-topToolbar": {
            backgroundColor: "initial",
          },
        }}
      >
        {/* <FragmentButton></FragmentButton> */}
        <TextField
          source="title"
          label="resources.learningFragments.title"
          sortable={false}
        />
        <FunctionField
          label="resources.learningFragments.type"
          render={(record: any) =>
            record && record.type
              ? translate(
                  "resources.learningFragments.typeSelection." + record.type
                )
              : ""
          }
        />
        <EditFragmentButton />
        <ShowFragmentButton />
      </Datagrid>
    </List>
  );
};

const EditFragmentButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${record.id}/edit`;
  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowFragmentButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${record.id}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};
const CreateFragmentButton = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/create`;
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
  const translate = useTranslate();
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/create`;

  return (
    <Box display="flex" alignItems="start" textAlign="center" mt={10}>
      <Card>
        <CardContent sx={{ padding: "33px !important" }}>
          <Typography variant="h4" paragraph>
            {translate("resources.learningFragments.empty")}
          </Typography>
          <Typography variant="body1">
            {translate("resources.learningFragments.addOne")}
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
