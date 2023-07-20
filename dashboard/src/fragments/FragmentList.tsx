import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { DOMAIN_URL_PARAM, FRAGMENT_URL_PARAM, MODULO_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';



const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
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

    return (
        <List actions={<ListActions/>} filters={FragmentFilters} queryOptions={{ meta: { domainId, learningScenarioId,moduloId} }}>
        <Datagrid>
            <FragmentButton ></FragmentButton>
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
    )
}
const FragmentButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    // const [gameId, setFragmentId] = useStore(FRAGMENT_KEY);
    if (!record)
        return null;
    return (
        <>
            <Button  label={record.title} onClick={() => {
                // setFragmentId(record.id);
                redirect(`/fragments/${record.id}/show?${FRAGMENT_URL_PARAM}=${record.id}`);
            }}></Button>
        </>
    );

};
