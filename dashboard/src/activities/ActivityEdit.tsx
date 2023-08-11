import { Edit, FormDataConsumer, ReferenceArrayInput, SelectInput, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId, useRedirect } from "react-admin"
import { useParams } from "react-router-dom";
import { ACTIVITY_URL_PARAM, COMPOSED_ACTIVITY_URL_PARAM, DOMAIN_URL_PARAM, FRAGMENT_URL_PARAM, MODULO_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";

const PostEditActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId = params.learningScenarioId;
    const moduleId = params.moduleId;
    const fragmentId = params.fragmentId;
    const composedActivityId = params.composedActivityId;

    const to=`/activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}/ca/${composedActivityId}/a/${recordId}`;
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
export const ActivityEdit = () => {
    const redirect = useRedirect();
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId = params.learningScenarioId;
    const moduleId = params.moduleId;
    const fragmentId = params.fragmentId;
    const composedActivityId = params.composedActivityId;
    const onSuccess = () => {
        redirect(`/activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}/ca/${composedActivityId}`);
    };
    return (
        <Edit mutationOptions={{ onSuccess }} actions={<PostEditActions />}>
            <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="desc" />
            <SelectInput source="type" choices={[
            { id: 'concrete', name: 'Concreta' },
            { id: 'abstract', name: 'Astratta' },
            { id: 'group', name: 'Gruppo' }
    ]} />
    <FormDataConsumer>
    {({ formData, ...rest }) => {
        if (formData.type && formData.type == 'concrete' )
        return <ReferenceArrayInput source="concepts" reference="concepts"  queryOptions={{ meta: { domainId,learningScenarioId, moduleId } }}/>
        else  if (formData.type == 'abstract' )
        return  <ReferenceArrayInput source="external-activities" reference="external-activities"  queryOptions={{ meta: { domainId,learningScenarioId, moduleId,fragmentId,composedActivityId } }} />
        else  if (formData.type == 'group' )
        return  <ReferenceArrayInput source="external-activities" reference="external-activities"  queryOptions={{ meta: { domainId,learningScenarioId, moduleId,fragmentId,composedActivityId } }}/>
    }
    }

             </FormDataConsumer>
        </SimpleForm>
        </Edit>
    )
}
