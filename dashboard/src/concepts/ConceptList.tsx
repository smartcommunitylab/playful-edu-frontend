import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { ImportButton } from "react-admin-import-csv";
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';


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
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
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
