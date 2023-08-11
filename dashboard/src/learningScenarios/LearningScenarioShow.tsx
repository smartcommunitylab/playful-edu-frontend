import { BooleanField, EditButton, ReferenceArrayField, Show, SimpleShowLayout, TextField, TopToolbar, useGetRecordId } from "react-admin"
import { useParams } from 'react-router-dom';


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const to=`/scenarios/d/${domainId}/s/${recordId}/edit`;
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
export const LearningScenarioShow = () => {
    return (
        <Show actions={<PostShowActions />}>
            <SimpleShowLayout>
            <TextField source="title"  />
            <TextField source="desc" />
            <TextField source="language" />
            <BooleanField source="publicScenario" />
            <ReferenceArrayField label="Educators" reference="educators" source="educators" />
            <ReferenceArrayField label="Learners" reference="learners" source="learners" />
        </SimpleShowLayout>
        </Show>
    )
}
