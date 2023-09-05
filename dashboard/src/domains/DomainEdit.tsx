import { BackButton } from "@dslab/ra-back-button";
import {
  Edit,
  SimpleForm,
  TextInput,
  TopToolbar,
  required,
  useRecordContext,
  useTranslate,
} from "react-admin";
import { Title } from "../Title";

const PostCreateActions = () => (
  <TopToolbar>
    <BackButton />
  </TopToolbar>
);

export const DomainEdit = () => {
  return (
    <>
      <Edit
        actions={<PostCreateActions />}
        title={<Title translationKey="titlePages.domains.edit" />}
      >
        <SimpleForm>
          <TextInput source="title" validate={[required()]} fullWidth label="resources.domains.title" />
        </SimpleForm>
      </Edit>
    </>
  );
};
