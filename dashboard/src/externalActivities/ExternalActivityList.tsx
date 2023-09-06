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
  Link,
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

const ListActions = () => (
  <TopToolbar>
    <CreateExternalActivityButton />
    <ExportButton />
  </TopToolbar>
);
const ExternalActivityFilters = [
  <TextInput label="ra.action.search" source="name" alwaysOn />,
];
export const ExternalActivityList = () => {
  const params = useParams();
  const domainId = params.domainId;
  const translate = useTranslate();

  return (
    <ResourceContextProvider value="external-activities">
      <List
        empty={<Empty />}
        actions={<ListActions />}
        filters={ExternalActivityFilters}
        queryOptions={{ meta: { domainId } }}
        title="titlePages.externalActivities.list"
        sx={{ justifyContent: "center" }}
      >
        <Datagrid>
          <TextField
            source="title"
            label="resources.externalActivities.title"
          />
          <TextField
            source="desc"
            label="resources.externalActivities.description"
          />
          <TextField source="type" label="resources.externalActivities.type" />
          <TextField
            source="language"
            label="resources.externalActivities.language"
          />
          <TextField source="tool" label="resources.externalActivities.tool" />
          <TextField
            source="difficulty"
            label="resources.externalActivities.difficulty"
          />
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
    <Box display="flex" alignItems="start" textAlign="center" mt={10}>
      <Card>
        <CardContent sx={{ padding: "33px !important" }}>
          <Typography variant="h4" paragraph>
            {translate("resources.externalActivities.empty")}
          </Typography>
          <Typography variant="body1">
            {translate("resources.externalActivities.addOne")}
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
