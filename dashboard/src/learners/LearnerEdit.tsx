import {
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
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/learners/d/${domainId}/${recordId}`;
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
  const to = `/educators/d/${domainId}`;
  return (
    <Toolbar {...props}>
      <SaveButton />
      <DeleteButton redirect={to} />
    </Toolbar>
  );
};
export const LearnerEdit = () => {
  const params = useParams();
  const domainId = params.domainId;
  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/educators/d/${params.domainId}`);
  };
  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      transform={(data: any) => ({ ...data, domainId })}
      mutationMode="pessimistic"
    >
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          source="firstname"
          validate={[required()]}
          fullWidth
          label="resources.learner.firstname"
        />
        <TextInput
          source="lastname"
          multiline={true}
          label="resources.learner.lastname"
        />
        <TextInput
          source="email"
          type="email"
          label="resources.learner.email"
        />
        <TextInput source="nickname" label="resources.learner.nickname" />
      </SimpleForm>
    </Edit>
  );
};
