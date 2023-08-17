import { DateField, EditButton, Show, SimpleShowLayout, TextField, TopToolbar, useGetRecordId } from "react-admin"
import { useParams } from 'react-router-dom';
import { FragmentShow } from "../fragments/FragmentShow";


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const scenarioId = params.scenarioId;
    const to=`/modules/d/${domainId}/s/${scenarioId}/m/${recordId}/edit`;
    if (!recordId)
        return null;
    return (
        <>
            <TopToolbar>
                <EditButton  to={to}></EditButton>
            </TopToolbar>
            </>
        )
};
export const ModuleShow = () => {
    return (
        <Show actions={<PostShowActions />}>
        <SimpleShowLayout>
            <TextField source="title"  />
            <TextField source="desc" />
            <TextField source="level" />
            <DateField source="dateFrom" />
            <DateField source="dateTo" />
        </SimpleShowLayout>
        {/* <FragmentShow /> */}
        </Show>
    )
}
