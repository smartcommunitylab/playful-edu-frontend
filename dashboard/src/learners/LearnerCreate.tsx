import {
  Create,
  SimpleForm,
  TextInput,
  email,
  required,
  useRedirect,
  useStore,
  useTranslate,
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { BackButton } from "@dslab/ra-back-button";

export const LearnerCreate = () => {
  const params = useParams();
  const domainId = params.domainId;
  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/learners/d/${domainId}`);
  };
  const translate = useTranslate();

  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data: any) => ({ ...data, domainId })}
      title="titlePages.learners.create"
    >
      <BackButton />
      <SimpleForm
        sx={{
          "& .MuiStack-root": {
            rowGap: "0.5rem",
          },
        }}
      >
        <TextInput
          source="firstname"
          validate={required()}
          fullWidth
          label="resources.learners.firstname"
        />
        <TextInput
          source="lastname"
          validate={required()}
          fullWidth
          label="resources.learners.lastname"
        />
        <TextInput
          source="email"
          validate={[required(), email()]}
          fullWidth
          label="resources.learners.email"
        />
        <TextInput
          source="nickname"
          label="resources.learners.nickname"
          fullWidth
        />
      </SimpleForm>
    </Create>
  );
};
