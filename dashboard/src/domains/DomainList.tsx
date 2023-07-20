import { List, Datagrid, SearchInput, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext, ButtonProps } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";



const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);
const domainFilters = [
    <TextInput label="resources.domain.search" source="q"  alwaysOn />]
export const DomainList = () => {
        const translate = useTranslate();
    return (
        <List actions={<ListActions/>} filters={domainFilters}>
        <Datagrid>
            <DomainButton source="title"></DomainButton>
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
    )
}
const DomainButton = (props: {source:string}) => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    // const [domainId, setDomainId] = useStore('domain.selected');

    if (!record)
        return null;
    return (
        <>
            <Button  label={record.title} onClick={() => {
                // setDomainId(record.id);
                redirect(`/domains/${record.id}/show?${DOMAIN_URL_PARAM}=${record.id}`);

            }}></Button>
        </>
    );

};
