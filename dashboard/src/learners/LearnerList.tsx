import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';
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
export const LearnerList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
        return (
        <List empty={<Empty />} actions={<ListActions/>} filters={LearnerFilters} queryOptions={{ meta: { domainId } }}>
        <Datagrid>
            <LearnerButton ></LearnerButton>
            <EditLearnerButton />
            <ShowLearnerButton />
        </Datagrid>
    </List>
    )
}
const LearnerButton = () => {
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

const EditLearnerButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/learners/${record.id}/edit?${DOMAIN_URL_PARAM}=${domainId}`;
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
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/learners/${record.id}/show?${DOMAIN_URL_PARAM}=${domainId}`;
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
    const [searchParams, setSearchParams] = useSearchParams();
      const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to = `/learners/create?${DOMAIN_URL_PARAM}=${domainId}`;
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
  const to = `/learners/create?${DOMAIN_URL_PARAM}=${domainId}`;
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