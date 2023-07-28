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
import { useSearchParams } from "react-router-dom";
import {
  DOMAIN_URL_PARAM,
  FRAGMENT_URL_PARAM,
  MODULO_URL_PARAM,
  SCENARIO_URL_PARAM,
} from "../constants";
const PostEditActions = () => {
  const recordId = useGetRecordId();
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduleId = searchParams.get(MODULO_URL_PARAM);
  const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
  const to = `/composed-activities/${recordId}/show??${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}&${MODULO_URL_PARAM}=${moduleId}&${FRAGMENT_URL_PARAM}=${fragmentId}`;
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
  const [searchParams, setSearchParams] = useSearchParams();
  const redirect = useRedirect();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduleId = searchParams.get(MODULO_URL_PARAM);
  const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
  const onSuccess = () => {
    redirect(
      `/composed-activities??${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}&${MODULO_URL_PARAM}=${moduleId}&${FRAGMENT_URL_PARAM}=${fragmentId}`
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
