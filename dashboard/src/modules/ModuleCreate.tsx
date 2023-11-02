import {
  Create,
  DateInput,
  SimpleForm,
  TextInput,
  required,
  useRedirect,
  useStore,
} from "react-admin";
import { SCENARIO_URL_PARAM, DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { BackButton } from "@dslab/ra-back-button";

export const ModuleCreate = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/modules/d/${domainId}/s/${learningScenarioId}`);
  };

  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data: any) => ({ ...data, domainId, learningScenarioId })}
      title="titlePages.modules.create"
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
          label="resources.modules.title"
        />
        <TextInput
          source="desc"
          label="resources.modules.description"
          fullWidth
          multiline={true}
        />
        <TextInput source="level" label="resources.modules.level" fullWidth />
        <DateInput
          source="dateFrom"
          label="resources.modules.dateFrom"
          fullWidth
        />
        <DateInput source="dateTo" label="resources.modules.dateTo" fullWidth />
      </SimpleForm>
    </Create>
  );
};
