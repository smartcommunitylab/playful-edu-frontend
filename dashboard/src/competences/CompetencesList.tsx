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
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
const ListActions = () => (
  <TopToolbar>
    <CreateDomainButton />
    <ExportButton />
  </TopToolbar>
);
const CompetencesFilters = [
  <TextInput label="Search" source="title" alwaysOn />,
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
      >
        <Datagrid>
          <TextField source="title" label="resources.competence.title" />
          <TextField source="desc" label="resources.competence.description" />
          <ReferenceArrayField
            label="Concepts"
            reference="concepts"
            source="concepts"
          />
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
    <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
        {translate("resources.educator.empty")}
      </Typography>
      <Typography variant="body1">
        {translate("resources.educator.addOne")}
      </Typography>
      <CreateButton to={to} />
    </Box>
  );
};
