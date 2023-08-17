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
} from "react-admin";
import { useParams } from "react-router-dom";
import { Box, Typography } from '@mui/material';

const ListActions = () => (
  <TopToolbar>
    <CreateFragmentButton />
    <ExportButton />
  </TopToolbar>
);
const FragmentFilters = [<TextInput label="Search" source="name" alwaysOn />];
export const FragmentList = () => {
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  return (
    <List
    empty={<Empty />}
      actions={<ListActions />}
      filters={FragmentFilters}
      queryOptions={{ meta: { domainId, learningScenarioId, learningModuleId } }}
    >
      <Datagrid>
        <FragmentButton></FragmentButton>
        <EditFragmentButton />
        <ShowFragmentButton />
      </Datagrid>
    </List>
  );
};
const FragmentButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  if (!record) return null;
  return (
    <>
      <Button
        label={record.title}
        onClick={() => {
          redirect(
            `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${record.id}`
          );
        }}
      ></Button>
    </>
  );
};

const EditFragmentButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId
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
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId
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
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/create`;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};
const Empty = () => {
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
    const translate = useTranslate();
const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/create`;
  return (<Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
      {translate('resources.fragment.empty')}
      </Typography>
      <Typography variant="body1">
      {translate('resources.fragment.addOne')}
      </Typography>
      <CreateButton to={to}/>
  </Box>)
};
