import {
  ArrayField,
  ChipField,
  Datagrid,
  EditButton,
  FunctionField,
  ReferenceArrayField,
  ReferenceManyField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TopToolbar,
  useGetRecordId,
  useRecordContext,
  useRedirect,
  useTranslate,
} from "react-admin";
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { BackButton } from "@dslab/ra-back-button";
import { Title } from "../Title";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/competences/d/${domainId}/${recordId}/edit`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <EditButton to={to}></EditButton>
      </TopToolbar>
    </>
  );
};

export const CompetencesShow = () => {
  const translate = useTranslate();

  return (
    <Show
      actions={<PostShowActions />}
      title={<Title translationKey="titlePages.competences.show" />}
    >
      <BackButton />
      <SimpleShowLayout>
        <TextField source="title" label="resources.competences.title" />
        <TextField source="desc" label="resources.competences.description" />
        <FunctionField
          label="resources.competences.type"
          render={(record: any) =>
            record && record.type
              ? translate(
                  "resources.competences.knowledgeSelection." + record.type
                )
              : ""
          }
        />
        <ReferenceArrayField
          label="resources.competences.concepts"
          reference="concepts"
          source="concepts"
        >
          <SingleFieldList linkType={false}>
            <ChipField source="title" />
          </SingleFieldList>
        </ReferenceArrayField>
      </SimpleShowLayout>
    </Show>
  );
};
