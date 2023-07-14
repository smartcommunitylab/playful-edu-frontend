import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"



const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const LearningScenarioFilters = [
    <TextInput label="Search" source="name" alwaysOn />]
export const LearningScenarioList = () => {
    const translate = useTranslate();
    return (
        <List actions={<ListActions/>} filters={LearningScenarioFilters}>
        <Datagrid>
            <LearningScenarioButton ></LearningScenarioButton>
{/* 
            <TextField source="name" />
            <TextField source="address.street" /> */}
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
    const [gameId, setLearningScenarioId] = useStore('scenario.selected');
    if (!record)
        return null;
    return (
        <>
            <Button  label={record.title} onClick={() => {
                setLearningScenarioId(record.id);
                redirect('/scenarios/' + record.id + '/show');
            }}></Button>
            <TextField source="description" />
            <TextField source="language" />
        </>
    );

};
