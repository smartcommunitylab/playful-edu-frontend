import {
  DeleteButton,
  Edit,
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
import { useParams } from "react-router-dom";
import { ActivityList } from "../activities/ActivityList";
import { Title } from "../Title";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const to = `/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${recordId}`;
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
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`;
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
          <Title translationKey="titlePages.learningFragments.delete" />
        }
      />
    </Toolbar>
  );
};

export const FragmentEdit = () => {
  const translate = useTranslate();
  const redirect = useRedirect();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const onSuccess = () => {
    redirect(
      `/modules/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`
    );
  };

  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      mutationMode="pessimistic"
      title={<Title translationKey="titlePages.learningFragments.edit" />}
    >
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          source="title"
          validate={[required()]}
          fullWidth
          label="resources.learningFragments.title"
        />
        <SelectInput
          source="type"
          choices={[
            {
              id: "singleton",
              name: translate(
                "resources.learningFragments.typeSelection.singleton"
              ),
            },
            {
              id: "set",
              name: translate("resources.learningFragments.typeSelection.set"),
            },
            {
              id: "list",
              name: translate("resources.learningFragments.typeSelection.list"),
            },
          ]}
          label="resources.learningFragments.type"
        />
      </SimpleForm>
    </Edit>
  );
};
