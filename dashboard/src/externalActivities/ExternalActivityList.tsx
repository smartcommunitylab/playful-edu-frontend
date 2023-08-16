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
  useStore,
  useRedirect,
  useRecordContext,
  useTranslate,
  ResourceContextProvider,
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const ListActions = () => (
  <TopToolbar>
    <CreateExternalActivityButton />
    <ExportButton />
  </TopToolbar>
);
const ExternalActivityFilters = [
  <TextInput label="Search" source="name" alwaysOn />,
];
export const ExternalActivityList = () => {
  const params = useParams();
  const domainId = params.domainId;
  return (
    <ResourceContextProvider value="external-activities">
      <List
        empty={<Empty />}
        actions={<ListActions />}
        filters={ExternalActivityFilters}
        queryOptions={{ meta: { domainId } }}
      >
        <Datagrid>
          <TextField source="title" />
          <TextField source="desc" />
          <TextField source="type" />
          <TextField source="language" />
          <TextField source="tool" />
          <TextField source="difficulty" />
          <EditExternalActivityButton />
          <ShowExternalActivityButton />
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
};

const EditExternalActivityButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/external-activities/d/${domainId}/${record.id}/edit`;
  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowExternalActivityButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/external-activities/d/${domainId}/${record.id}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};
const CreateExternalActivityButton = () => {
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/external-activities/d/${domainId}/create`;
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
  const to = `/external-activities/d/${domainId}/create`;
  return (
    <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
        {translate("resources.externalActivity.empty")}
      </Typography>
      <Typography variant="body1">
        {translate("resources.externalActivity.addOne")}
      </Typography>
      <CreateButton to={to} />
    </Box>
  );
};
