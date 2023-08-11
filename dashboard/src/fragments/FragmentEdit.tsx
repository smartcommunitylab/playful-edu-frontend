import { Edit, ReferenceArrayInput, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId } from "react-admin"
import { useParams } from 'react-router-dom';

const PostEditActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId = params.learningScenarioId;
    const moduleId = params.moduleId;
    const to=`/fragments/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${recordId}`;
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
    const moduleId = params.moduleId;
    return (
        <Edit actions={<PostEditActions />}>
            <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <ReferenceArrayInput label="composed-activity" reference="composed-activity" source="composed-activity" queryOptions={{ meta: { domainId, moduleId } }} />
        </SimpleForm>
        </Edit>
    )
}
