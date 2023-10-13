import {
  Create,
  FormDataConsumer,
  NumberInput,
  SelectInput,
  SimpleForm,
  TextInput,
  minValue,
  required,
  useRedirect,
  useTranslate,
} from "react-admin";
import { BackButton } from "@dslab/ra-back-button";
import { useParams } from "react-router-dom";
import { ActivityList } from "../activities/ActivityList";

export const FragmentCreate = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(
      `/modules/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`
    );
  };

  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data: any) => ({ ...data, domainId, learningModuleId })}
      title="titlePages.learningFragments.create"
    >
      <BackButton />
      <SimpleForm>
        <TextInput
          source="title"
          validate={[required()]}
          fullWidth
          label="resources.learningFragments.title"
        />
        <SelectInput
          source="type"
          choices={[
            {
              id: "singleton",
              name: "resources.learningFragments.typeSelection.singleton",
            },
            {
              id: "set",
              name: "resources.learningFragments.typeSelection.set",
            },
            {
              id: "list",
              name: "resources.learningFragments.typeSelection.list",
            },
          ]}
          label="resources.learningFragments.type"
          sx={{ minWidth: "265px" }}
        />
        <SelectInput
          source="setCompletionRule"
          choices={[
            {
              id: "all",
              name: "resources.learningFragments.ruleSelection.all",
            },
            {
              id: "at_least",
              name: "resources.learningFragments.ruleSelection.at_least",
            },
          ]}
          label="resources.learningFragments.rule"
          sx={{ minWidth: "265px" }}
        />
        <FormDataConsumer>
          {({ formData, ...rest }) => {
            if (
              formData.setCompletionRule &&
              formData.setCompletionRule == "at_least"
            )
              return (
                <NumberInput
                  source="minActivities"
                  validate={minValue(1, "resources.validation.minValue")}
                  label="resources.learningFragments.minimumNumberOfActivities"
                  sx={{ minWidth: "265px" }}
                ></NumberInput>
              );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
};
