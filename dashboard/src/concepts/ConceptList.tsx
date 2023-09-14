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
  Link,
  useListContext,
  BulkDeleteButton,
} from "react-admin";
import { ImportButton } from "react-admin-import-csv";
import { DOMAIN_URL_PARAM } from "../constants";
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
    <CreateConceptButton />
    <ExportButton />
    <ImportButton />
  </TopToolbar>
);

const PostBulkActionButtons = () => {
  const translate = useTranslate();
  const listContext = useListContext();

  const selectedIdsCount = listContext.selectedIds.length;
  const resourceName = translate(
    `resources.concepts.${selectedIdsCount === 1 ? "singular" : "plural"}`
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

const conceptFilters = [
  <TextInput label="ra.action.search" source="title" alwaysOn />,
];

export const ConceptList = () => {
  const params = useParams();
  const translate = useTranslate();

  return (
    <ResourceContextProvider value="concepts">
      <List
        empty={<Empty />}
        actions={<ListActions />}
        filter={{ domainId: params.domainId }}
        queryOptions={{ meta: { domainId: params.domainId } }}
        title="titlePages.concepts.list"
        sx={{ justifyContent: "center" }}
      >
        <Datagrid bulkActionButtons={<PostBulkActionButtons />}>
          <TextField source="title" label="resources.concepts.title" />
          <EditConceptButton />
          <ShowConceptButton />
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
};

const EditConceptButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/concepts/d/${domainId}/${record.id}/edit`;
  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowConceptButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/concepts/d/${domainId}/${record.id}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};

const CreateConceptButton = () => {
  const params = useParams();
  const domainId = params.domainId;
  const to = `/concepts/d/${domainId}/create`;
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
  const to = `/concepts/d/${domainId}/create`;

  return (
    <Box display="flex" alignItems="start" textAlign="center" mt={10}>
      <Card>
        <CardContent sx={{ padding: "33px !important" }}>
          <Typography variant="h4" paragraph>
            {translate("resources.concepts.empty")}
          </Typography>
          <Typography variant="body1">
            {translate("resources.concepts.addOne")}
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
