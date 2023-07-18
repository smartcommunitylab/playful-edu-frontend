import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { DOMAIN_KEY, FRAGMENT_KEY } from "../constants";



const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const FragmentFilters = [
    <TextInput label="Search" source="name" alwaysOn />]
export const FragmentList = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    return (
        <List actions={<ListActions/>} filters={FragmentFilters} queryOptions={{ meta: { domainId } }}>
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
    const [gameId, setFragmentId] = useStore(FRAGMENT_KEY);
    if (!record)
        return null;
    return (
        <>
            <Button  label={record.title} onClick={() => {
                setFragmentId(record.id);
                redirect('/fragments/' + record.id + '/show');
            }}></Button>
        </>
    );

};
