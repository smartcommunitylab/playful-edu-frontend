import {
  AutocompleteArrayInput,
  AutocompleteInput,
  Create,
  FormDataConsumer,
  ReferenceArrayInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
  useGetList,
  useRedirect,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { BackButton } from "@dslab/ra-back-button";

export const ActivityCreateForm = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.learningFragmentId;
  const translate = useTranslate();

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
    <>
      <TextInput
        source="title"
        validate={[required()]}
        fullWidth
        label="resources.activities.title"
      />
      <TextInput
        source="desc"
        label="resources.activities.description"
        fullWidth
        multiline={true}
      />
      <SelectInput
        source="type"
        choices={[
          {
            id: "concrete",
            name: translate("resources.activities.typeSelection.concrete"),
          },
          {
            id: "abstr",
            name: translate("resources.activities.typeSelection.abstr"),
          },
          {
            id: "group",
            name: translate("resources.activities.typeSelection.group"),
          },
        ]}
        label="resources.activities.type"
        validate={required()}
        fullWidth
      />
      <FormDataConsumer>
        {({ formData }) => {
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
                <AutocompleteArrayInput
                  label="resources.activities.goals"
                  fullWidth
                />
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
                <AutocompleteInput
                  label="resources.activities.externalActivity"
                  fullWidth
                />
              </ReferenceInput>
            );
          else if (formData.type == "group")
            return (
              <TextInput
                source="groupCorrelator"
                label="resources.activities.groupCorrelator"
                fullWidth
              />
            );
        }}
      </FormDataConsumer>
    </>
  );
};

export const ActivityCreate = () => {
  const params = useParams();
  const redirect = useRedirect();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.learningFragmentId;

  const onSuccess = () => {
    redirect(
      `/modules/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`
    );
  };

  const transform = (data: any) => {
    switch (data.type) {
      case "concrete":
        delete data.goals;
        delete data.groupCorrelator;
        break;
      case "abstr":
        delete data.externalActivityId;
        delete data.groupCorrelator;
        break;
      case "group":
        delete data.externalActivityId;
        delete data.goals;
        break;
    }

    return {
      ...data,
      domainId,
      learningFragmentId,
    };
  };

  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={transform}
      title="titlePages.activities.create"
    >
      <BackButton />
      <SimpleForm
        sx={{
          "& .MuiStack-root": {
            rowGap: "0.5rem",
          },
        }}
      >
        <ActivityCreateForm />
      </SimpleForm>
    </Create>
  );
};
