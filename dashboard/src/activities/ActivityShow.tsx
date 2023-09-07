import {
  ChipField,
  EditButton,
  FormDataConsumer,
  FunctionField,
  ReferenceArrayField,
  ReferenceField,
  ReferenceInput,
  SelectField,
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
import {
  ACTIVITY_URL_PARAM,
  COMPOSED_ACTIVITY_URL_PARAM,
  DOMAIN_URL_PARAM,
  FRAGMENT_URL_PARAM,
  MODULO_URL_PARAM,
  SCENARIO_URL_PARAM,
} from "../constants";
import { useParams } from "react-router-dom";
import { Title } from "../Title";

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const learningScenarioId = params.learningScenarioId;
  const learningModuleId = params.learningModuleId;
  const learningFragmentId = params.learningFragmentId;
  const to = `/activities/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}/a/${recordId}/edit`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <EditButton to={to}></EditButton>
      </TopToolbar>
    </>
  );
};

export const ActivityLayout = () => {
  const record = useRecordContext();
  const translate = useTranslate();

  let field = null;
  if (record && record.type === "abstr") {
    field = (
      <ReferenceArrayField
        label="resources.activities.goals"
        reference="concepts"
        source="goals"
      >
        <SingleFieldList linkType={false}>
          <ChipField source="title" />
        </SingleFieldList>
      </ReferenceArrayField>
    );
  } else if (record && record.type === "concrete") {
    field = (
      <ReferenceField
        label="resources.activities.externalActivity"
        reference="external-activities"
        source="externalActivityId"
      >
        <ChipField source="title" />
      </ReferenceField>
    );
  } else if (record && record.type === "group") {
    field = (
      <TextField
        source="groupCorrelator"
        label="resources.activities.groupCorrelator"
      />
    );
  }

  return (
    <>
      <SimpleShowLayout>
        <TextField source="title" label="resources.activities.title" />
        <TextField source="desc" label="resources.activities.description" />
        <FunctionField
          label="resources.activities.type"
          render={(record: any) =>
            translate("resources.activities.typeSelection." + record.type)
          }
        />
        {field}
      </SimpleShowLayout>
    </>
  );
};

export const ActivityShow = () => {
  return (
    <Show
      actions={<PostShowActions />}
      title={<Title translationKey="titlePages.activities.show" />}
    >
      <ActivityLayout />
    </Show>
  );
};
