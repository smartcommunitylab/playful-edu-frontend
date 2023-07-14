import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { DOMAIN_KEY } from "../constants";



const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const ExternalActivityFilters = [
    <TextInput label="Search" source="name" alwaysOn />]
export const ExternalActivityList = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    const translate = useTranslate();
    return (
        <List actions={<ListActions/>} filters={ExternalActivityFilters} queryOptions={{ meta: { domainId } }}>
        <Datagrid>
            <ExternalActivityButton ></ExternalActivityButton>
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
    )
}
const ExternalActivityButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [gameId, setGameId] = useStore('Activity.selected');
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
