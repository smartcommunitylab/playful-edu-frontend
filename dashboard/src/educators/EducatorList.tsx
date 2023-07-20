import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';


const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const EducatorFilters = [
    <TextInput label="Search" source="name" alwaysOn />
]
export const EducatorList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    return (
        <List actions={<ListActions/>} filters={EducatorFilters} queryOptions={{ meta: { domainId } }}>
        <Datagrid>
            <EducatorButton ></EducatorButton>
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
    )
}
const EducatorButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [gameId, setGameId] = useStore('Educator.selected');
    if (!record)
        return null;
    return (
        <>
            {/* <Button  label={record.name} onClick={() => {
                setGameId(record.id);
                redirect('/users/' + record.id + '/show');
            }}></Button> */}
            <TextField source="firstname" /><span> </span>
            <TextField source="lastname" /><span> </span>
            <TextField source="email" />
        </>
    );

};
