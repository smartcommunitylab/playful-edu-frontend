import {
  DateInput,
  DeleteButton,
  Edit,
  SaveButton,
  ShowButton,
  SimpleForm,
  TextInput,
  Toolbar,
  TopToolbar,
  required,
  useGetRecordId,
  useRedirect,
} from "react-admin";
import { useParams } from "react-router-dom";
import { DOMAIN_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { FragmentEdit } from "../fragments/FragmentEdit";
import { Title } from "../Title";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const to = `/modules/d/${domainId}/s/${learningScenarioId}/m/${recordId}`;
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

  const to = `/modules/d/${domainId}/s/${learningScenarioId}`;
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
            translationKey="titlePages.modules.delete"
          />
        }
      />
    </Toolbar>
  );
};

export const ModuleEdit = () => {
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/modules/d/${domainId}/s/${learningScenarioId}`);
  };

  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      transform={(data: any) => ({ ...data, domainId, learningScenarioId })}
      mutationMode="pessimistic"
      title={<Title translationKey="titlePages.modules.edit" />}
    >
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          source="title"
          validate={[required()]}
          fullWidth
          label="resources.modules.title"
        />
        <TextInput source="desc" label="resources.modules.description" />
        <TextInput source="level" label="resources.modules.level" />
        <DateInput source="dateFrom" label="resources.modules.dateFrom" />
        <DateInput source="dateTo" label="resources.modules.dateTo" />
        {/* <FragmentEdit /> */}
      </SimpleForm>
    </Edit>
  );
};
