import { EditButton, ReferenceArrayField, Show, SimpleShowLayout, TextField, TopToolbar, useGetRecordId, useRecordContext, useRedirect } from "react-admin"
import { useSearchParams } from 'react-router-dom';
import { DOMAIN_URL_PARAM } from "../constants";
import { BackButton } from "@smartcommunitylab/ra-back-button";


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/external-activities/${recordId}/edit?${DOMAIN_URL_PARAM}=${domainId}`;
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
export const ExternalActivityShow = () => {
    return (
        <Show actions={<PostShowActions />}>
            <BackButton />
            <SimpleShowLayout>
            <TextField source="title"  />
            <TextField source="desc" />
            <TextField source="language" />
            <TextField source="extId" />
            <TextField source="extGroupId" />
            <TextField source="extUrl" />
            <TextField source="type" />
            <TextField source="tool" />
            <TextField source="difficulty" />
            <TextField source="groupCorrelator" />
            <ReferenceArrayField source="preconditions" reference="concepts" />
            <ReferenceArrayField source="effects" reference="concepts"/>
        </SimpleShowLayout>
        </Show>
    )
}
