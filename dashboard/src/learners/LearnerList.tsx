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
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const ListActions = () => (
  <TopToolbar>
    <CreateLearnerButton />
    <ExportButton />
  </TopToolbar>
);
const LearnerFilters = [<TextInput label="ra.action.search" source="name" alwaysOn />];
export const LearnerList = () => {
  const params = useParams();
  const translate = useTranslate();

  return (
    <ResourceContextProvider value="learners">
      <List
        empty={<Empty />}
        actions={<ListActions />}
        filter={{ domainId: params.domainId }}
        queryOptions={{ meta: { domainId: params.domainId } }}
        title="titlePages.learners.list"
      >
        <Datagrid>
          <TextField source="firstname" label="resources.learners.firstname" />
          <span> </span>
          <TextField source="lastname" label="resources.learners.lastname" />
          <span> </span>
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
  // const translate = useTranslate();
  const redirect = useRedirect();
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
  const redirect = useRedirect();
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
    <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
        {translate("resources.learners.empty")}
      </Typography>
      <Typography variant="body1">
        {translate("resources.learners.addOne")}
      </Typography>
      <CreateButton to={to} />
    </Box>
  );
};
