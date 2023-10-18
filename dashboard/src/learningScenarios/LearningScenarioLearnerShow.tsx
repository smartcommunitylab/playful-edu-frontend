import {
  Datagrid,
  TextField,
  TopToolbar,
  EditButton,
  useGetRecordId,
  ResourceContextProvider,
  List,
  ExportButton,
  Button,
  useRedirect,
  useTranslate,
  Link,
} from "react-admin";
import { useParams } from "react-router-dom";
import CreateButton from "../CreateButton";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button as MuiButton,
} from "@mui/material";

const ListActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenario-learners/d/${domainId}/s/${recordId}/edit`;
  const redirect = useRedirect();

  if (!recordId) return null;
  return (
    <TopToolbar>
      <Button
        color="primary"
        label="ra.action.edit"
        onClick={() => redirect(to)}
      >
        <EditIcon />
      </Button>
    </TopToolbar>
  );
};

const Empty = () => {
  const params = useParams();
  const domainId = params.domainId;
  const recordId = useGetRecordId();
  const translate = useTranslate();
  const to = `/scenario-learners/d/${domainId}/s/${recordId}/edit`;

  return (
    <Box display="flex" alignItems="start" textAlign="center" mt={10}>
      <Card>
        <CardContent sx={{ padding: "33px !important" }}>
          <Typography variant="h4" paragraph>
            {translate("resources.learningScenarios.emptyLearners")}
          </Typography>
          <Typography variant="body1">
            {translate("resources.learningScenarios.addLearners")}
          </Typography>

          <Box mt={3}>
            <Link to={to}>
              <MuiButton color="primary" variant="contained">
                {translate("ra.action.add")}
              </MuiButton>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export const LearningScenarioLearnerShow = () => {
  const params = useParams();
  const learningScenarioId = params.id;

  return (
    <ResourceContextProvider value="learners">
      <List
        empty={<Empty />}
        actions={<ListActions />}
        filter={{ domainId: params.domainId }}
        queryOptions={{
          meta: { domainId: params.domainId, learningScenarioId },
        }}
        title="titlePages.learners.list"
        sx={{ justifyContent: "center" }}
      >
        <Datagrid
          bulkActionButtons={false}
          sx={{
            "& .RaBulkActionsToolbar-topToolbar": {
              backgroundColor: "initial",
            },
          }}
        >
          <TextField source="firstname" label="resources.learners.firstname" />
          <span> </span>
          <TextField source="lastname" label="resources.learners.lastname" />
          <span> </span>
          <TextField source="email" label="resources.learners.email" />
          <TextField source="nickname" label="resources.learners.nickname" />
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
};
