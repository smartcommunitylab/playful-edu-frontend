import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext, ResourceContextProvider, ReferenceArrayField, Show, useGetRecordId } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';



const PostShowActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const to=`/scenarios/d/${domainId}/s/${recordId}/learners/edit`;
    if (!recordId)
        return null;
    return (
        <>
            <TopToolbar>
                <EditButton  to={to}></EditButton>
            </TopToolbar>
            </>
        )
};

export const LearningScenarioLearnerShow =() => {
    const params = useParams();
    return (
        <Show actions={<PostShowActions />}>
        <ReferenceArrayField label="Learners" reference="learners" source="learners" >
        <Datagrid>
            <TextField source="firstname" label="resources.learner.firstname" /><span> </span>
            <TextField source="lastname" label="resources.learner.lastname" /><span> </span>
            <TextField source="email" label="resources.learner.email" /> 
            <TextField source="nickname"  label="resources.learner.nickname"/>
        </Datagrid>
    </ReferenceArrayField>
    </Show>
    )
}
