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
  ArrayField,
  ChipField,
  SingleFieldList,
  ReferenceArrayField,
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
    <CreateDomainButton />
    <ExportButton />
  </TopToolbar>
);
const CompetencesFilters = [
  <TextInput label="ra.action.search" source="title" alwaysOn />,
];
export const CompetencesList = () => {
  const params = useParams();
  const domainId = params.domainId;

  return (
    <ResourceContextProvider value="competences">
      <List
        empty={<Empty />}
        actions={<ListActions />}
        filters={CompetencesFilters}
        queryOptions={{ meta: { domainId } }}
        title="titlePages.competences.list"
        sx={{ justifyContent: "center" }}
      >
        <Datagrid>
          <TextField source="title" label="resources.competences.title" />
          <TextField source="desc" label="resources.competences.description" />
          <TextField source="type" label="resources.competences.type" />
          <ReferenceArrayField
            reference="concepts"
            source="concepts"
            label="resources.competences.concepts"
          >
            <SingleFieldList linkType={false}>
              <ChipField source="title" />
            </SingleFieldList>
          </ReferenceArrayField>
          <EditCompetenceButton />
          <ShowCompetenceButton />
        </Datagrid>
      </List>
    </ResourceContextProvider>
  );
};

const EditCompetenceButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/competences/d/${domainId}/${record.id}/edit`;
  if (!record) return null;
  return (
    <>
      <EditButton to={to}></EditButton>
    </>
  );
};

const ShowCompetenceButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/competences/d/${domainId}/${record.id}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};
const CreateDomainButton = () => {
  const record = useRecordContext();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/competences/d/${domainId}/create`;
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
  const to = `/competences/d/${domainId}/create`;

  return (
    <Box display="flex" alignItems="start" textAlign="center" mt={10}>
      <Card>
        <CardContent sx={{ padding: "33px !important" }}>
          <Typography variant="h4" paragraph>
            {translate("resources.competences.empty")}
          </Typography>
          <Typography variant="body1">
            {translate("resources.competences.addOne")}
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
