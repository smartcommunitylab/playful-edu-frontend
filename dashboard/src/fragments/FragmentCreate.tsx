import { Create, SimpleForm, TextInput, required, useRedirect } from "react-admin"
import { BackButton } from "@smartcommunitylab/ra-back-button";
import { useParams } from 'react-router-dom';

export const FragmentCreate = () => {
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId =params.learningScenarioId;
    const moduleId =params.moduleId;
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/fragments/d/${domainId}/s/${learningScenarioId}/m/${moduleId}`);
    };
    return (
        <Create mutationOptions={{ onSuccess }} transform={(data: any) => ({ ...data, domainId,moduleId })} >
   
        <BackButton />
        <SimpleForm>
             <TextInput source="title" validate={[required()]} fullWidth />
        </SimpleForm>
    </Create>
    )
}
