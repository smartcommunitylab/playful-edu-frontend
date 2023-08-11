import {
  Edit,
  ReferenceArrayInput,
  SelectInput,
  ShowButton,
  SimpleForm,
  TextInput,
  TopToolbar,
  required,
  useGetRecordId,
  useRedirect,
  useStore,
} from "react-admin";
import { useParams } from "react-router-dom";
import {
  DOMAIN_URL_PARAM,
  FRAGMENT_URL_PARAM,
  MODULO_URL_PARAM,
  SCENARIO_URL_PARAM,
} from "../constants";
const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const moduleId = params.moduleId;
  const fragmentId = params.fragmentId;
  const to = `/composed-activities//d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}/${recordId}`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <ShowButton to={to}></ShowButton>
      </TopToolbar>
    </>
  );
};
export const ComposedActivityEdit = () => {
  const params = useParams();
  const redirect = useRedirect();
  const domainId =params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const moduleId = params.moduleId;
  const fragmentId = params.fragmentId;
  const onSuccess = () => {
    redirect(
      `/composed-activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}`
    );
  };
  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      transform={(data: any) => ({ ...data, domainId })}
    >
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
    </Edit>
  );
};
