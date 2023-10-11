import {
  BooleanField,
  Button,
  ChipField,
  Datagrid,
  EditButton,
  Labeled,
  ReferenceArrayField,
  Show,
  ShowButton,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TopToolbar,
  useGetRecordId,
  useNotify,
  useRecordContext,
  useTranslate,
} from "react-admin";
import { useParams } from "react-router-dom";
import { Title } from "../Title";
import { Chip } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

const StartButton = () => {
  const record = useRecordContext();
  const API_URL: string = process.env.REACT_APP_API_URL as string;
  const { status, setStatus } = useStatusContex();
  const notify = useNotify();

  const handleStartButtonClick = () => {
    const encodedId = encodeURIComponent(record?.id);
    const url = `${API_URL}/ext/learningscenario/run?id=${encodedId}`;

    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "*/*",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error while starting the scenario");
        } else {
          setStatus(true);
          notify("resources.learningScenarios.statusNotification.success", {
            type: "success",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        notify("resources.learningScenarios.statusNotification.error", {
          type: "error",
        });
      });
  };

  return (
    <Button
      color="primary"
      onClick={() => handleStartButtonClick()}
      label="resources.learningScenarios.start"
      disabled={status}
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
  const record = useRecordContext();
  const translate = useTranslate();
  const { status, setStatus } = useStatusContex();

  const publicScenarioValue = record?.publicScenario;
  const publicScenarioChipLabel = publicScenarioValue
    ? translate("resources.learningScenarios.publicScenarioOption.public")
    : translate("resources.learningScenarios.publicScenarioOption.private");

  useLayoutEffect(() => {
    setStatus(record?.running);
  }, [record?.running]);

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
        <Chip label={publicScenarioChipLabel} />
      </Labeled>

      <Labeled label="resources.learningScenarios.status">
        <Chip
          label={
            status
              ? translate("resources.learningScenarios.statusOption.inProgress")
              : translate("resources.learningScenarios.statusOption.toStart")
          }
          color={status ? "success" : "error"}
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
  const [status, setStatus] = useState(false);

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      <Show
        actions={<PostShowActions />}
        title={<Title translationKey="titlePages.learningScenarios.show" />}
      >
        <ShowLayout />
      </Show>
    </StatusContext.Provider>
  );
};

interface StatusContextValue {
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const StatusContext = createContext<StatusContextValue | undefined>(undefined);

const useStatusContex = () => {
  const statusContext = useContext(StatusContext);
  if (statusContext === undefined) {
    throw new Error("useStatusContext must be inside a provider");
  }
  return statusContext;
};
