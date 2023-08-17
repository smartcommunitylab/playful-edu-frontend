import { Datagrid, TextField, TopToolbar, EditButton,ReferenceArrayField, Show, useGetRecordId, List } from "react-admin"
import { useParams } from 'react-router-dom';



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
        <Datagrid bulkActionButtons={false}>
            <TextField source="firstname" label="resources.learner.firstname" /><span> </span>
            <TextField source="lastname" label="resources.learner.lastname" /><span> </span>
            <TextField source="email" label="resources.learner.email" /> 
            <TextField source="nickname"  label="resources.learner.nickname"/>
        </Datagrid>
    </ReferenceArrayField>
    </Show>
    )
}
