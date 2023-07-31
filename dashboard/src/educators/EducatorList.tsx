import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';


const ListActions = () => (
    <TopToolbar>
        <CreateEducatorButton/>
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
        <List empty={<Empty />}actions={<ListActions/>} filters={EducatorFilters} queryOptions={{ meta: { domainId } }}>
        <Datagrid>
            <EducatorButton ></EducatorButton>
            <EditEducatorButton />
            <ShowEducatorButton />
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
            <TextField source="firstname" /><span> </span>
            <TextField source="lastname" /><span> </span>
            <TextField source="email" />
        </>
    );

};

const EditEducatorButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/educators/${record.id}/edit?${DOMAIN_URL_PARAM}=${domainId}`;
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
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/educators/${record.id}/show?${DOMAIN_URL_PARAM}=${domainId}`;
    if (!record)
        return null;
    return (
        <>
          <ShowButton  to={to}></ShowButton>
        </>
    );
};
const CreateEducatorButton = () => {
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
      const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to = `/educators/create?${DOMAIN_URL_PARAM}=${domainId}`;
    
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
  const to = `/educators/create?${DOMAIN_URL_PARAM}=${domainId}`;
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