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
import {
  DOMAIN_URL_PARAM,
  FRAGMENT_URL_PARAM,
  MODULO_URL_PARAM,
  SCENARIO_URL_PARAM,
} from "../constants";
import { useSearchParams } from "react-router-dom";

const ListActions = () => (
  <TopToolbar>
    <CreateFragmentButton />
    <ExportButton />
  </TopToolbar>
);
const FragmentFilters = [<TextInput label="Search" source="name" alwaysOn />];
export const FragmentList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const learningScenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduloId = searchParams.get(MODULO_URL_PARAM);
  return (
    <List
      actions={<ListActions />}
      filters={FragmentFilters}
      queryOptions={{ meta: { domainId, learningScenarioId, moduloId } }}
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
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduleId = searchParams.get(MODULO_URL_PARAM);
  if (!record) return null;
  return (
    <>
      <Button
        label={record.title}
        onClick={() => {
          redirect(
            `/fragments/${record.id}/show?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}&${MODULO_URL_PARAM}=${moduleId}&${FRAGMENT_URL_PARAM}=${record.id}`
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
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduleId = searchParams.get(MODULO_URL_PARAM);
  const to = `/fragments/${record.id}/edit?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}&${MODULO_URL_PARAM}=${moduleId}`;
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
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduleId = searchParams.get(MODULO_URL_PARAM);
  const to = `/fragments/${record.id}/show?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}&${MODULO_URL_PARAM}=${moduleId}`;
  if (!record) return null;
  return (
    <>
      <ShowButton to={to}></ShowButton>
    </>
  );
};
const CreateFragmentButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduleId = searchParams.get(MODULO_URL_PARAM);
  const to = `/fragments/create?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}&${MODULO_URL_PARAM}=${moduleId}`;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};
