import { Show, SimpleShowLayout, TextField, TopToolbar, useGetRecordId } from "react-admin"
import { useParams } from 'react-router-dom';
import { MODULO_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { ComposedActivityList } from "../composedActivities/ComposedActivityList";


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId = params.learningScenarioId;
    const moduleId = params.moduleId;
    const to=`/fragments/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${recordId}/edit`;

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
            <ComposedActivityList />
        </SimpleShowLayout>
        </Show>
    )
}
