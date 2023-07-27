import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { DOMAIN_URL_PARAM, FRAGMENT_URL_PARAM, MODULO_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';



const ListActions = () => (
    <TopToolbar>
        <CreateFragmentButton/>
        <ExportButton/>
    </TopToolbar>
);
const FragmentFilters = [
    <TextInput label="Search" source="name" alwaysOn />]
export const FragmentList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
const domainId = searchParams.get(DOMAIN_URL_PARAM);
const learningScenarioId = searchParams.get(SCENARIO_URL_PARAM);
const moduloId = searchParams.get(MODULO_URL_PARAM);
const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
const record = useRecordContext();
if (!record)
    return null;
const redirect = useRedirect();
    return (
        <List actions={<ListActions/>} filters={FragmentFilters} queryOptions={{ meta: { domainId, learningScenarioId,moduloId} }}>
        <Datagrid>
            <FragmentButton ></FragmentButton>
            <EditFragmentButton />
            <ShowFragmentButton />
        </Datagrid>
    </List>
    )
}
const FragmentButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    if (!record)
        return null;
    return (
        <>
            <Button  label={record.title} onClick={() => {
                redirect(`/fragments/${record.id}/show?${FRAGMENT_URL_PARAM}=${record.id}`);
            }}></Button>
        </>
    );

};

const EditFragmentButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/competences/${record.id}/edit?${DOMAIN_URL_PARAM}=${domainId}`;
    if (!record)
        return null;
    return (
        <>
                    <EditButton  to={to}></EditButton>
        </>
    );

};

const ShowFragmentButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/competences/${record.id}/show?${DOMAIN_URL_PARAM}=${domainId}`;
    if (!record)
        return null;
    return (
        <>
              <ShowButton to={to}></ShowButton>
        </>
    );
};
const CreateFragmentButton = () => {
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
      const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to = `/fragments/create?${DOMAIN_URL_PARAM}=${domainId}`;
    return (
      <>
        <CreateButton to={to}></CreateButton>
      </>
    );
  };