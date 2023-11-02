import {
  AutocompleteArrayInput,
  Create,
  ReferenceArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
  useGetList,
  useRedirect,
  useStore,
  useTranslate,
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { BackButton } from "@dslab/ra-back-button";

export const CompetencesCreate = () => {
  const params = useParams();
  const redirect = useRedirect();
  const translate = useTranslate();
  const domainId = params.domainId;
  const onSuccess = () => {
    redirect(`/competences/d/${domainId}`);
  };

  const { total } = useGetList("concepts", {
    meta: { domainId },
  });

  return (
    <Create
      mutationOptions={{ onSuccess }}
      transform={(data: any) => ({ ...data, domainId })}
      title="titlePages.competences.create"
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
          source="title"
          label="resources.competences.title"
          validate={[required()]}
          fullWidth
        />
        <TextInput
          source="desc"
          label="resources.competences.description"
          fullWidth
          multiline={true}
        />
        <SelectInput
          source="type"
          choices={[
            {
              id: "knowledge",
              name: translate(
                "resources.competences.knowledgeSelection.knowledge"
              ),
            },
          ]}
          fullWidth
          label="resources.competences.type"
        />
        <ReferenceArrayInput
          source="concepts"
          reference="concepts"
          queryOptions={{ meta: { domainId } }}
          perPage={total}
        >
          <AutocompleteArrayInput
            label="resources.competences.concepts"
            fullWidth
          />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  );
};
