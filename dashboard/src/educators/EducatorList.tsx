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
  Title,
  Link,
  BulkDeleteButton,
  useListContext,
} from "react-admin";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button as MuiButton,
} from "@mui/material";

const ListActions = () => {
  return (
    <Box width="100%">
      <TopToolbar>
        <CreateEducatorButton />
        <ExportButton />
      </TopToolbar>
    </Box>
  );
};

const EducatorFilters = [
  <TextInput label="ra.action.search" source="name" alwaysOn />,
];

const PostBulkActionButtons = () => {
  const translate = useTranslate();
  const listContext = useListContext();

  const selectedIdsCount = listContext.selectedIds.length;
  const resourceName = translate(
    `resources.educators.${selectedIdsCount === 1 ? "singular" : "plural"}`
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

export const EducatorList = () => {
  const params = useParams();
  const translate = useTranslate();

  return (
    <ResourceContextProvider value="educators">
      <List
        empty={<Empty />}
        actions={<ListActions />}
        filter={{ domainId: params.domainId }}
        queryOptions={{ meta: { domainId: params.domainId } }}
        title="titlePages.educators.list"
        sx={{ justifyContent: "center" }}
      >
        <Datagrid
          bulkActionButtons={<PostBulkActionButtons />}
          sx={{
            "& .RaBulkActionsToolbar-topToolbar": {
              backgroundColor: "initial",
            },
          }}
        >
          <TextField source="firstname" label="resources.educators.firstname" />
          <span> </span>
          <TextField source="lastname" label="resources.educators.lastname" />
          <span> </span>
          <TextField source="email" label="resources.educators.email" />
          <TextField source="nickname" label="resources.educators.nickname" />

          <EditEducatorButton />
          <ShowEducatorButton />
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
};

const EditEducatorButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const to = `/educators/d/${params.domainId}/${record.id}/edit`;
  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowEducatorButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const to = `/educators/d/${params.domainId}/${record.id}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};
const CreateEducatorButton = () => {
  const params = useParams();
  const to = `/educators/d/${params.domainId}/create`;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};

const Empty = () => {
  const params = useParams();
  const translate = useTranslate();
  const to = `/educators/d/${params.domainId}/create`;

  return (
    <Box display="flex" alignItems="start" textAlign="center" mt={10}>
      <Card>
        <CardContent sx={{ padding: "33px !important" }}>
          <Typography variant="h4" paragraph>
            {translate("resources.educators.empty")}
          </Typography>
          <Typography variant="body1">
            {translate("resources.educators.addOne")}
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
