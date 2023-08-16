import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, useRedirect, useRecordContext, ResourceContextProvider } from "react-admin"
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';



const ListActions = () => {
    return (
    <Box width="100%">
    <TopToolbar>
        <CreateEducatorButton/>
        <ExportButton/>
    </TopToolbar>
    </Box>
    )}
const EducatorFilters = [
    <TextInput label="Search" source="name" alwaysOn />
]
export const EducatorList =() => {
    const params = useParams();
    return (
    <ResourceContextProvider value="educators">
        <List empty={<Empty />} actions={<ListActions/>} filter={{ domainId:params.domainId}}  queryOptions={{ meta: { domainId:params.domainId } }}>
        <Datagrid>
        <TextField source="firstname" label="resources.educator.firstname" /><span> </span>
            <TextField source="lastname" label="resources.educator.lastname" /><span> </span>
            <TextField source="email" label="resources.educator.email" /> 
            <TextField source="nickname"  label="resources.educator.nickname"/>

            <EditEducatorButton />
            <ShowEducatorButton />
        </Datagrid>
    </List>
    </ResourceContextProvider>
    )
}


const EditEducatorButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const params = useParams();
    const to=`/educators/d/${params.domainId}/${record.id}/edit`;
    if (!record)
        return null;
    return (
        <>
            <EditButton  to={to}></EditButton>
        </>
    );

};

const ShowEducatorButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const params = useParams();
    const to=`/educators/d/${params.domainId}/${record.id}`;
    if (!record)
        return null;
    return (
        <>
          <ShowButton  to={to}></ShowButton>
        </>
    );
};
const CreateEducatorButton = () => {
    const params = useParams();
    const to = `/educators/d/${params.domainId}/create`;
    return (
      <>
        <CreateButton to={to}></CreateButton>
      </>
    );
  };

  const Empty = () => {
    const params = useParams();
    const translate = useTranslate();
  const to = `/educators/d/${params.domainId}/create`;
    return (<Box textAlign="center" m={1}>
        <Typography variant="h4" paragraph>
        {translate('resources.educator.empty')}
        </Typography>
        <Typography variant="body1">
        {translate('resources.educator.addOne')}
        </Typography>
        <CreateButton to={to}/>
    </Box>)
};