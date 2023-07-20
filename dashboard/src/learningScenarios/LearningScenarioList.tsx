import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { DOMAIN_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';



const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const LearningScenarioFilters = [
    <TextInput label="Search" source="name" alwaysOn />]
export const LearningScenarioList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const translate = useTranslate();
    return (
        <List actions={<ListActions/>} filters={LearningScenarioFilters} queryOptions={{ meta: { domainId } }}>
        <Datagrid>
            <LearningScenarioButton ></LearningScenarioButton>
            <EditButton record/>
            <ShowButton />
        </Datagrid>
    </List>
    )
}
const LearningScenarioButton = () => {
    // const translate = useTranslate();
   // const redirect = useRedirect();
    const redirect = useRedirect();

    const record = useRecordContext();
    // const [gameId, setLearningScenarioId] = useStore(SCENARIO_KEY);
    if (!record)
        return null;
    return (
        <>
            <Button  label={record.title} onClick={() => {
                // setLearningScenarioId(record.id);

                redirect(`/scenarios/${record.id}/show?${SCENARIO_URL_PARAM}=${record.id}`);
            }}></Button>
            <TextField source="desc" />
            <TextField source="language" />
        </>
    );

};
