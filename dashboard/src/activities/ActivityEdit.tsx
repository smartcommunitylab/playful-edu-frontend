import {
    AutocompleteArrayInput,
    CheckboxGroupInput,
  Edit,
  FormDataConsumer,
  ReferenceArrayInput,
  ReferenceInput,
  SelectInput,
  ShowButton,
  SimpleForm,
  TextInput,
  TopToolbar,
  required,
  useGetRecordId,
  useRedirect,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.learningFragmentId;

  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}/a/${recordId}`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <ShowButton to={to}></ShowButton>
      </TopToolbar>
    </>
  );
};
export const ActivityEdit = () => {
  const redirect = useRedirect();
  const params = useParams();
  const translate = useTranslate();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.learningFragmentId;
  const onSuccess = () => {
    redirect(
      `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}`
    );
  };
  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      mutationMode="pessimistic"
    >
      <SimpleForm>
        <TextInput source="title" validate={[required()]} fullWidth />
        <TextInput source="desc" />
        <SelectInput
          source="type"
          choices={[
            {
              id: "concrete",
              name: translate("resources.activity.typeSelection.concrete"),
            },
            {
              id: "abstr",
              name: translate("resources.activity.typeSelection.abstract"),
            },
            {
              id: "group",
              name: translate("resources.activity.typeSelection.group"),
            },
          ]}
        />
       <FormDataConsumer>
          {({ formData, ...rest }) => {
            if (formData.type && formData.type == "abstr")
              return (
                <ReferenceArrayInput
                  source="goals"
                  reference="concepts"
                  queryOptions={{
                    meta: { domainId, learningScenarioId, learningModuleId }
                  }}
                >
                    <AutocompleteArrayInput />
                    </ReferenceArrayInput>
              );
            else if (formData.type == "concrete")
              return (
                <ReferenceInput
                  source="externalActivityId"
                  reference="external-activities"
                  queryOptions={{
                    meta: {
                      domainId,
                      learningScenarioId,
                      learningModuleId,
                      learningFragmentId,
                    },
                  }}
                />
              );
            else if (formData.type == "group")
              return (
                <TextInput
                  source="groupCorrelator"
                  
                />
              );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};
