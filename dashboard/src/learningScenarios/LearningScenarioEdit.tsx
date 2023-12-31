import {
  AutocompleteArrayInput,
  DeleteButton,
  Edit,
  Labeled,
  ReferenceArrayInput,
  SaveButton,
  ShowButton,
  SimpleForm,
  TextInput,
  Toolbar,
  TopToolbar,
  required,
  useGetList,
  useGetRecordId,
  useInput,
  useRedirect,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { Title } from "../Title";
import { Chip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const PostEditActions = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}/s/${recordId}/element`;
  if (!recordId) return null;
  return (
    <>
      <TopToolbar>
        <ShowButton to={to}></ShowButton>
      </TopToolbar>
    </>
  );
};

const EditToolbar = (props: any) => {
  const params = useParams();
  const domainId = params.domainId;
  const to = `/scenarios/d/${domainId}`;
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
          <Title translationKey="titlePages.learningScenarios.delete" />
        }
      />
    </Toolbar>
  );
};

const ScenarioInput = (props: { source: string; label: string }) => {
  const translate = useTranslate();
  const { field } = useInput({
    source: props.source,
  });
  const fieldValue = field.value;

  const publicIcon = fieldValue ? (
    <CheckIcon sx={{ zIndex: 1, pointerEvents: "none" }} />
  ) : undefined;
  const privateIcon = fieldValue ? undefined : (
    <CheckIcon sx={{ zIndex: 1, pointerEvents: "none" }} />
  );

  return (
    <Labeled
      label="resources.learningScenarios.publicScenario"
    >
      <>
        <div style={{ padding: "5px 0 20px 0px" }}>
          <Chip
            label={translate(
              "resources.learningScenarios.publicScenarioOption.public"
            )}
            variant={fieldValue ? "filled" : "outlined"}
            onClick={() => field.onChange(true)}
            icon={publicIcon}
            sx={{
              cursor: "pointer",
              marginRight: "8px",
              height: "36px",
              borderRadius: "20px",
              border: fieldValue
                ? "1px solid rgba(0, 0, 0, 0.3)"
                : "1px solid rgba(0, 0, 0, 0.2)",
              "& .MuiChip-label": {
                fontSize: "0.95rem",
                color: fieldValue ? "rgba(0, 0, 0, 0.87)" : "rgba(0, 0, 0, 0.6)",
              },
              "& .MuiChip-icon": {
                fontSize: "1.25rem",
                marginLeft: "10px",
                marginRight: "-5px",
                color: "rgba(0, 0, 0, 0.87)",
              },
            }}
          />
          
          <Chip
            label={translate(
              "resources.learningScenarios.publicScenarioOption.private"
            )}
            variant={!fieldValue ? "filled" : "outlined"}
            onClick={() => field.onChange(false)}
            icon={privateIcon}
            sx={{
              cursor: "pointer",
              height: "36px",
              borderRadius: "20px",
              border: !fieldValue
                ? "1px solid rgba(0, 0, 0, 0.3)"
                : "1px solid rgba(0, 0, 0, 0.2)",
              "& .MuiChip-label": {
                fontSize: "0.95rem",
                color: !fieldValue ? "rgba(0, 0, 0, 0.87)" : "rgba(0, 0, 0, 0.6)",
              },
              "& .MuiChip-icon": {
                fontSize: "1.25rem",
                marginLeft: "10px",
                marginRight: "-5px",
                color: "rgba(0, 0, 0, 0.87)",
              },
            }}
          />
        </div>
      </>
    </Labeled>
  );
};

export const LearningScenarioEdit = () => {
  const recordId = useGetRecordId();
  const params = useParams();
  const domainId = params.domainId;
  const redirect = useRedirect();
  const onSuccess = () => {
    redirect(`/scenarios/d/${domainId}`);
  };

  const { total } = useGetList("educators", {
    meta: { domainId },
  });

  return (
    <Edit
      mutationOptions={{ onSuccess }}
      actions={<PostEditActions />}
      transform={(data: any) => ({ ...data, domainId })}
      mutationMode="pessimistic"
      title={<Title translationKey="titlePages.learningScenarios.edit" />}
    >
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          source="title"
          validate={[required()]}
          fullWidth
          label="resources.learningScenarios.title"
        />
        <TextInput
          source="desc"
          label="resources.learningScenarios.description"
        />
        <TextInput
          source="language"
          label="resources.learningScenarios.language"
        />
        <ScenarioInput
          source="publicScenario"
          label="resources.learningScenarios.publicScenario"
        />
        <ReferenceArrayInput
          source="educators"
          reference="educators"
          queryOptions={{ meta: { domainId } }}
          perPage={total}
        >
          <AutocompleteArrayInput label="resources.learningScenarios.educators" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};
