import {
  ChipField,
  EditButton,
  ReferenceArrayField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TopToolbar,
  useGetRecordId,
  useRecordContext,
  useRedirect,
} from "react-admin";
import { useParams } from "react-router-dom";
import { DOMAIN_URL_PARAM } from "../constants";
import { BackButton } from "@dslab/ra-back-button";
import { Title } from "../Title";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/external-activities/d/${domainId}/${recordId}/edit`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <EditButton to={to}></EditButton>
      </TopToolbar>
    </>
  );
};

export const ExternalActivityShow = () => {
  return (
    <Show
      actions={<PostShowActions />}
      title={<Title translationKey="titlePages.externalActivities.show" />}
    >
      <BackButton />
      <SimpleShowLayout>
        <TextField source="title" label="resources.externalActivities.title" />
        <TextField
          source="desc"
          label="resources.externalActivities.description"
        />
        <TextField
          source="language"
          label="resources.externalActivities.language"
        />
        <TextField source="extId" />
        <TextField source="extGroupId" />
        <TextField source="extUrl" label="resources.externalActivities.url" />
        <TextField source="type" label="resources.externalActivities.type" />
        <TextField source="tool" label="resources.externalActivities.tool" />
        <TextField
          source="difficulty"
          label="resources.externalActivities.difficulty"
        />
        <TextField
          source="groupCorrelator"
          label="resources.externalActivities.groupCorrelator"
        />
        <ReferenceArrayField
          source="preconditions"
          reference="concepts"
          label="resources.externalActivities.preconditions"
        >
          <SingleFieldList linkType={false}>
            <ChipField source="title" />
          </SingleFieldList>
        </ReferenceArrayField>
        <ReferenceArrayField
          source="effects"
          reference="concepts"
          label="resources.externalActivities.effects"
        >
          <SingleFieldList linkType={false}>
            <ChipField source="title" />
          </SingleFieldList>
        </ReferenceArrayField>
      </SimpleShowLayout>
    </Show>
  );
};
