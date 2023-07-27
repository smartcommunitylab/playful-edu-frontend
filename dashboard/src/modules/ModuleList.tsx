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
  DateField,
} from "react-admin";
import { DOMAIN_URL_PARAM, MODULO_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';

const ListActions = () => (
  <TopToolbar>
    <CreateModuleButton />
    <ExportButton />
  </TopToolbar>
);
const ModuleFilters = [<TextInput label="Search" source="name" alwaysOn />];
export const ModuleList = ({scenarioId}:{scenarioId:string}) => {
  const [searchParams, setSearchParams] = useSearchParams();
const domainId = searchParams.get(DOMAIN_URL_PARAM);
const learningScenarioId = searchParams.get(SCENARIO_URL_PARAM);

  const translate = useTranslate();
  return (
    <List actions={<ListActions />} filters={ModuleFilters} queryOptions={{ meta: { domainId, learningScenarioId} }}>
      <Datagrid>
        <ModuleButton></ModuleButton>
        <EditModuleButton />
        <ShowModuleButton />
      </Datagrid>
    </List>
  );
};
const ModuleButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
          const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
  if (!record) return null;
  return (
    <>
      <Button
        label={record.title}
        onClick={() => {
          redirect(`/modules/${record.id}/show?${MODULO_URL_PARAM}=${record.id}&${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}`);
        }}
      ></Button>
      <TextField source="desc" />
      <TextField source="level" />
      <TextField source="language" />
      <DateField source="dateFrom" />
      <DateField source="dateFrom" />
    </>
  );
};

const EditModuleButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const to = `/modules/${record.id}/edit?${MODULO_URL_PARAM}=${record.id}&${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}`;
  if (!record)
      return null;
  return (
      <>
          <EditButton  to={to}></EditButton>
      </>
  );

};

const ShowModuleButton = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const to = `/modules/${record.id}/show?${MODULO_URL_PARAM}=${record.id}&${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}`;
   if (!record)
      return null;
  return (
      <>
            <ShowButton to={to}></ShowButton>
      </>
  );
};
const CreateModuleButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const to = `/modules/create?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}`;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};