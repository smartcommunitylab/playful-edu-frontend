import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { DOMAIN_KEY } from "../constants";



const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const LearningFragmentFilters = [
    <TextInput label="Search" source="name" alwaysOn />]
export const LearningFragmentList = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    return (
        <List actions={<ListActions/>} filters={LearningFragmentFilters} queryOptions={{ meta: { domainId } }}>
        <Datagrid>
            <LearningFragmentButton ></LearningFragmentButton>
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
    )
}
const LearningFragmentButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [gameId, setGameId] = useStore('learningFragment.selected');
    if (!record)
        return null;
    return (
        <>
            <Button  label={record.title} onClick={() => {
                setGameId(record.id);
                redirect('/users/' + record.id + '/show');
            }}></Button>
            <TextField source="description" />
            <TextField source="type" />
            <TextField source="language" />
            <TextField source="tool" />
            <TextField source="difficulty" />
        </>
    );

};
