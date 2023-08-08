import { List, Datagrid, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, Button, useRedirect, useRecordContext } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";



const ListActions = () => (
    <TopToolbar>
        <CreateDomainButton/>
        <ExportButton/>
    </TopToolbar>
);
// const domainFilters = [
//     <TextInput label="resources.domain.search" source="q"  alwaysOn />]
export const DomainList = () => {
    const redirect = useRedirect();
    return (
        <List actions={<ListActions/>} >
        <Datagrid>
            <DomainButton source="title"></DomainButton>
            <EditDomainButton />
            <ShowDomainButton />
        </Datagrid>
    </List>
    )
}
const DomainButton = (props: {source:string}) => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
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
const EditDomainButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const to= `/domains/${record.id}/edit?${DOMAIN_URL_PARAM}=${record.id}`;

    if (!record)
        return null;
    return (
        <>
            <EditButton  to={to}></EditButton>
        </>
    );

};
const ShowDomainButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const to= `/domains/${record.id}/show?${DOMAIN_URL_PARAM}=${record.id}`;
    if (!record)
        return null;
    return (
        <>
            <ShowButton  to={to}></ShowButton>
        </>
    );
};
const CreateDomainButton = () => {
    const record = useRecordContext();
    const to = `/domains/create`
    return (
      <>
        <CreateButton to={to}></CreateButton>
      </>
    );
  };