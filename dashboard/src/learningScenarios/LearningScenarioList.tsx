import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { DOMAIN_KEY, SCENARIO_KEY } from "../constants";



const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const LearningScenarioFilters = [
    <TextInput label="Search" source="name" alwaysOn />]
export const LearningScenarioList = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    const translate = useTranslate();
    return (
        <List actions={<ListActions/>} filters={LearningScenarioFilters} queryOptions={{ meta: { domainId } }}>
        <Datagrid>
            <LearningScenarioButton ></LearningScenarioButton>
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
    )
}
const LearningScenarioButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [gameId, setLearningScenarioId] = useStore(SCENARIO_KEY);
    if (!record)
        return null;
    return (
        <>
            <Button  label={record.title} onClick={() => {
                setLearningScenarioId(record.id);
                redirect('/scenarios/' + record.id + '/show');
            }}></Button>
            <TextField source="desc" />
            <TextField source="language" />
        </>
    );

};
