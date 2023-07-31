import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useStore, useRedirect, useRecordContext, useTranslate } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';


const ListActions = () => (
    <TopToolbar>
        <CreateExternalActivityButton/>
        <ExportButton/>
    </TopToolbar>
);
const ExternalActivityFilters = [
    <TextInput label="Search" source="name" alwaysOn />]
export const ExternalActivityList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    return (
        <List empty={<Empty />} actions={<ListActions/>} filters={ExternalActivityFilters} queryOptions={{ meta: { domainId } }}>
        <Datagrid>
            <ExternalActivityButton ></ExternalActivityButton>
            <EditExternalActivityButton />
            <ShowExternalActivityButton />
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
const EditExternalActivityButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/external-activities/${record.id}/edit?${DOMAIN_URL_PARAM}=${domainId}`;
    if (!record)
        return null;
    return (
        <>
            <EditButton  to={to}></EditButton>
        </>
    );

};

const ShowExternalActivityButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/external-activities/${record.id}/show?${DOMAIN_URL_PARAM}=${domainId}`;
    if (!record)
        return null;
    return (
        <>
          <ShowButton  to={to}></ShowButton>
        </>
    );
};
const CreateExternalActivityButton = () => {
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
      const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to = `/external-activities/create?${DOMAIN_URL_PARAM}=${domainId}`;
    return (
      <>
        <CreateButton to={to}></CreateButton>
      </>
    );
  };
  
  const Empty = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const translate = useTranslate();
  const to = `/external-activities/create?${DOMAIN_URL_PARAM}=${domainId}`;
    return (<Box textAlign="center" m={1}>
        <Typography variant="h4" paragraph>
        {translate('resources.externalActivity.empty')}
        </Typography>
        <Typography variant="body1">
        {translate('resources.externalActivity.addOne')}
        </Typography>
        <CreateButton to={to}/>
    </Box>)
};