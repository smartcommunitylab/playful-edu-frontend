import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { COMPOSED_ACTIVITY_KEY, DOMAIN_KEY } from "../constants";



const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const ComposedActivityFilters = [
    <TextInput label="Search" source="name" alwaysOn />]
export const ComposedActivityList = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    const translate = useTranslate();
    return (
        <List actions={<ListActions/>} filters={ComposedActivityFilters} queryOptions={{ meta: { domainId } }}>
        <Datagrid>
            <ComposedActivityButton ></ComposedActivityButton>
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
    )
}
const ComposedActivityButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [gameId, setComposedActivityId] = useStore(COMPOSED_ACTIVITY_KEY);
    if (!record)
        return null;
    return (
        <>
             <Button  label={record.title} onClick={() => {
                setComposedActivityId(record.id);
                redirect('/composed-activities/' + record.id + '/show');
            }}></Button>
            <TextField source="type" />
        </>
    );

};
