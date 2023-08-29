import {
  BooleanInput,
  Create,
  FormDataConsumer,
  ReferenceArrayInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
  useRecordContext,
  useRedirect,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import {
  COMPOSED_ACTIVITY_URL_PARAM,
  DOMAIN_URL_PARAM,
  FRAGMENT_URL_PARAM,
  MODULO_URL_PARAM,
  SCENARIO_URL_PARAM,
} from "../constants";
import { BackButton } from "@dslab/ra-back-button";

export const ActivityCreate = () => {
  const params = useParams();
  const record = useRecordContext();
  const redirect = useRedirect();
  const translate = useTranslate();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.learningFragmentId;
 
  const onSuccess = () => {
    redirect(
      `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}`
    );
  };
  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data: any) => ({
        ...data,
        domainId,
        learningFragmentId,
      })}
    >
      <BackButton />
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
                    meta: { domainId, learningScenarioId, learningModuleId },
                  }}
                />
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
    </Create>
  );
};
