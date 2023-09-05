import {
  Create,
  SimpleForm,
  TextInput,
  required,
  useRedirect,
  useStore,
  useTranslate,
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { BackButton } from "@dslab/ra-back-button";

export const EducatorCreate = () => {
  const params = useParams();
  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/educators/d/${params.domainId}`);
  };
  const translate = useTranslate();

  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data: any) => ({ ...data, domainId: params.domainId })}
      title="titlePages.educators.create"
    >
      <BackButton />
      <SimpleForm>
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
    </Create>
  );
};
