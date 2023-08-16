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
  const to = `/educators/d/${params.domainId}/${recordId}`;
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
export const EducatorEdit = () => {
  const params = useParams();
  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/educators/d/${params.domainId}`);
  };
  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      transform={(data: any) => ({ ...data, domainId: params.domainId })}
      mutationMode="pessimistic"
    >
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          source="firstname"
          validate={[required()]}
          fullWidth
          label="resources.educator.firstname"
        />
        <TextInput
          source="lastname"
          multiline={true}
          label="resources.educator.lastname"
        />
        <TextInput
          source="email"
          type="email"
          label="resources.educator.email"
        />
        <TextInput source="nickname" label="resources.educator.nickname" />
      </SimpleForm>
    </Edit>
  );
};
