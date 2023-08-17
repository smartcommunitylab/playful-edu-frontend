import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext, ResourceContextProvider } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const ListActions = () => (
    <TopToolbar>
        <CreateLearnerButton/>
        <ExportButton/>
    </TopToolbar>
);
const LearnerFilters = [
    <TextInput label="Search" source="name" alwaysOn />
]
export const LearnerList =() => {
    const params = useParams();
    return (
    <ResourceContextProvider value="learners">
        <List empty={<Empty />} actions={<ListActions/>} filter={{ domainId:params.domainId}}  queryOptions={{ meta: { domainId:params.domainId } }}>
        <Datagrid>
            <TextField source="firstname" label="resources.learner.firstname" /><span> </span>
            <TextField source="lastname" label="resources.learner.lastname" /><span> </span>
            <TextField source="email" label="resources.learner.email" /> 
            <TextField source="nickname"  label="resources.learner.nickname"/>

                       <EditLearnerButton />
            <ShowLearnerButton />
        </Datagrid>
    </List>
    </ResourceContextProvider>
    )
}

const EditLearnerButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const params = useParams();
    const domainId =params.domainId;
    const to=`/learners/d/${domainId}/${record.id}/edit`;
    if (!record)
        return null;
    return (
        <>
            <EditButton  to={to}></EditButton>
        </>
    );

};

const ShowLearnerButton = () => {
    const redirect = useRedirect();
    const record = useRecordContext();
    const params = useParams();
    const domainId =params.domainId;
    const to=`/learners/d/${domainId}/${record.id}`;
    if (!record)
        return null;
    return (
        <>
              <ShowButton to={to}></ShowButton>
        </>
    );
};

const CreateLearnerButton = () => {
    const record = useRecordContext();
    const params = useParams();
      const domainId =params.domainId;
    const to = `/learners/d/${domainId}/create`;
    return (
      <>
        <CreateButton to={to}></CreateButton>
      </>
    );
  };
  const Empty = () => {
    const params = useParams();
    const domainId =params.domainId;
    const translate = useTranslate();
  const to = `/learners/d/${domainId}/create`;
    return (<Box textAlign="center" m={1}>
        <Typography variant="h4" paragraph>
        {translate('resources.learner.empty')}
        </Typography>
        <Typography variant="body1">
        {translate('resources.learner.addOne')}
        </Typography>
        <CreateButton to={to}/>
    </Box>)
};