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
  ResourceContextProvider,
  Link,
  BulkDeleteButton,
  useListContext,
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button as MuiButton,
} from "@mui/material";

const ListActions = () => {
  const params = useParams();
  const domainId = params.domainId;

  return (
    <TopToolbar>
      <CreateLearnerButton />
      <ExportButton meta={{ domainId }} />
    </TopToolbar>
  );
};

const LearnerFilters = [
  <TextInput label="ra.action.search" source="text" alwaysOn />,
];

const PostBulkActionButtons = () => {
  const translate = useTranslate();
  const listContext = useListContext();

  const selectedIdsCount = listContext.selectedIds.length;
  const resourceName = translate(
    `resources.learners.${selectedIdsCount === 1 ? "singular" : "plural"}`
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

export const LearnerList = () => {
  const params = useParams();

  return (
    <ResourceContextProvider value="learners">
      <List
        empty={<Empty />}
        actions={<ListActions />}
        filter={{ domainId: params.domainId }}
        queryOptions={{ meta: { domainId: params.domainId } }}
        filters={LearnerFilters}
        title="titlePages.learners.list"
        sx={{
          justifyContent: "center",
          "& .RaList-actions": { flexWrap: "nowrap", flexDirection: "row" },
          "& .column-undefined": {
            width: "8rem",
          },
        }}
      >
        <Datagrid
          bulkActionButtons={<PostBulkActionButtons />}
          sx={{
            "& .RaBulkActionsToolbar-topToolbar": {
              backgroundColor: "initial",
            },
          }}
        >
          <TextField source="firstname" label="resources.learners.firstname" />
          <TextField source="lastname" label="resources.learners.lastname" />
          <TextField source="email" label="resources.learners.email" />
          <TextField source="nickname" label="resources.learners.nickname" />

          <EditLearnerButton />
          <ShowLearnerButton />
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
};

const EditLearnerButton = () => {
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/learners/d/${domainId}/${record.id}/edit`;
  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowLearnerButton = () => {
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/learners/d/${domainId}/${record.id}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};

const CreateLearnerButton = () => {
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/learners/d/${domainId}/create`;
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
  const to = `/learners/d/${domainId}/create`;

  return (
    <Box display="flex" alignItems="start" textAlign="center" mt={10}>
      <Card>
        <CardContent sx={{ padding: "33px !important" }}>
          <Typography variant="h4" paragraph>
            {translate("resources.learners.empty")}
          </Typography>
          <Typography variant="body1">
            {translate("resources.learners.addOne")}
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
