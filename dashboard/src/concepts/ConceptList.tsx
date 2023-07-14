import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { ImportButton } from "react-admin-import-csv";
import { DOMAIN_KEY } from "../constants";



const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <ExportButton/>
        <ImportButton/>

    </TopToolbar>
);
const conceptFilters = [
    <TextInput label="Search" source="title" alwaysOn />]
export const ConceptList = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    const translate = useTranslate();
    return (
        <List actions={<ListActions/>} filters={conceptFilters} queryOptions={{ meta: { domainId } }}>
        <Datagrid>
            <TextField source="title" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
    )
}
