import { List, Datagrid, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, Button, useRedirect, useRecordContext, useTranslate } from "react-admin"
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';



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
    const translate = useTranslate();
    return (
        <List empty={<Empty />} actions={<ListActions/>}  title={translate("titlePages.domains.list")}>
        <Datagrid>
            <DomainButton source="title"></DomainButton>
            <EditDomainButton />
            <ShowDomainButton />
        </Datagrid>
    </List>
    )
}
const DomainButton = (props: {source:string}) => {
    const redirect = useRedirect();
    const record = useRecordContext();
    if (!record)
        return null;
    return (
        <>
            <Button  label={record.title} onClick={() => {
                redirect(`/domains/${record.id}`);
            }}></Button>
        </>
    );

};
const EditDomainButton = () => {
    const redirect = useRedirect();
    const record = useRecordContext();
    const to= `/domains/${record.id}/edit`;

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
    const to= `/domains/${record.id}`;
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

  const Empty = () => {
    const params = useParams();
    const translate = useTranslate();
  const to = `/domains/create`;
    return (<Box textAlign="center" m={1}>
        <Typography variant="h4" paragraph>
        {translate('resources.domain.empty')}
        </Typography>
        <Typography variant="body1">
        {translate('resources.domain.addOne')}
        </Typography>
        <CreateButton to={to}/>
    </Box>)
};