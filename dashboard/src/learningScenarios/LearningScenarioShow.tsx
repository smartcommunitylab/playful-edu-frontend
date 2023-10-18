import {
  Button,
  ChipField,
  EditButton,
  Labeled,
  ReferenceArrayField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TopToolbar,
  useDataProvider,
  useGetRecordId,
  useInput,
  useNotify,
  useShowContext,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { Title } from "../Title";
import { Chip } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useMutation } from "react-query";

const StartButton = () => {
  const { record, refetch } = useShowContext();
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const handleClickEvent = async () => {
    await dataProvider.runScenario(record.id);
    refetch();
  };

  const { mutate, isLoading } = useMutation(handleClickEvent);

  const onSuccess = () => {
    notify("resources.learningScenarios.statusNotification.success", {
      type: "success",
    });
  };

  const onError = () => {
    notify("resources.learningScenarios.statusNotification.error", {
      type: "error",
    });
  };

  return (
    <Button
      color="primary"
      onClick={() =>
        mutate(undefined, {
          onSuccess,
          onError,
        })
      }
      label="resources.learningScenarios.start"
      disabled={record?.running || isLoading}
    >
      <PlayArrowIcon />
    </Button>
  );
};

const PostShowActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${recordId}/element/edit`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <StartButton></StartButton>
        <EditButton to={to}></EditButton>
      </TopToolbar>
    </>
  );
};

const ShowLayout = () => {
  const translate = useTranslate();
  const { record } = useShowContext();

  return (
    <SimpleShowLayout>
      <TextField source="title" label="resources.learningScenarios.title" />
      <TextField
        source="desc"
        label="resources.learningScenarios.description"
      />

      <TextField
        source="language"
        label="resources.learningScenarios.language"
      />

      <Labeled label="resources.learningScenarios.publicScenario">
        <Chip
          label={
            record?.publicScenario
              ? translate(
                  "resources.learningScenarios.publicScenarioOption.public"
                )
              : translate(
                  "resources.learningScenarios.publicScenarioOption.private"
                )
          }
        />
      </Labeled>

      <Labeled label="resources.learningScenarios.status">
        <Chip
          label={
            record?.running
              ? translate("resources.learningScenarios.statusOption.inProgress")
              : translate("resources.learningScenarios.statusOption.toStart")
          }
          color={record?.running ? "success" : "error"}
          className="chip"
        />
      </Labeled>

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
  );
};

export const LearningScenarioShow = () => {
  return (
    <Show
      actions={<PostShowActions />}
      title={<Title translationKey="titlePages.learningScenarios.show" />}
    >
      <ShowLayout />
    </Show>
  );
};
