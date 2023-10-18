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
  useRecordContext,
  useRedirect,
  useTranslate,
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
  const to = `/learners/d/${domainId}`;
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
        confirmTitle={<Title translationKey="titlePages.learners.delete" />}
      />
    </Toolbar>
  );
};

const Title = ({ translationKey }: { translationKey: string }) => {
  const translate = useTranslate();
  const record = useRecordContext();
  const fullName = record
    ? '"' +
      record.firstname +
      (record.lastname ? " " + record.lastname : "") +
      '"'
    : "";
  const title = translate(translationKey) + " " + fullName;

  return title;
};

export const LearnerEdit = () => {
  const params = useParams();
  const domainId = params.domainId;
  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/learners/d/${params.domainId}`);
  };
  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      transform={(data: any) => ({ ...data, domainId })}
      mutationMode="pessimistic"
      title={<Title translationKey="titlePages.learners.edit" />}
    >
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          source="firstname"
          validate={[required()]}
          fullWidth
          label="resources.learners.firstname"
        />
        <TextInput
          source="lastname"
          multiline={true}
          label="resources.learners.lastname"
        />
        <TextInput
          source="email"
          type="email"
          label="resources.learners.email"
        />
        <TextInput source="nickname" label="resources.learners.nickname" />
      </SimpleForm>
    </Edit>
  );
};
