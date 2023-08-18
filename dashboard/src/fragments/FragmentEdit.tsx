import { Edit, ReferenceArrayInput, SelectInput, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId, useRedirect, useTranslate } from "react-admin"
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
    const translate = useTranslate();
    const redirect = useRedirect();
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId = params.learningScenarioId;
    const learningModuleId = params.learningModuleId;
    const onSuccess = () => {
      redirect(`/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`);
    };
    return (
      <Edit
        mutationOptions={{ onSuccess }} actions={<PostEditActions />}>
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
        <ActivityList edit={true}/>
        </SimpleForm>
        </Edit>
    )
}
