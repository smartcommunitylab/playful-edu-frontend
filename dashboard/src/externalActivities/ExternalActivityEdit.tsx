import {
  AutocompleteArrayInput,
  DeleteButton,
  Edit,
  ReferenceArrayInput,
  SaveButton,
  SelectInput,
  ShowButton,
  SimpleForm,
  TextInput,
  Toolbar,
  TopToolbar,
  required,
  useGetRecordId,
  useRedirect,
  useTranslate,
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { Title } from "../Title";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/external-activities/d/${domainId}/${recordId}`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <ShowButton to={to}></ShowButton>
      </TopToolbar>
    </>
  );
};

const EditToolbar = (props: any) => {
  const params = useParams();
  const domainId = params.domainId;
  const to = `/external-activities/d/${domainId}`;
  return (
    <Toolbar {...props}>
      <SaveButton />
      <DeleteButton redirect={to} />
    </Toolbar>
  );
};

export const ExternalActivityEdit = () => {
  const params = useParams();
  const domainId = params.domainId;
  const redirect = useRedirect();
  const translate = useTranslate();
  const onSuccess = () => {
    redirect(`/external-activities/d/${domainId}`);
  };
  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      transform={(data: any) => ({ ...data, domainId })}
      mutationMode="pessimistic"
      title={<Title translationKey="titlePages.externalActivities.edit" />}
    >
      <SimpleForm toolbar={<EditToolbar />}>
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
        <TextInput source="extId" />
        <TextInput source="extGroupId" />
        <TextInput
          source="extUrl"
          type="url"
          label="resources.externalActivities.url"
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
        <TextInput
          source="groupCorrelator"
          label="resources.externalActivities.groupCorrelator"
        />
        <ReferenceArrayInput
          source="preconditions"
          reference="concepts"
          queryOptions={{ meta: { domainId } }}
        >
          <AutocompleteArrayInput label="resources.externalActivities.preconditions" />
        </ReferenceArrayInput>
        <ReferenceArrayInput
          source="effects"
          reference="concepts"
          queryOptions={{ meta: { domainId } }}
        >
          <AutocompleteArrayInput label="resources.externalActivities.effects" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};
