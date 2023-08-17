import { Edit, ReferenceArrayInput, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId } from "react-admin"
import { useParams } from 'react-router-dom';
import { ActivityList } from "../activities/ActivityList";

const PostEditActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId = params.learningScenarioId;
    const learningModuleId = params.learningModuleId;
    const to=`/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${recordId}`;
    if (!recordId)
        return null;
    return (
        <>
            <TopToolbar>
                <ShowButton  to={to}></ShowButton>
            </TopToolbar>
            </>
        )
};
export const FragmentEdit = () => {
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId = params.learningScenarioId;
    const learningModuleId = params.learningModuleId;
    return (
        <Edit actions={<PostEditActions />}>
            <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            {/* <ReferenceArrayInput label="composed-activity" reference="composed-activity" source="composed-activity" queryOptions={{ meta: { domainId, learningModuleId } }} /> */}
            <ActivityList />
        </SimpleForm>
        </Edit>
    )
}
