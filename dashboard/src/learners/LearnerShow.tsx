import { EditButton, Show, SimpleShowLayout, TextField, TopToolbar, useGetRecordId } from "react-admin"
import { useParams } from 'react-router-dom';
import { BackButton } from "@dslab/ra-back-button";


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const to=`/learners/d/${domainId}/${recordId}/edit`;
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
export const LearnerShow = () => {
    return (
        <Show actions={<PostShowActions />}>
            <BackButton />
            <SimpleShowLayout>
            <TextField source="firstname"  />
            <TextField source="lastname" />
            <TextField source="email" />
            <TextField source="nickname" />

        </SimpleShowLayout>
        </Show>
    )
}
