import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useStore, useRedirect, useRecordContext } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';



const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const ExternalActivityFilters = [
    <TextInput label="Search" source="name" alwaysOn />]
export const ExternalActivityList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
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
            <TextField source="title" />
            <TextField source="description" />
            <TextField source="type" />
            <TextField source="language" />
            <TextField source="tool" />
            <TextField source="difficulty" />
        </>
    );

};
