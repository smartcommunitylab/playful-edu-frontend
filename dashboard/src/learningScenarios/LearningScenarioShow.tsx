import {
  BooleanField,
  ChipField,
  Datagrid,
  EditButton,
  ReferenceArrayField,
  Show,
  ShowButton,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TopToolbar,
  useGetRecordId,
} from "react-admin";
import { useParams } from "react-router-dom";
import { LearnerList } from "../learners/LearnerList";
import { Title } from "../Title";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${recordId}/element/edit`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <EditButton to={to}></EditButton>
      </TopToolbar>
    </>
  );
};
export const LearnerScenarioList = () => {};

export const LearningScenarioShow = () => {
  return (
    <Show
      actions={<PostShowActions />}
      title={<Title translationKey="titlePages.learningScenarios.show" />}
    >
      <SimpleShowLayout>
        <TextField source="title" label="resources.learningScenarios.title"/>
        <TextField source="desc" label="resources.learningScenarios.description"/>
        <TextField source="language" label="resources.learningScenarios.language"/>
        <BooleanField source="publicScenario" label="resources.learningScenarios.publicScenario"/>
        <ReferenceArrayField
          label="resources.learningScenarios.educators"
          reference="educators"
          source="educators"
        >
          <SingleFieldList linkType={false}>
            <ChipField source="email" />
          </SingleFieldList>
        </ReferenceArrayField>
      </SimpleShowLayout>
    </Show>
  );
};
