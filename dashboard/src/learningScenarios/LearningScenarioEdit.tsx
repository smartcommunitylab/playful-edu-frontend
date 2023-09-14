import {
  AutocompleteArrayInput,
  BooleanInput,
  DeleteButton,
  Edit,
  ReferenceArrayInput,
  SaveButton,
  ShowButton,
  SimpleForm,
  TextInput,
  Toolbar,
  TopToolbar,
  required,
  useGetList,
  useGetRecordId,
  useRedirect,
  useStore,
} from "react-admin";
import { useParams } from "react-router-dom";
import { Title } from "../Title";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${recordId}/element`;
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
  const to = `/scenarios/d/${domainId}`;
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
          <Title
            translationKey="titlePages.learningScenarios.delete"
          />
        }
      />
    </Toolbar>
  );
};

export const LearningScenarioEdit = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/scenarios/d/${domainId}`);
  };

  const { total } = useGetList("educators", {
    meta: { domainId },
  });

  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      transform={(data: any) => ({ ...data, domainId })}
      mutationMode="pessimistic"
      title={<Title translationKey="titlePages.learningScenarios.edit" />}
    >
      <SimpleForm toolbar={<EditToolbar />}>
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
          perPage={total}
        >
          <AutocompleteArrayInput label="resources.learningScenarios.educators" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};
