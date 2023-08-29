import {
  Create,
  ReferenceArrayInput,
  SelectInput,
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

export const ExternalActivityCreate = () => {
  const params = useParams();
  const domainId = params.domainId;
  const redirect = useRedirect();
  const translate = useTranslate();

  const onSuccess = () => {
    redirect(`/external-activities/d/${domainId}`);
  };
  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data: any) => ({ ...data, domainId })}
    >
      <BackButton />
      <SimpleForm>
        <TextInput source="title" validate={[required()]} fullWidth />
        <TextInput source="desc" fullWidth />
        <TextInput source="language" />
        <TextInput source="extId" />
        <TextInput source="extGroupId" />
        <TextInput source="extUrl" type="url" />
        <SelectInput
          source="type"
          choices={[
            {
              id: "individual",
              name: translate(
                "resources.externalActivity.typeSelection.individual"
              ),
            },
          ]}
        />
        <SelectInput
          source="tool"
          choices={[
            {
              id: "computer",
              name: translate(
                "resources.externalActivity.toolSelection.computer"
              ),
            },
          ]}
        />
        <SelectInput
          source="difficulty"
          choices={[
            {
              id: "low",
              name: translate(
                "resources.externalActivity.difficultySelection.low"
              ),
            },
          ]}
        />
        <TextInput source="groupCorrelator" />
        <ReferenceArrayInput
          source="preconditions"
          reference="concepts"
          queryOptions={{ meta: { domainId } }}
        />
        <ReferenceArrayInput
          source="effects"
          reference="concepts"
          queryOptions={{ meta: { domainId } }}
        />
      </SimpleForm>
    </Create>
  );
};
