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
} from "react-admin";
import { BackButton } from "@dslab/ra-back-button";
import { useParams } from "react-router-dom";

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

  const transform = (data: any) => {
    if (data.setCompletionRule == "all") {
      delete data.minActivities;
    }

    return {
      ...data,
      domainId,
      learningModuleId,
    };
  };

  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={transform}
      title="titlePages.learningFragments.create"
    >
      <BackButton />
      <SimpleForm
        sx={{
          "& .MuiStack-root": {
            rowGap: "0.5rem",
          },
        }}
      >
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
          validate={required()}
          fullWidth
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
          validate={required()}
          fullWidth
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
                  validate={[
                    required(),
                    minValue(1, "resources.validation.minValue"),
                  ]}
                  label="resources.learningFragments.minimumNumberOfActivities"
                  fullWidth
                ></NumberInput>
              );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
};
