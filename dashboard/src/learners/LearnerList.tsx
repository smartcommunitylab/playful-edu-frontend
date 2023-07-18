import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { DOMAIN_KEY } from "../constants";



const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const LearnerFilters = [
    <TextInput label="Search" source="name" alwaysOn />
]
export const LearnerList = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    return (
        <List actions={<ListActions/>} filters={LearnerFilters} queryOptions={{ meta: { domainId } }}>
        <Datagrid>
            <LearnerButton ></LearnerButton>
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
    )
}
const LearnerButton = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    const redirect = useRedirect();
    const record = useRecordContext();
    const [gameId, setGameId] = useStore('Learner.selected');
    if (!record)
        return null;
    return (
        <>
            {/* <Button  label={record.name} onClick={() => {
                setGameId(record.id);
                redirect('/learners/' + record.id + '/show');
            }}></Button> */}
            <TextField source="firstname" /><span> </span>
            <TextField source="lastname" /><span> </span>
            <TextField source="email" />
        </>
    );

};
