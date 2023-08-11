import {
  Create,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
  useRedirect,
} from "react-admin";
import { useParams } from "react-router-dom";
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const ComposedActivityCreate = () => {
  const params = useParams();
  const redirect = useRedirect();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const moduleId = params.moduleId;
  const fragmentId = params.fragmentId;
  const onSuccess = () => {
    redirect(
      `/composed-activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}`
    );
  };
  return (
    <Create
      mutationOptions={{ onSuccess }}
      redirect="list"
      transform={(data: any) => ({ ...data, domainId, fragmentId })}
    >
      <BackButton />
      <SimpleForm>
        <TextInput
          source="title"
          label="resources.composedActivity.title"
          validate={[required()]}
          fullWidth
        />
        <SelectInput
          source="type"
          choices={[
            { id: "singleton", name: "Singola" },
            { id: "set", name: "set" },
            { id: "list", name: "list" },
          ]}
        />
      </SimpleForm>
    </Create>
  );
};
