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
            translationKey="titlePages.educators.delete"
          />
        }
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
      title={<Title translationKey="titlePages.educators.edit" />}
    >
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          source="firstname"
          validate={[required()]}
          fullWidth
          label="resources.educators.firstname"
        />
        <TextInput
          source="lastname"
          multiline={true}
          label="resources.educators.lastname"
        />
        <TextInput
          source="email"
          type="email"
          label="resources.educators.email"
        />
        <TextInput source="nickname" label="resources.educators.nickname" />
      </SimpleForm>
    </Edit>
  );
};
