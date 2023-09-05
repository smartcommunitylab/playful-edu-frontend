import {
  AutocompleteArrayInput,
  BooleanInput,
  Create,
  ReferenceArrayInput,
  SimpleForm,
  TextInput,
  required,
  useRedirect,
  useStore,
  useTranslate,
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { BackButton } from "@dslab/ra-back-button";

export const LearningScenarioCreate = () => {
  const params = useParams();
  const domainId = params.domainId;
  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/scenarios/d/${domainId}`);
  };
  const translate = useTranslate();

  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data: any) => ({ ...data, domainId })}
      title="titlePages.learningScenarios.create"
    >
      <BackButton />
      <SimpleForm>
        <TextInput
          source="title"
          validate={[required()]}
          fullWidth
          label="resources.learningScenarios.title"
        />
        <TextInput
          source="desc"
          label="resources.learningScenarios.description"
        />
        <TextInput
          source="language"
          label="resources.learningScenarios.language"
        />
        <BooleanInput
          source="publicScenario"
          label="resources.learningScenarios.publicScenario"
        />
        <ReferenceArrayInput
          source="educators"
          reference="educators"
          queryOptions={{ meta: { domainId } }}
        >
          <AutocompleteArrayInput label="resources.learningScenarios.educators" />
        </ReferenceArrayInput>
        {/* <ReferenceArrayInput source="learners" reference="learners" queryOptions={{ meta: { domainId } }}/> */}
      </SimpleForm>
    </Create>
  );
};
