import { ChipField, EditButton, ReferenceArrayField, Show, SimpleShowLayout, SingleFieldList, TextField, TopToolbar, useGetRecordId, useRecordContext, useRedirect } from "react-admin"
import { useParams } from 'react-router-dom';
import { DOMAIN_URL_PARAM } from "../constants";
import { BackButton } from "@dslab/ra-back-button";


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const to=`/external-activities/d/${domainId}/${recordId}/edit`;
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
            <ReferenceArrayField source="preconditions" reference="concepts" >
            <SingleFieldList linkType={false}>
              <ChipField source="title" />
            </SingleFieldList>
            </ReferenceArrayField>
            <ReferenceArrayField source="effects" reference="concepts">
            <SingleFieldList linkType={false}>
              <ChipField source="title" />
            </SingleFieldList>
            </ReferenceArrayField>
        </SimpleShowLayout>
        </Show>
    )
}
