import {
  BooleanInput,
  Create,
  FormDataConsumer,
  ReferenceArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
  useRecordContext,
  useRedirect,
} from "react-admin";
import { useParams } from "react-router-dom";
import {
  COMPOSED_ACTIVITY_URL_PARAM,
  DOMAIN_URL_PARAM,
  FRAGMENT_URL_PARAM,
  MODULO_URL_PARAM,
  SCENARIO_URL_PARAM,
} from "../constants";
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const ActivityCreate = () => {
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const moduleId = params.moduleId;
  const fragmentId = params.fragmentId;
  const composedActivityId = params.composedActivityId;
  const record = useRecordContext();
  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(
      `/activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}/ca/${composedActivityId}`
    );
  };
  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data: any) => ({
        ...data,
        domainId,
        learningScenarioId,
        moduleId,
        fragmentId,
        composedActivityId,
      })}
    >
      <BackButton />
      <SimpleForm>
        <TextInput source="title" validate={[required()]} fullWidth />
        <TextInput source="desc" />
        <SelectInput
          source="type"
          choices={[
            { id: "concrete", name: "Concreta" },
            { id: "abstract", name: "Astratta" },
            { id: "group", name: "Gruppo" },
          ]}
        />
        <FormDataConsumer>
          {({ formData, ...rest }) => {
            if (formData.type && formData.type == "concrete")
              return (
                <ReferenceArrayInput
                  source="concepts"
                  reference="concepts"
                  queryOptions={{
                    meta: { domainId, learningScenarioId, moduleId },
                  }}
                />
              );
            else if (formData.type == "abstract")
              return (
                <ReferenceArrayInput
                  source="external-activities"
                  reference="external-activities"
                  queryOptions={{
                    meta: {
                      domainId,
                      learningScenarioId,
                      moduleId,
                      fragmentId,
                      composedActivityId,
                    },
                  }}
                />
              );
            else if (formData.type == "group")
              return (
                <ReferenceArrayInput
                  source="external-activities"
                  reference="external-activities"
                  queryOptions={{
                    meta: {
                      domainId,
                      learningScenarioId,
                      moduleId,
                      fragmentId,
                      composedActivityId,
                    },
                  }}
                />
              );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
};
