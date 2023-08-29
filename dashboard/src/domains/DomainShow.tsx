import { EditButton, Show, SimpleShowLayout, TextField, TopToolbar, useGetRecordId, useRecordContext, useRedirect, useTranslate } from "react-admin"
import { useParams } from 'react-router-dom';
import { DOMAIN_URL_PARAM } from "../constants";
import { BackButton } from "@dslab/ra-back-button";


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const to=`/domains/${recordId}/edit`;
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
export const DomainShow = () => {
    const translate = useTranslate();
    return (
        <Show actions={<PostShowActions />} title={translate("titlePages.domains.show")}>
            <SimpleShowLayout>
            <TextField source="title"  />
        </SimpleShowLayout>
        </Show>
    )
}
