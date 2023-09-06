import {
  AutocompleteArrayInput,
  AutocompleteInput,
  BooleanInput,
  Create,
  FormDataConsumer,
  ReferenceArrayInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
  useGetList,
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
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.learningFragmentId;

  const onSuccess = () => {
    redirect(
      `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}`
    );
  };

  const { total: conceptsTotal } = useGetList("concepts", {
    meta: { domainId, learningScenarioId, learningModuleId },
  });

  const { total: externalActivitiesTotal } = useGetList("external-activities", {
    meta: {
      domainId,
      learningScenarioId,
      learningModuleId,
      learningFragmentId,
    },
  });

  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data: any) => ({
        ...data,
        domainId,
        learningFragmentId,
      })}
      title="titlePages.activities.create"
    >
      <BackButton />
      <SimpleForm>
        <TextInput
          source="title"
          validate={[required()]}
          fullWidth
          label="resources.activities.title"
        />
        <TextInput source="desc" label="resources.activities.description" />
        <SelectInput
          source="type"
          choices={[
            {
              id: "concrete",
              name: translate("resources.activities.typeSelection.concrete"),
            },
            {
              id: "abstr",
              name: translate("resources.activities.typeSelection.abstract"),
            },
            {
              id: "group",
              name: translate("resources.activities.typeSelection.group"),
            },
          ]}
          label="resources.activities.type"
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
                  perPage={conceptsTotal}
                >
                  <AutocompleteArrayInput label="resources.activities.goals" />
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
                  perPage={externalActivitiesTotal}
                >
                  <AutocompleteInput label="resources.activities.externalActivity" />
                </ReferenceInput>
              );
            else if (formData.type == "group")
              return (
                <TextInput
                  source="groupCorrelator"
                  label="resources.activities.groupCorrelator"
                />
              );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
};
