import { useRecordContext, useTranslate } from "react-admin";

export const Title = ({ translationKey }: { translationKey: string }) => {
  const translate = useTranslate();
  const record = useRecordContext();
  const recordTitle = record ? '"' + record.title + '"' : "";
  const title = translate(translationKey) + " " + recordTitle;

  return title;
};
