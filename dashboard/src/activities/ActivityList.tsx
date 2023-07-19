import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext, BooleanField } from "react-admin"
import { DOMAIN_KEY } from "../constants";



const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const ActivityFilters = [
    <TextInput label="Search" source="name" alwaysOn />]
export const ActivityList = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    const translate = useTranslate();
    return (
        <List actions={<ListActions/>} filters={ActivityFilters} queryOptions={{ meta: { domainId } }}>
        <Datagrid>
            <ActivityButton ></ActivityButton>
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
    )
}
const ActivityButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [gameId, setGameId] = useStore('Activity.selected');
    if (!record)
        return null;
    return (
        <>
            <TextField source="title" />
            <TextField source="desc" />
            <BooleanField source="group" />
        </>
    );

};
