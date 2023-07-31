import {
  BooleanInput,
  Create,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
  useRecordContext,
  useRedirect,
} from "react-admin";
import { useSearchParams } from "react-router-dom";
import { COMPOSED_ACTIVITY_URL_PARAM, DOMAIN_URL_PARAM, FRAGMENT_URL_PARAM, MODULO_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const ActivityCreate = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const learningScenarioId = searchParams.get(SCENARIO_URL_PARAM);
  const moduleId = searchParams.get(MODULO_URL_PARAM);
  const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
  const composedActivityId = searchParams.get(COMPOSED_ACTIVITY_URL_PARAM);
    const record = useRecordContext();
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/activities?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${learningScenarioId}&${MODULO_URL_PARAM}=${moduleId}&${FRAGMENT_URL_PARAM}=${fragmentId}}&${COMPOSED_ACTIVITY_URL_PARAM}=${composedActivityId}`);
    };
  return (
    <Create mutationOptions={{ onSuccess }} transform={(data: any) => ({ ...data, domainId,learningScenarioId,moduleId,fragmentId,composedActivityId })}>
      <BackButton />
      <SimpleForm>
        <TextInput source="title" validate={[required()]} fullWidth />
        <TextInput source="desc" />
        <BooleanInput source="group" />
        <SelectInput
          source="type"
          choices={[
            { id: "concrete", name: "Concreta" },
            { id: "abstract", name: "Astratta" },
          ]}
        />
        {record.type && record.type == "concrete" && (
          <TextInput source="concrete" />
        )}
        {record.type && record.type == "abstract" && (
          <TextInput source="abstract" />
        )}
      </SimpleForm>
    </Create>
  );
};
