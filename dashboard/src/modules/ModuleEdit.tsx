import { DateInput, Edit, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId, useRedirect } from "react-admin"
import { useParams } from 'react-router-dom';
import { DOMAIN_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { FragmentEdit } from "../fragments/FragmentEdit";

const PostEditActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId = params.learningScenarioId;
    const to=`/modules/d/${domainId}/s/${learningScenarioId}/${recordId}`;
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
export const ModuleEdit = () => {
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId = params.learningScenarioId;
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/modules/d/${domainId}/s/${learningScenarioId}`);
    };
    return (
        <Edit mutationOptions={{ onSuccess }} actions={<PostEditActions />} transform={(data: any) => ({ ...data, domainId, learningScenarioId})} mutationMode="pessimistic">
        <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="desc" />
            <TextInput source="level" />
            <DateInput source="dateFrom" />
            <DateInput source="dateTo" />
            {/* <FragmentEdit /> */}
        </SimpleForm>
        </Edit>
    )
}
