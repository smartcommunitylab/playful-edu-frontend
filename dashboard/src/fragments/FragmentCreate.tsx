import { Create, SelectInput, SimpleForm, TextInput, required, useRedirect, useTranslate } from "react-admin"
import { BackButton } from "@smartcommunitylab/ra-back-button";
import { useParams } from 'react-router-dom';
import { ActivityList } from "../activities/ActivityList";

export const FragmentCreate = () => {
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId =params.learningScenarioId;
    const learningModuleId =params.learningModuleId;
    const redirect = useRedirect();
    const translate = useTranslate();
    const onSuccess = () => {
        redirect(`/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`);
    };
    return (
        <Create mutationOptions={{ onSuccess }} transform={(data: any) => ({ ...data, domainId,learningModuleId })} >
   
        <BackButton />
        <SimpleForm>
             <TextInput source="title" validate={[required()]} fullWidth />
             <SelectInput
          source="type"
          choices={[
            {
              id: "singleton",
              name: translate("resources.fragment.typeSelection.singleton"),
            },
            {
              id: "set",
              name: translate("resources.fragment.typeSelection.set"),
            },
            {
              id: "list",
              name: translate("resources.fragment.typeSelection.list"),
            },
          ]}
        /> 
        </SimpleForm>
    </Create>
    )
}
