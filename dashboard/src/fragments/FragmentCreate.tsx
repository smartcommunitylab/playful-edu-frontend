import { Create, SimpleForm, TextInput, required, useRedirect } from "react-admin"
import { BackButton } from "@smartcommunitylab/ra-back-button";
import { useParams } from 'react-router-dom';
import { ActivityList } from "../activities/ActivityList";

export const FragmentCreate = () => {
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId =params.learningScenarioId;
    const learningModuleId =params.learningModuleId;
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`);
    };
    return (
        <Create mutationOptions={{ onSuccess }} transform={(data: any) => ({ ...data, domainId,learningModuleId })} >
   
        <BackButton />
        <SimpleForm>
             <TextInput source="title" validate={[required()]} fullWidth />
             {/* <ActivityList /> */}
        </SimpleForm>
    </Create>
    )
}
