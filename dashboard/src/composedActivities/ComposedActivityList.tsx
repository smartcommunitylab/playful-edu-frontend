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
  Button,
  useRedirect,
  useRecordContext,
} from "react-admin";
import {
  ACTIVITY_URL_PARAM,
  COMPOSED_ACTIVITY_URL_PARAM,
  DOMAIN_URL_PARAM,
  FRAGMENT_URL_PARAM,
  MODULO_URL_PARAM,
  SCENARIO_URL_PARAM,
} from "../constants";
import { useSearchParams } from "react-router-dom";

const ListActions = () => (
  <TopToolbar>
    <CreateComposedActivityButton />
    <ExportButton />
  </TopToolbar>
);
const ComposedActivityFilters = [
  <TextInput label="Search" source="name" alwaysOn />,
];
export const ComposedActivityList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const learningScenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduloId = searchParams.get(MODULO_URL_PARAM);
  const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
  const translate = useTranslate();
  return (
    <List
      actions={<ListActions />}
      filters={ComposedActivityFilters}
      queryOptions={{
        meta: { domainId, learningScenarioId, moduloId, fragmentId },
      }}
    >
      <Datagrid>
        <ComposedActivityButton></ComposedActivityButton>
        <EditComposedActivityButton />
        <ShowComposedActivityButton />
      </Datagrid>
    </List>
  );
};
const ComposedActivityButton = () => {
  // const translate = useTranslate();
  const redirect = useRedirect();
  const record = useRecordContext();
  // const [gameId, setComposedActivityId] = useStore(COMPOSED_ACTIVITY_KEY);
  if (!record) return null;
  return (
    <>
      <Button
        label={record.title}
        onClick={() => {
          // setComposedActivityId(record.id);
          redirect(
            `/composed-activities/${record.id}/show?${COMPOSED_ACTIVITY_URL_PARAM}=${record.id}`
          );
        }}
      ></Button>
      <TextField source="type" />
    </>
  );
};

const EditComposedActivityButton = () => {
    const redirect = useRedirect();
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/composed-activities/${record.id}/edit?${DOMAIN_URL_PARAM}=${domainId}`;
    if (!record)
        return null;
    return (
        <>
                    <EditButton  to={to}></EditButton>
        </>
    );
};

const ShowComposedActivityButton = () => {
    const redirect = useRedirect();
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/composed-activities/${record.id}/show?${DOMAIN_URL_PARAM}=${domainId}`;
    if (!record)
        return null;
    return (
        <>
              <ShowButton to={to}></ShowButton>
        </>
    );
};

const CreateComposedActivityButton = () => {
  const record = useRecordContext();
  const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const to = `/composed-activities/create?${DOMAIN_URL_PARAM}=${domainId}`;
  if (!record) return null;
  return (
    <>
      <CreateButton to={to}></CreateButton>
    </>
  );
};