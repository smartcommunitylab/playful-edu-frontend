import { BackButton } from "@dslab/ra-back-button";
import {
  DeleteButton,
  Edit,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
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

const EditToolbar = (props: any) => {
  const to = `/domains`;
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
            translationKey="titlePages.domains.delete"
          />
        }
      />
    </Toolbar>
  );
};

export const DomainEdit = () => {
  return (
    <>
      <Edit
        actions={<PostCreateActions />}
        title={<Title translationKey="titlePages.domains.edit" />}
        mutationMode="pessimistic"
      >
        <SimpleForm toolbar={<EditToolbar />}>
          <TextInput source="title" validate={[required()]} fullWidth label="resources.domains.title" />
        </SimpleForm>
      </Edit>
    </>
  );
};
