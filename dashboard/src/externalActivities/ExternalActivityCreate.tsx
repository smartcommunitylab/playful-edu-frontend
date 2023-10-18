import {
  AutocompleteArrayInput,
  Create,
  ReferenceArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
  useGetList,
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

  const { total } = useGetList("concepts", {
    meta: { domainId },
  });

  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data: any) => ({ ...data, domainId })}
      title="titlePages.externalActivities.create"
    >
      <BackButton />
      <SimpleForm>
        <TextInput
          source="title"
          validate={[required()]}
          fullWidth
          label="resources.externalActivities.title"
        />
        <TextInput
          source="desc"
          fullWidth
          label="resources.externalActivities.description"
        />
        <TextInput
          source="language"
          label="resources.externalActivities.language"
        />
        <SelectInput
          source="type"
          choices={[
            {
              id: "individual",
              name: translate(
                "resources.externalActivities.typeSelection.individual"
              ),
            },
          ]}
          label="resources.externalActivities.type"
        />
        <SelectInput
          source="tool"
          choices={[
            {
              id: "computer",
              name: translate(
                "resources.externalActivities.toolSelection.computer"
              ),
            },
          ]}
          label="resources.externalActivities.tool"
        />
        <SelectInput
          source="difficulty"
          choices={[
            {
              id: "low",
              name: translate(
                "resources.externalActivities.difficultySelection.low"
              ),
            },
          ]}
          label="resources.externalActivities.difficulty"
        />
        <TextInput source="extId" />
        <TextInput source="extGroupId" />
        <TextInput
          source="extUrl"
          type="url"
          label="resources.externalActivities.url"
        />
        <TextInput
          source="groupCorrelator"
          label="resources.externalActivities.groupCorrelator"
        />
        <ReferenceArrayInput
          source="preconditions"
          reference="concepts"
          queryOptions={{ meta: { domainId } }}
          perPage={total}
        >
          <AutocompleteArrayInput label="resources.externalActivities.preconditions" />
        </ReferenceArrayInput>
        <ReferenceArrayInput
          source="effects"
          reference="concepts"
          queryOptions={{ meta: { domainId } }}
          perPage={total}
        >
          <AutocompleteArrayInput label="resources.externalActivities.effects" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  );
};
