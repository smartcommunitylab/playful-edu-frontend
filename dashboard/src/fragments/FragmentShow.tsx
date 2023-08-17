import { Show, SimpleShowLayout, TextField, TopToolbar, useGetRecordId } from "react-admin"
import { useParams } from 'react-router-dom';
import { ActivityList } from "../activities/ActivityList";


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId = params.learningScenarioId;
    const learningModuleId = params.learningModuleId;
    const to=`/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${recordId}/edit`;

    if (!recordId)
        return null;
    return (
        <>
            <TopToolbar>
            </TopToolbar>
            </>
        )
};
export const FragmentShow = () => {
    return (
        <Show actions={<PostShowActions />}>
         <SimpleShowLayout>
            <TextField source="title"  />
            <ActivityList />
        </SimpleShowLayout>
        </Show>
    )
}
