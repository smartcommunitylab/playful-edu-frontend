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
  useGetList,
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
    <Toolbar
      {...props}
      sx={{
        justifyContent: "space-between",
      }}
    >
      <SaveButton />
      <DeleteButton
        redirect={to}
        confirmTitle={
          <Title translationKey="titlePages.externalActivities.delete" />
        }
      />
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

  const { total } = useGetList("concepts", {
    meta: { domainId },
  });

  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      transform={(data: any) => ({ ...data, domainId })}
      mutationMode="pessimistic"
      title={<Title translationKey="titlePages.externalActivities.edit" />}
    >
      <SimpleForm
        toolbar={<EditToolbar />}
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
          label="resources.externalActivities.title"
        />
        <TextInput
          source="desc"
          fullWidth
          multiline={true}
          label="resources.externalActivities.description"
        />
        <TextInput
          source="language"
          fullWidth
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
          fullWidth
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
          fullWidth
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
          fullWidth
          label="resources.externalActivities.difficulty"
        />
        <TextInput source="extId" fullWidth />
        <TextInput source="extGroupId" fullWidth />
        <TextInput
          source="extUrl"
          type="url"
          fullWidth
          label="resources.externalActivities.url"
        />
        <TextInput
          source="groupCorrelator"
          fullWidth
          label="resources.externalActivities.groupCorrelator"
        />
        <ReferenceArrayInput
          source="preconditions"
          reference="concepts"
          queryOptions={{ meta: { domainId } }}
          perPage={total}
        >
          <AutocompleteArrayInput label="resources.externalActivities.preconditions" fullWidth />
        </ReferenceArrayInput>
        <ReferenceArrayInput
          source="effects"
          reference="concepts"
          queryOptions={{ meta: { domainId } }}
          perPage={total}
        >
          <AutocompleteArrayInput label="resources.externalActivities.effects" fullWidth />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};
